package com.orcific.aimeetingassistant.controller;

import com.orcific.aimeetingassistant.dto.MeetingNotes;
import com.orcific.aimeetingassistant.dto.MeetingRequest;
import com.orcific.aimeetingassistant.service.MeetingService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/meeting")
@AllArgsConstructor
public class MeetingController {
    private final MeetingService meetingService;

    @PostMapping("/summarize")
    public MeetingNotes summarize(@RequestBody MeetingRequest meetingRequest) {

        return meetingService.summarizeMeeting(meetingRequest.transcript());
    }

    @GetMapping
    public String index() {
        return "Hello World";
    }
}
