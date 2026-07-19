import type { MeetingHistory } from '../models/MeetingHistory.js';
import type { MeetingNotes } from '../models/MeetingNotes.ts';
import type { RagResponse } from '../models/RagResponse.js';
import type { RagSource } from '../models/RagSource.js';

const API_BASE_URL = 'http://localhost:8080/api';

export async function uploadTranscript(file: File, model: string): Promise<MeetingNotes> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', model);

    const response = await fetch(`${API_BASE_URL}/meeting/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to generate meeting notes.');
    }

    return (await response.json()) as MeetingNotes;
}

export async function saveMeeting(
    title: string,
    transcript: string,
    meetingNotes: MeetingNotes,
): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/meeting`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            transcript,
            meetingNotes,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to save meeting.');
    }

    const result = await response.json();

    return result.id as number;
}

export async function getMeetingHistory(): Promise<MeetingHistory[]> {
    const response = await fetch(`${API_BASE_URL}/meeting`);

    if (!response.ok) {
        throw new Error('Failed to load history.');
    }

    return await response.json();
}

export async function getMeeting(id: number): Promise<MeetingNotes> {
    const response = await fetch(`${API_BASE_URL}/meeting/${id}`);

    if (!response.ok) {
        throw new Error('Meeting not found.');
    }

    return await response.json();
}

export async function askMeetingRag(question: string, model: string): Promise<RagResponse> {
    const response = await fetch(`${API_BASE_URL}/rag/ask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, model }),
    });

    if (!response.ok) {
        throw new Error('Failed to query RAG backend.');
    }

    return await response.json();
}
