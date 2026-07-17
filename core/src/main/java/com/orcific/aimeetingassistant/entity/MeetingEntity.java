package com.orcific.aimeetingassistant.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "meetings")
public class MeetingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String transcript;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String summary;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String decisions;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String actionItems;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String openQuestions;

    private String model;

    private String promptVersion;

    private Long durationMs;

    private LocalDateTime createdAt;

    @OneToMany(
            mappedBy = "meeting",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<MeetingChunkEntity> chunks = new ArrayList<>();
}
