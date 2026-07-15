import Header from "./components/Header";
import UploadForm from "./components/UploadForm";
import MeetingNotesCard from "./components/MeetingNotesCard"; 

import type { MeetingNotes } from "./models/MeetingNotes.ts";

const sampleNotes: MeetingNotes = {

    summary:
        "The team agreed to migrate the backend to Spring Boot.",

    keyDecisions: [
        "Use Spring Boot",
        "Use React"
    ],

    actionItems: [
        "John will build the REST API",
        "Alice will create the frontend"
    ],

    openQuestions: [
        "Should we use SQLite?"
    ]

};

function App() {

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Header />

        <UploadForm />
        
        <MeetingNotesCard notes={sampleNotes} />
      </div>
    </div>
  )
  }

export default App
