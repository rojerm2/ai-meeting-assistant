package com.orcific.minutes.dto;

import java.time.LocalDateTime;

public record GenerationMetadata (
        String model,
        long durationMs,
        LocalDateTime generatedAt
) {
}
