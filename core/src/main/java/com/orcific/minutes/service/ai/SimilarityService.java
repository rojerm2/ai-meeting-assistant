package com.orcific.minutes.service.ai;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SimilarityService {

    public double cosineSimilarity(List<Double> vectorA, List<Double> vectorB) {
        double dotProduct = 0;
        double AxA = 0;
        double BxB = 0;

        for(int i = 0; i < vectorA.size(); i++) {
            dotProduct += vectorA.get(i) * vectorB.get(i);

            AxA += vectorA.get(i) * vectorA.get(i);
            BxB += vectorB.get(i) * vectorB.get(i);
        }

        double lengthA = Math.sqrt(AxA);
        double lengthB = Math.sqrt(BxB);

        return dotProduct / (lengthA * lengthB);
    }
}
