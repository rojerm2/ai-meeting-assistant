package com.orcific.minutes.controller;

import com.orcific.minutes.dto.ai.RagAnswerResponse;
import com.orcific.minutes.dto.ai.RagQuestionRequest;
import com.orcific.minutes.dto.ai.SearchResult;
import com.orcific.minutes.service.ai.EmbeddingService;
import com.orcific.minutes.service.ai.RagService;
import com.orcific.minutes.service.ai.RetrievalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rag")
@RequiredArgsConstructor
public class RagController {
    private final EmbeddingService embeddingService;
    private final RetrievalService retrievalService;
    private final RagService ragService;

    @PostMapping("/ask")
    public RagAnswerResponse askMeeting(@RequestBody RagQuestionRequest request) {
        return ragService.ask(request);
    }

    @GetMapping("/embedding-test")
    public List<Double> testEmbed(@RequestParam String text){
        return embeddingService.embed(text);
    }

    @GetMapping("/search")
    public List<SearchResult> search(@RequestParam String text){
        return retrievalService.retrieveTop3Embeddings(text, 3);
    }
}
