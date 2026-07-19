package com.orcific.minutes.dto.ai;

import java.util.List;

public record RagAnswerResponse (
        String answer,
        List<SearchResult> sources
) {
}
