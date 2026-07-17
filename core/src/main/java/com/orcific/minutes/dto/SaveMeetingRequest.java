package com.orcific.minutes.dto;

public record SaveMeetingRequest(
        String title,
        String transcript,
        MeetingNotes meetingNotes
) {}
