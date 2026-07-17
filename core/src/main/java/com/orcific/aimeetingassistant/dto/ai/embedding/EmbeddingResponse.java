package com.orcific.aimeetingassistant.dto.ai.embedding;

import java.util.List;

public record EmbeddingResponse (
        List<List<Double>> embeddings
) {
}
