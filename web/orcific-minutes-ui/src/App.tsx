import Header from './components/Header';
import UploadForm from './components/UploadForm';
import MeetingNotesCard from './components/MeetingNotesCard';

import type { MeetingNotes } from './models/MeetingNotes';
import { useState } from 'react';

function App() {
  const [notes, setNotes] = useState<MeetingNotes | null>(null);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Header />
        <UploadForm onSuccess={setNotes} />
        {notes && <MeetingNotesCard notes={notes} />}
      </div>
    </div>
  );
}

export default App;
