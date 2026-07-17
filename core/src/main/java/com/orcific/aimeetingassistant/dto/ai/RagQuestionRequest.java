package com.orcific.aimeetingassistant.dto.ai;

public record RagQuestionRequest (
        String question,
        String model
) {
}
