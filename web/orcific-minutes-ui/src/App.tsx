import Header from "./components/Header";
import UploadForm from "./components/UploadForm";
import MeetingNotesCard from "./components/MeetingNotesCard";
import LoadingSpinner from "./components/LoadingSpinner";
import EmptyState from "./components/EmptyState";

import type { MeetingNotes } from "./models/MeetingNotes";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState<MeetingNotes | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-6">
        <Header />

        <UploadForm
          loading={loading}
          onLoadingChange={setLoading}
          onSuccess={setNotes}
        />
        {!loading && notes && <MeetingNotesCard notes={notes} />}
        {/* {notes && <MeetingNotesCard notes={notes} />} */}
        {!loading && !notes && <EmptyState />}

        {loading && <LoadingSpinner />}
        {notes !== null && (
          <div className="mb-6 rounded-lg bg-green-100 p-4 text-green-700">
            ✅ Meeting notes generated successfully.
          </div>
        )}
      </div>
    </div>
  );

  setError("Unable to generate meeting notes.");
}

export default App;
