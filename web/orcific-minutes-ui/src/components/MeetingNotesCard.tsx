import type { MeetingNotes } from '../models/MeetingNotes.ts';

interface Props {
    notes: MeetingNotes;
}

export default function MeetingNotesCard({ notes }: Props) {
    return (
        <div className="p-8 mt-8 bg-white shadow-md rounded-xl">
            <div className="p-4 mb-6 text-sm rounded-lg bg-slate-100">
                <p>🧠 Model: {notes.metadata.model}</p>

                <p>
                    ⚡ Duration:
                    {(notes.metadata.durationMs / 1000).toFixed(2)} sec
                </p>

                <p>
                    📅 Generated:
                    {new Date(notes.metadata.generatedAt).toLocaleString()}
                </p>
            </div>
            <section>
                <div className="mb-2 text-xl font-bold">Summary</div>
                <p>{notes.summary}</p>
            </section>
        </div>
    );
}
