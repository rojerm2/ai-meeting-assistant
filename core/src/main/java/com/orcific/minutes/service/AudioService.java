package com.orcific.minutes.service;

import com.orcific.minutes.dto.MeetingNotes;
import com.orcific.minutes.dto.TranscriptRequest;
import com.orcific.minutes.dto.TranscriptResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AudioService {
    private final WhisperService service;
    private final MeetingService meetingService;

    public MeetingNotes generateMeetingNotes(MultipartFile audioFile, String model){
        TranscriptRequest transcriptRequest = new TranscriptRequest(audioFile);
        TranscriptResult result = service.transcribeAudio(transcriptRequest);

        return meetingService.summarizeMeeting(result.transcript(), model);
    }
}
