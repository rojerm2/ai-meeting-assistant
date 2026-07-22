package com.orcific.minutes.config;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "whisper")
@Data
public class WhisperProperties {
    private String baseUrl;
}
