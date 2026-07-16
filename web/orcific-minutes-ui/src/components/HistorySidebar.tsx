import type { MeetingHistory } from '../models/MeetingHistory';
interface Props {
    meetings: MeetingHistory[];
    onOpen(id: number): void;
}

export default function HistorySidebar({ meetings, onOpen }: Props) {
    return (
        <div className="w-64 p-4 bg-gray-100">
            <h2 className="mb-4 text-lg font-semibold">Meeting History</h2>
            <ul>
                {meetings.map((meeting) => (
                    <li key={meeting.id} className="mb-2">
                        <button
                            onClick={() => onOpen(meeting.id)}
                            className="w-full rounded-lg bg-blue-600 py-3 
          text-white transition hover:bg-blue-700 
          cursor-pointer"
                        >
                            {meeting.title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
