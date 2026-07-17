package com.orcific.minutes.service.ai;


import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@AllArgsConstructor
@Service
public class PromptService {
    private final ResourceLoader resourceLoader;
    private final Logger logger = LoggerFactory.getLogger(PromptService.class);

    public String getMeetingNotesPrompt(String transcript) {
        Resource resource = resourceLoader.getResource("classpath:prompts/meeting-notes.prompt");

        try {
            String template = resource.getContentAsString(StandardCharsets.UTF_8);
            return template.replace("{{transcript}}", transcript);
        } catch (IOException e) {
            e.printStackTrace();
            logger.error(e.getMessage(), e);
            return "";
        }
    }
}
