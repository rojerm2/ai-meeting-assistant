package com.orcific.minutes.dto.ai;

public record OllamaRequest(
        String model,
        String prompt,
        boolean stream,
        OllamaOptions options
){
}
