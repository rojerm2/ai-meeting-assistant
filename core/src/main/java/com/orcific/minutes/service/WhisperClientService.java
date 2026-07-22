package com.orcific.minutes.service;

import com.orcific.minutes.config.WhisperProperties;
import com.orcific.minutes.dto.TranscriptResult;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;

@Service
@RequiredArgsConstructor
public class WhisperClientService {
    private final WhisperProperties  whisperProperties;
    private final RestClient restClient;

    public TranscriptResult transcribeAudio(MultipartFile multipartFile) {
        try {
            ByteArrayResource resource = new ByteArrayResource(multipartFile.getBytes()) {
                @Override
                public String getFilename() {
                    return multipartFile.getOriginalFilename();
                }
            };

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", resource);

            TranscriptResult result = restClient.post()
                    .uri(whisperProperties.getBaseUrl() + "/transcribe")
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(body)
                    .retrieve()
                    .body(TranscriptResult.class);

            if(result == null){
                throw new RuntimeException("Whisper returned empty response.");
            }

            return result;

        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }
}
