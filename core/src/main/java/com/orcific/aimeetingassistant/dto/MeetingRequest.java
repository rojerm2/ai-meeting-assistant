package com.orcific.aimeetingassistant.dto;

public record MeetingRequest (
        String transcript,
        String model
) {
}
