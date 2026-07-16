export interface MeetingNotes {
    summary: string;
    keyDecisions: string[];
    actionItems: string[];
    openQuestions: string[];
    metadata: GenerationMetadata;
}

export interface GenerationMetadata {
    model: string;
    durationMs: number;
    generatedAt: string;
}
