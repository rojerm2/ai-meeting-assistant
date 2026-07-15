package com.orcific.aimeetingassistant.dto;

import java.time.LocalDateTime;

public record ApiError (
        LocalDateTime timestamp,
        int status,
        String error,
        String message
) {
}
