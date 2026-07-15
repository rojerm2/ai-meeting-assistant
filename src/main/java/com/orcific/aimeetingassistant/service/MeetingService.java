package com.orcific.aimeetingassistant.service;

import com.orcific.aimeetingassistant.dto.MeetingNotes;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@AllArgsConstructor
@Service
public class MeetingService {
    private final OllamaService  ollamaService;
    private final ObjectMapper objectMapper;

    public MeetingNotes summarizeMeeting(String transcript) {
        String prompt = """
                You are an AI meeting assistant.
                
                Your task is to analyze the meeting transcript.
        
                Return ONLY valid JSON.
        
                Do not include markdown.
        
                Do not include explanations.
        
                Use exactly this schema:
        
                {
                  "summary": "...",
                  "keyDecisions": [],
                  "actionItems": [],
                  "openQuestions": []
                }
        
                Rules:
        
                - summary should be a short paragraph.
                - keyDecisions must be an array.
                - actionItems must be an array.
                - openQuestions must be an array.
                - If a section has no data, return an empty array.
        
                Transcript:
        
                %s
            """.formatted(transcript);

        String aiResponse = ollamaService.generate(prompt);

        MeetingNotes notes = objectMapper.readValue(aiResponse, MeetingNotes.class);

        return notes;
    }
}
