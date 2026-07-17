package com.orcific.minutes.dto.ai;

import java.util.List;

public record EmbeddingResponse (
        List<List<Double>> embeddings
) {
}
