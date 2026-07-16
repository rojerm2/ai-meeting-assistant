package com.orcific.aimeetingassistant.dto;

import java.util.List;

public record AiResponse (
        String summary,
        List<String> decisions,
        List<String> actionItems,
        List<String> openQuestions
) {

}
