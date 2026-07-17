package com.orcific.minutes.dto.ai;

public record SearchResult (
        Long meetingId,
        Integer chunkIndex,
        String content,
        double similarity
) {
}
