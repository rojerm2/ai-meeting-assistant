package com.orcific.minutes.service.ai;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ChunkingService {

    public List<String> chunk(String transcript){

        return Arrays.stream(
                transcript.split("\\R\\R+"))
                .map(String::trim)
                .filter(s -> !s.isBlank())
                .toList();
    }
}
