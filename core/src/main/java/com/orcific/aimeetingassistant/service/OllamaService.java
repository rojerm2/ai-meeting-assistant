package com.orcific.aimeetingassistant.service;

import com.orcific.aimeetingassistant.dto.ApiError;
import com.orcific.aimeetingassistant.dto.OllamaOptions;
import com.orcific.aimeetingassistant.dto.OllamaRequest;
import com.orcific.aimeetingassistant.dto.OllamaResponse;
import com.orcific.aimeetingassistant.exception.OllamaCommunicationException;
import lombok.AllArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.io.IOException;
import java.time.LocalDateTime;

@AllArgsConstructor
@Service
public class OllamaService {
    private static final Logger LOGGER = LoggerFactory.getLogger(OllamaService.class);
    private final RestClient restClient;

    public String generate(String prompt, String model){

        OllamaRequest request = new OllamaRequest(
                model,
                prompt,
                false,
                new OllamaOptions(0.0)
        );

        try {
            OllamaResponse response = sendHttpPostRequest(request);

            return response.response();
        }
        catch (RestClientException | NullPointerException e) {
            e.printStackTrace();
            LOGGER.error(e.getMessage());
            throw new OllamaCommunicationException("Unable to connect to ollama server", e);
        }
    }

    private @Nullable OllamaResponse sendHttpPostRequest(OllamaRequest request) {
        LOGGER.info("Sending HTTP request to Ollama server.");
        OllamaResponse response = restClient.post()
                .uri("/api/generate")
                .body(request)
                .retrieve()
                .body(OllamaResponse.class);

        LOGGER.info("Retrieved response from Ollama server.");
        return response;
    }
}
