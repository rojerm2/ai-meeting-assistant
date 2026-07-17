package com.orcific.aimeetingassistant.dto.ai;

import com.orcific.aimeetingassistant.dto.ai.embedding.SearchResult;

import java.util.List;

public record RagAnswerResponse (
        String answer,
        List<SearchResult> sources
) {
}
