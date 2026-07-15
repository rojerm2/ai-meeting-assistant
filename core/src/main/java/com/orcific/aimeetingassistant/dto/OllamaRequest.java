package com.orcific.aimeetingassistant.dto;

public record OllamaRequest(
        String model,
        String prompt,
        boolean stream,
        OllamaOptions options
){
}
