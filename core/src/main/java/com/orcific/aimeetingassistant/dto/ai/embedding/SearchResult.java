package com.orcific.aimeetingassistant.dto.ai.embedding;

public record SearchResult (
        Long meetingId,
        Integer chunkIndex,
        String content,
        double similarity
) {
}
