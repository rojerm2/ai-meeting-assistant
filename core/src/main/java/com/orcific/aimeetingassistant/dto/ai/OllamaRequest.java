package com.orcific.aimeetingassistant.dto.ai;

public record OllamaRequest(
        String model,
        String prompt,
        boolean stream,
        OllamaOptions options
){
}
