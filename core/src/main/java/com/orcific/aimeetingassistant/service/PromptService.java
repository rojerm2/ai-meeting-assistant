package com.orcific.aimeetingassistant.service;


import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@AllArgsConstructor
@Service
public class PromptService {
    private final ResourceLoader resourceLoader;

    public String getMeetingNotesPrompt(String transcript) {
        Resource resource = resourceLoader.getResource("classpath:prompts/meeting-notes.prompt");

        try {
            String template = resource.getContentAsString(StandardCharsets.UTF_8);
            return template.replace("{{transcript}}", transcript);
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }
    }
}
