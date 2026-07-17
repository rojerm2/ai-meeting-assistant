package com.orcific.minutes.dto.ai;

public record EmbeddingRequest (
        String model,
        String input
) {
}
