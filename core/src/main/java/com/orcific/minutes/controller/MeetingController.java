package com.orcific.minutes.controller;

import com.orcific.minutes.dto.*;
import com.orcific.minutes.service.MeetingService;
import com.orcific.minutes.service.PdfService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/meeting")
@AllArgsConstructor
public class MeetingController {
    private final MeetingService meetingService;
    private final PdfService pdfService;

    @PostMapping("/summarize")
    public MeetingNotes summarize(@RequestBody MeetingRequest meetingRequest) {

        return meetingService.summarizeMeeting(meetingRequest.transcript(), meetingRequest.model());
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public MeetingNotes summarizeFromFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("model") String model) {
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
        return meetingService.summarizeMeeting(transcript, model);
    }

    @PostMapping()
    public SaveMeetingResponse saveMeeting(@RequestBody SaveMeetingRequest request) {

        Long id = meetingService.saveMeeting(request);

        return new SaveMeetingResponse(id);
    }

    @GetMapping()
    public List<MeetingHistoryResponse> getMeetings(){
        return meetingService.getMeetings();
    }

    @GetMapping("{id}")
    public MeetingNotes getMeeting(@PathVariable Long id) {
        return meetingService.getMeeting(id);
    }

    @GetMapping(value = "/{id}/pdf", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long id) {
        MeetingNotes notes = meetingService.getMeeting(id);

        byte[] pdf = pdfService.generateMeetingPdf(notes);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=meeting-notes.pdf")
                .body(pdf);
    }

//    @GetMapping
//    public String index() {
//        return "Hello World";
//    }
}
