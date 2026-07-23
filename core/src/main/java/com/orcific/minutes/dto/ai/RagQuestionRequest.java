package com.orcific.minutes.dto.ai;

public record RagQuestionRequest (
        int meetingId,
        String question,
        String model
) {
}
