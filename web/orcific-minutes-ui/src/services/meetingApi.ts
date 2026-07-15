import type {MeetingNotes } from "../models/MeetingNotes.ts";

const API_BASE_URL = "http://localhost:8080/api/meeting";

export async function uploadTranscript(file: File): Promise<MeetingNotes> {

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to generate meeting notes.");
    }

    return await response.json() as MeetingNotes;
}