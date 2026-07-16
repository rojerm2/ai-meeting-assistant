package com.orcific.aimeetingassistant.mapper;

import com.orcific.aimeetingassistant.dto.MeetingNotes;
import com.orcific.aimeetingassistant.dto.SaveMeetingRequest;
import com.orcific.aimeetingassistant.entity.MeetingEntity;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;

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
}
