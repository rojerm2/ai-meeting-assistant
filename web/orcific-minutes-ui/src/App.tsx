import Header from './components/Header';
import UploadForm from './components/UploadForm';
import MeetingNotesCard from './components/MeetingNotesCard';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';

import type { MeetingNotes } from './models/MeetingNotes';
import { useState } from 'react';

function App() {
    const [notes, setNotes] = useState<MeetingNotes | null>(null);
    const [loading, setLoading] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="max-w-5xl px-6 py-6 mx-auto">
                <Header />

                {notes !== null && (
                    <div className="p-4 mb-6 text-green-700 bg-green-100 rounded-lg">
                        ✅ Meeting notes generated successfully.
                    </div>
                )}
                <UploadForm loading={loading} onLoadingChange={setLoading} onSuccess={setNotes} />

                {!loading && notes && <MeetingNotesCard notes={notes} />}
                {/* {notes && <MeetingNotesCard notes={notes} />} */}
                {!loading && !notes && <EmptyState />}

                {loading && <LoadingSpinner />}
            </div>
        </div>
    );
}

export default App;
