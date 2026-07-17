import type { MeetingHistory } from '../models/MeetingHistory';

interface Props {
    meetings: MeetingHistory[];
    onOpen(id: number): void;
}

export default function HistorySidebar({ meetings, onOpen }: Props) {
    return (
        <div aria-label="Meeting history sidebar">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">Meeting History</h2>
                    <p className="text-sm text-slate-500">Saved meetings from previous sessions</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                    {meetings.length}
                </span>
            </div>

            {meetings.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                    No meetings found.
                    <div className="mt-2 text-slate-400">
                        Upload a transcript and save a meeting to populate history.
                    </div>
                </div>
            ) : (
                <ul className="space-y-3">
                    {meetings.map((meeting) => (
                        <li key={meeting.id}>
                            <button
                                type="button"
                                onClick={() => onOpen(meeting.id)}
                                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-900 transition hover:border-slate-300 hover:bg-slate-100"
                            >
                                {meeting.title}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
