import type { MeetingHistory } from '../models/MeetingHistory';

interface Props {
    meetings: MeetingHistory[];
    onOpen(id: number): void;
}

export default function HistorySidebar({ meetings, onOpen }: Props) {
    return (
        <section
            aria-label="Meeting history sidebar"
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-lg font-semibold text-slate-900">Recent meetings</p>
                    <p className="mt-1 text-sm text-slate-500">
                        Browse your saved conversations and open a meeting instantly.
                    </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                    {meetings.length}
                </span>
            </div>

            <div className="mt-5">
                {meetings.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500">
                        No meetings found yet.
                        <div className="mt-2 text-slate-400">
                            Save a meeting to build your history and start querying it later.
                        </div>
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {meetings.map((meeting) => (
                            <li key={meeting.id}>
                                <button
                                    type="button"
                                    onClick={() => onOpen(meeting.id)}
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-900 transition hover:border-slate-300 hover:bg-slate-100"
                                >
                                    {meeting.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
