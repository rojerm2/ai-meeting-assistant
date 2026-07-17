package com.orcific.aimeetingassistant.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "meeting_chunks")
public class MeetingChunkEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id", nullable = false)
    private MeetingEntity meeting;

    private Integer chunkIndex;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String content;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String embedding;
}
