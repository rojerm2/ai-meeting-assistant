import type { RagSource } from './RagSource';

export interface RagResponse {
    answer: string;
    sources: RagSource[];
}
