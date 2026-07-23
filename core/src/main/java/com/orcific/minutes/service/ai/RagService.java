package com.orcific.minutes.service.ai;

import com.orcific.minutes.dto.ai.RagAnswerResponse;
import com.orcific.minutes.dto.ai.RagQuestionRequest;
import com.orcific.minutes.dto.ai.SearchResult;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RagService {
    private final RetrievalService retrievalService;
    private final OllamaService ollamaService;
    private final ResourceLoader resourceLoader;
    private final Logger logger = LoggerFactory.getLogger(RagService.class);

    public RagAnswerResponse ask(RagQuestionRequest request){
        List<SearchResult> chunks = retrievalService.retrieveTop3Embeddings(request.meetingId(), request.question(), 3);

        String context = buildContext(chunks);
        String prompt = buildPrompt(context, request.question());

        String aiResponse = ollamaService.generateMeetingNotes(prompt, request.model(), 0.8);

        return new RagAnswerResponse(aiResponse, chunks);
    }

    private String buildPrompt(String context, String question) {
        try {
            Resource resource = resourceLoader.getResource("classpath:prompts/rag-prompt.prompt");
            String template = resource.getContentAsString(StandardCharsets.UTF_8);

            return template
                    .replace("{{context}}", context)
                    .replace("{{question}}", question);

        } catch (IOException e){
            logger.error(e.getMessage(), e);
            throw new RuntimeException(e.getMessage());
        }
    }

    private String buildContext(List<SearchResult> chunks) {
        StringBuilder context = new StringBuilder();
        for (SearchResult chunk : chunks) {
            context.append("""
                    Meeting %d
                    Chunk %d
                    
                    %s
                    
                    ---------------
                             
                    """.formatted(
                            chunk.meetingId(),
                            chunk.chunkIndex(),
                            chunk.content()
                    )
            );
        }

        return context.toString();
    }
}
