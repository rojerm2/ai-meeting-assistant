package com.orcific.minutes.service;

import com.orcific.minutes.dto.MeetingNotes;
import com.orcific.minutes.dto.TranscriptResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AudioService {
    private final WhisperClientService service;
    private final MeetingService meetingService;

    public MeetingNotes generateMeetingNotes(MultipartFile audioFile, String model){
        TranscriptResult result = service.transcribeAudio(audioFile);

        return meetingService.summarizeMeeting(result.text(), model);
    }
}
