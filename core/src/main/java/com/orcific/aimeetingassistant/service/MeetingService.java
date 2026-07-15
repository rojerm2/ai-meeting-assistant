package com.orcific.aimeetingassistant.service;

import com.orcific.aimeetingassistant.dto.MeetingNotes;
import com.orcific.aimeetingassistant.exception.InvalidAiResponseException;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.json.JsonParseException;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.exc.MismatchedInputException;

@AllArgsConstructor
@Service
public class MeetingService {
    private final OllamaService  ollamaService;
    private final ObjectMapper objectMapper;
    private final PromptService promptService;
    private static final Logger LOGGER = LoggerFactory.getLogger(MeetingService.class);

    public MeetingNotes summarizeMeeting(String transcript) {
        String prompt = buildPrompt(transcript);

        String aiResponse = generateResponse(prompt);

        return parseResponseToMeetingNotes(aiResponse);
    }

    private MeetingNotes parseResponseToMeetingNotes(String aiResponse) {
        LOGGER.debug("Parsing AI response into MeetingNotes.");
        try{
            MeetingNotes notes = objectMapper.readValue(aiResponse, MeetingNotes.class);
            LOGGER.info("AI response successfully parsed into MeetingNotes.");
            return notes;
        }
        catch(JsonParseException | MismatchedInputException e){
            LOGGER.error(e.getMessage());
            throw new InvalidAiResponseException("Error with parsing response", e);
        }
    }

    private String generateResponse(String prompt) {
        long startTime = System.currentTimeMillis();
        LOGGER.info("Sending transcript to ollama...");

        String aiResponse = ollamaService.generate(prompt);
        LOGGER.info("Received response from ollama.");

        long elapsedTime = System.currentTimeMillis() - startTime;
        LOGGER.info("Ollama finished in {} ms", elapsedTime);
        return aiResponse;
    }

    private String buildPrompt(String transcript) {
        String prompt = promptService.getMeetingNotesPrompt(transcript);
        return prompt;
    }
}
