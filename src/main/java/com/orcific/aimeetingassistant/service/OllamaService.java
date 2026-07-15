package com.orcific.aimeetingassistant.service;

import com.orcific.aimeetingassistant.dto.OllamaRequest;
import com.orcific.aimeetingassistant.dto.OllamaResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@AllArgsConstructor
@Service
public class OllamaService {
    private final RestClient restClient;

    public String generate(String prompt){

        OllamaRequest request = new OllamaRequest(
                "qwen2.5:3b",
                prompt,
                false
        );

        OllamaResponse response = restClient.post()
                .uri("/api/generate")
                .body(request)
                .retrieve()
                .body(OllamaResponse.class);

        return response.response();
    }
}
