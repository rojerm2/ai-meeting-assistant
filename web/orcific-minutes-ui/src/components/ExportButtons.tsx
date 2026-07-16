import type { MeetingNotes } from '../models/MeetingNotes';
import { formatMeetingNotes } from '../utils/meetingFormatter';

interface ExportButtonsProps {
    meetingNotes: MeetingNotes;
}

export default function ExportButtons({ meetingNotes }: ExportButtonsProps) {
    const handleCopy = async () => {
        await navigator.clipboard.writeText(formatMeetingNotes(meetingNotes));

        alert('Copied!');
    };

    const handleMarkdown = async () => {
        const markdownContent = formatMeetingNotes(meetingNotes);

        const blob = new Blob([markdownContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;

        link.download = 'meeting.md';

        link.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <button
                className="ml-3 rounded bg-green-600 px-4 py-2 text-white cursor-pointer hover:bg-green-700 transition"
                onClick={handleCopy}
            >
                Copy Notes
            </button>

            <button
                className="ml-3 rounded bg-green-600 px-4 py-2 text-white cursor-pointer hover:bg-green-700 transition"
                onClick={handleMarkdown}
            >
                Mark down
            </button>
        </div>
    );
}
