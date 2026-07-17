package com.orcific.aimeetingassistant.dto.ai.embedding;

public record EmbeddingRequest (
        String model,
        String input
) {
}
