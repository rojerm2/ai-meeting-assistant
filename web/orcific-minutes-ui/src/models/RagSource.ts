export interface RagSource {
    meetingId: number;
    chunkIndex: number;
    content: string;
    similarity: number;
}
