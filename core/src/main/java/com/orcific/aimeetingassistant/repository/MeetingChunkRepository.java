package com.orcific.aimeetingassistant.repository;

import com.orcific.aimeetingassistant.entity.MeetingChunkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MeetingChunkRepository extends JpaRepository<MeetingChunkEntity, Long> {
//    @Query("""
//        select c
//        from MeetingChunkEntity c
//        join fetch c.meeting
//    """)
//    List<MeetingChunkEntity> findAllWithMeeting();
}
