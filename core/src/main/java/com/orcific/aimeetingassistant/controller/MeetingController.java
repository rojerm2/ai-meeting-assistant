package com.orcific.aimeetingassistant.controller;

import com.orcific.aimeetingassistant.dto.MeetingNotes;
import com.orcific.aimeetingassistant.dto.MeetingRequest;
import com.orcific.aimeetingassistant.service.MeetingService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/meeting")
@AllArgsConstructor
public class MeetingController {
    private final MeetingService meetingService;

    @PostMapping("/summarize")
    public MeetingNotes summarize(@RequestBody MeetingRequest meetingRequest) {

        return meetingService.summarizeMeeting(meetingRequest.transcript());
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public MeetingNotes summarizeFromFile(@RequestParam("file") MultipartFile file) {
        if(file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        String transcript ="";
        try {
            transcript =
                    new String(file.getBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return meetingService.summarizeMeeting(transcript);
    }

    @GetMapping
    public String index() {
        return "Hello World";
    }
}
