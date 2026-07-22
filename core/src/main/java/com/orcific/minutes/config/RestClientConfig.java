package com.orcific.minutes.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

//    @Value("${ollama.base-url}")
//    private String ollamaBaseUrl;
//
//    @Value("${whiser.base-url}")
//    private String whisperBaseUrl;

    @Bean
    public RestClient restClient() {
        return RestClient.create();
    }
//    @Bean
//    public RestClient ollamaRestClient() {
//        return RestClient.builder().baseUrl(ollamaBaseUrl).build();
//    }
//
//    @Bean
//    public RestClient whisperRestClient() {
//        return RestClient.builder().baseUrl(whisperBaseUrl).build();
//    }
}
