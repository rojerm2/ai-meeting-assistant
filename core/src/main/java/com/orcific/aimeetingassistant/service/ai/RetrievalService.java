package com.orcific.aimeetingassistant.service.ai;

import com.orcific.aimeetingassistant.dto.ai.embedding.SearchResult;
import com.orcific.aimeetingassistant.entity.MeetingChunkEntity;
import com.orcific.aimeetingassistant.repository.MeetingChunkRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.util.*;

@Service
@AllArgsConstructor
public class RetrievalService {
    private final EmbeddingService embeddingService;
    private final MeetingChunkRepository meetingChunkRepository;
    private final SimilarityService similarityService;
    private final ObjectMapper objectMapper;

    public List<SearchResult> retrieveTop3Embeddings(String question, int topK){
//        List<Double> chunkSimilarityList = new ArrayList<>();
        List<SearchResult> results = new ArrayList<>();

        List<Double> questionVector = embeddingService.embed(question);
        List<MeetingChunkEntity> chunkEntityList = meetingChunkRepository.findAll();

        for (MeetingChunkEntity meetingChunkEntity : chunkEntityList) {
               List<Double> chunkVector = objectMapper.readValue(
                       meetingChunkEntity.getEmbedding(),
                       new TypeReference<>() {
                       });

            double similarityScore = similarityService.cosineSimilarity(questionVector, chunkVector);

            results.add(new SearchResult(
                    meetingChunkEntity.getMeeting().getId(),
                    meetingChunkEntity.getChunkIndex(),
                    meetingChunkEntity.getContent(),
                    similarityScore
            ));
//            chunkSimilarityList.add(similarity);
        }

        return results.stream()
                .sorted(Comparator.comparingDouble(
                        SearchResult::similarity)
                        .reversed())
                .limit(topK)
                .toList();

//        PriorityQueue<Double> minHeap = new PriorityQueue<>(3);

//        for (Double similarity : chunkSimilarityList) {
//            minHeap.add(similarity);
//
//            if (minHeap.size() > 3) {
//                minHeap.poll();
//            }
//        }
//
//        List<Double> topThree = new ArrayList<>(minHeap);
//        topThree.sort(Collections.reverseOrder());

//        chunkSimilarityList.sort(Comparator.reverseOrder());

//        return  topThree;
    }
}
