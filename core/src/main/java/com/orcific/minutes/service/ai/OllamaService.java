package com.orcific.minutes.service.ai;

import com.orcific.minutes.config.OllamaProperties;
import com.orcific.minutes.dto.ai.OllamaOptions;
import com.orcific.minutes.dto.ai.OllamaRequest;
import com.orcific.minutes.dto.ai.OllamaResponse;
import com.orcific.minutes.exception.OllamaCommunicationException;
import lombok.AllArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

@AllArgsConstructor
@Service
public class OllamaService {
    private static final Logger LOGGER = LoggerFactory.getLogger(OllamaService.class);
    private final RestClient restClient;
    private final OllamaProperties ollamaProperties;

    public String generateMeetingNotes(String prompt, String model, double temperature){
        OllamaRequest request = new OllamaRequest(
                model,
                prompt,
                false,
                new OllamaOptions(temperature)
        );

        return generateAiResponse(request);
    }

    public String generateAiResponse(OllamaRequest request){
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
                .uri(ollamaProperties.getBaseUrl() + "/api/generate")
                .body(request)
                .retrieve()
                .body(OllamaResponse.class);

        LOGGER.info("Retrieved response from Ollama server.");
        LOGGER.info("Response: \n" + response.response());
        return response;
    }
}
