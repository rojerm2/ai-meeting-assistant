import type { MeetingNotes } from "../models/MeetingNotes.ts";

interface Props {
    notes: MeetingNotes;
}

export default function MeetingNotesCard({ notes }: Props) {
    return (
        <div className="bg-white rounded-xl shadow-md p-8 mt-8">
            <section>
                <div className="text-xl font-bold mb-2">Summary</div>
                <p>{notes.summary}</p>
            </section>
        </div>
    );
}