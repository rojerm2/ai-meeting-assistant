package com.orcific.minutes.service.ai;

import com.orcific.minutes.config.OllamaProperties;
import com.orcific.minutes.dto.ai.EmbeddingRequest;
import com.orcific.minutes.dto.ai.EmbeddingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmbeddingService {
    private final RestClient restClient;
    private final OllamaProperties ollamaProperties;

    public List<Double> embed(String text){
        EmbeddingRequest embeddingRequest = new EmbeddingRequest(ollamaProperties.getEmbeddingModel(), text);

        EmbeddingResponse response = restClient.post()
                .uri("/api/embed")
                .body(embeddingRequest)
                .retrieve()
                .body(EmbeddingResponse.class);

        if (response == null || response.embeddings().isEmpty()) {
            throw new RuntimeException("Embedding request returned empty response");
        }

        return response.embeddings().get(0);
    }
}
