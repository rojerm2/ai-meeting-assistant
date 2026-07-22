package com.orcific.minutes.dto;

import org.springframework.web.multipart.MultipartFile;

public record TranscriptRequest(
        MultipartFile file
) {
}
