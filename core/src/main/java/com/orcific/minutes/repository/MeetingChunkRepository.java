package com.orcific.minutes.repository;

import com.orcific.minutes.entity.MeetingChunkEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeetingChunkRepository extends JpaRepository<MeetingChunkEntity, Long> {
//    @Query("""
//        select c
//        from MeetingChunkEntity c
//        join fetch c.meeting
//    """)
    List<MeetingChunkEntity> findAllByMeetingId(Long meetingId);
}
