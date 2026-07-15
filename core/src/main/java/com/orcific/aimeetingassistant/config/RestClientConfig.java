package com.orcific.aimeetingassistant.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

    @Value("${ollama.base-url}")
    private String ollamaBaseUrl;

    @Bean
    public RestClient ollamaRestClient() {
        return RestClient.builder().baseUrl(ollamaBaseUrl).build();
    }
}
