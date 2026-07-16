package com.orcific.aimeetingassistant.dto;

import java.time.LocalDateTime;

public record GenerationMetadata (
        String model,
        long durationMs,
        LocalDateTime generatedAt
) {
}
