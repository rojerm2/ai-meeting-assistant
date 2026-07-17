import Header from './components/Header';
import UploadForm from './components/UploadForm';
import MeetingNotesCard from './components/MeetingNotesCard';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import HistorySidebar from './components/HistorySidebar';
import NotificationToast from './components/NotificationToast';

import type { MeetingNotes } from './models/MeetingNotes';
import type { MeetingHistory } from './models/MeetingHistory';
import { useEffect, useState } from 'react';
import { getMeeting, getMeetingHistory } from './services/meetingApi';
import type { Notification, NotificationType } from './types/notifications';

function App() {
    const [notes, setNotes] = useState<MeetingNotes | null>(null);
    const [loading, setLoading] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [history, setHistory] = useState<MeetingHistory[]>([]);
    const [id, setId] = useState<number>();
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        void loadHistory();
    }, []);

    const loadHistory = async () => {
        const meetingHistory = await getMeetingHistory();
        setHistory(meetingHistory);
    };

    const openMeeting = async (meetingId: number) => {
        const notes = await getMeeting(meetingId);
        setId(meetingId);
        setNotes(notes);
    };

    const showNotification = (type: NotificationType, title: string, message?: string) => {
        const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        setNotifications((current) => [...current, { id, type, title, message }]);

        window.setTimeout(() => {
            setNotifications((current) => current.filter((notification) => notification.id !== id));
        }, 4500);
    };

    const dismissNotification = (id: string) => {
        setNotifications((current) => current.filter((notification) => notification.id !== id));
    };

    const downloadPdf = async () => {
        if (id == null) {
            showNotification(
                'info',
                'Before downloading',
                'Please save the meeting summary before downloading the PDF.',
            );
            return;
        }

        const response = await fetch(`http://localhost:8080/api/meeting/meetings/${id}/pdf`);

        if (!response.ok) {
            showNotification(
                'error',
                'Download failed',
                'Failed to download the PDF. Please try again.',
            );
            return;
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'meeting-notes.pdf';
        a.click();
        URL.revokeObjectURL(url);
        showNotification('success', 'PDF downloaded', 'Your meeting notes PDF is ready.');
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <NotificationToast notifications={notifications} onDismiss={dismissNotification} />
            <div className="max-w-6xl px-6 py-6 mx-auto">
                <Header />

                <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
                    <aside className="rounded-4xl border border-slate-200 bg-white p-5 shadow-sm">
                        <HistorySidebar meetings={history} onOpen={openMeeting} />
                    </aside>

                    <main className="space-y-6">
                        {notes !== null && transcript == null && (
                            <div className="rounded-3xl border border-green-200 bg-green-50 p-4 text-green-700">
                                ✅ Meeting notes generated successfully.
                            </div>
                        )}

                        <UploadForm
                            loading={loading}
                            onLoadingChange={setLoading}
                            onSuccess={setNotes}
                            onFileSelected={setTranscript}
                            onNotify={showNotification}
                        />

                        {!loading && notes && (
                            <MeetingNotesCard
                                notes={notes}
                                onDownloadPdf={downloadPdf}
                                onNotify={showNotification}
                            />
                        )}

                        {!loading && !notes && <EmptyState />}

                        {loading && <LoadingSpinner />}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;
