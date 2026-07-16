package com.orcific.aimeetingassistant.dto;

public record SaveMeetingRequest(
        String title,
        String transcript,
        MeetingNotes meetingNotes
) {}
