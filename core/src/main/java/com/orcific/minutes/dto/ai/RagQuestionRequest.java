package com.orcific.minutes.dto.ai;

public record RagQuestionRequest (
        String question,
        String model
) {
}
