package com.orcific.aimeetingassistant.mapper;

import com.orcific.aimeetingassistant.dto.GenerationMetadata;
import com.orcific.aimeetingassistant.dto.MeetingHistoryResponse;
import com.orcific.aimeetingassistant.dto.MeetingNotes;
import com.orcific.aimeetingassistant.dto.SaveMeetingRequest;
import com.orcific.aimeetingassistant.entity.MeetingEntity;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import tools.jackson.core.JacksonException;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@Component
@AllArgsConstructor
public class MeetingMapper {
    private final ObjectMapper objectMapper;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public MeetingEntity toEntity(SaveMeetingRequest request){
        MeetingNotes notes = request.meetingNotes();

        MeetingEntity entity = new MeetingEntity();

        entity.setTitle(request.title());
        entity.setTranscript(request.transcript());
        entity.setSummary(notes.summary());

        entity.setModel(notes.metadata().model());
        entity.setDurationMs(notes.metadata().durationMs());
        entity.setCreatedAt(notes.metadata().generatedAt());

        try {
            entity.setKeyDecisions(
                    objectMapper.writeValueAsString(notes.decisions())
            );

            entity.setActionItems(
                    objectMapper.writeValueAsString(notes.actionItems())
            );

            entity.setOpenQuestions(
                    objectMapper.writeValueAsString(notes.openQuestions())
            );
        } catch (JacksonException e){
            logger.error("Error serializing MeetingEntity", e);
            throw new RuntimeException(e);
        }

        return entity;
    }

    public MeetingHistoryResponse toHistory(MeetingEntity entity) {
        return new MeetingHistoryResponse(
                entity.getId(),
                entity.getTitle(),
                entity.getModel(),
                entity.getCreatedAt()
        );
    }

    public MeetingNotes toMeetingNotes(MeetingEntity entity) {
        try {
            return new MeetingNotes(
                    entity.getSummary(),
                    objectMapper.readValue(
                            entity.getKeyDecisions(),
                            new TypeReference<List<String>>() {}),
                    objectMapper.readValue(
                            entity.getActionItems(),
                            new TypeReference<List<String>>() {}),
                    objectMapper.readValue(
                            entity.getOpenQuestions(),
                            new TypeReference<List<String>>() {}),
                    new GenerationMetadata(
                            entity.getModel(),
                            entity.getDurationMs(),
                            entity.getCreatedAt())
            );
        } catch (JacksonException e) {
            throw new RuntimeException("Failed to deserialize meeting data", e);
        }
    }
}
