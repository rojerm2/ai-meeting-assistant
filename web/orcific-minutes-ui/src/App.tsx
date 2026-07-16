import Header from './components/Header';
import UploadForm from './components/UploadForm';
import MeetingNotesCard from './components/MeetingNotesCard';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';

import type { MeetingNotes } from './models/MeetingNotes';
import { useEffect, useState } from 'react';
import { getMeeting, getMeetingHistory } from './services/meetingApi';
import type { MeetingHistory } from './models/MeetingHistory';
import HistorySidebar from './components/HistorySidebar';

function App() {
    const [notes, setNotes] = useState<MeetingNotes | null>(null);
    const [loading, setLoading] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [history, setHistory] = useState<MeetingHistory[]>([]);
    const [id, setId] = useState<number>();

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        const meetingHistory = await getMeetingHistory();

        setHistory(meetingHistory);
    };

    const openMeeting = async (id: number) => {
        const notes = await getMeeting(id);
        setId(id);
        setNotes(notes);
    };

    const downloadPdf = async () => {
        if (id == null) {
            alert('Please open a saved meeting before downloading the PDF.');
            return;
        }

        const response = await fetch(`http://localhost:8080/api/meeting/meetings/${id}/pdf`);

        if (!response.ok) {
            alert('Failed to download the PDF. Please try again.');
            return;
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'meeting-notes.pdf';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="max-w-5xl px-6 py-6 mx-auto">
                <Header />
                <HistorySidebar meetings={history} onOpen={openMeeting} />

                {notes !== null && (
                    <div className="p-4 mb-6 text-green-700 bg-green-100 rounded-lg">
                        ✅ Meeting notes generated successfully.
                    </div>
                )}
                <UploadForm
                    loading={loading}
                    onLoadingChange={setLoading}
                    onSuccess={setNotes}
                    onFileSelected={setTranscript}
                />

                {!loading && notes && (
                    <MeetingNotesCard notes={notes} onDownloadPdf={downloadPdf} />
                )}
                {!loading && !notes && <EmptyState />}

                {loading && <LoadingSpinner />}
            </div>
        </div>
    );
}

export default App;
