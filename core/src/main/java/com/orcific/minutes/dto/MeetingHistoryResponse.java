package com.orcific.minutes.dto;

import java.time.LocalDateTime;

public record MeetingHistoryResponse(
        Long id,
        String title,
        String model,
        LocalDateTime createdAt
) {
}