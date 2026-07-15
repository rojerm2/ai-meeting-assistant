import { useState, type ChangeEvent } from 'react';
import type { MeetingNotes } from '../models/MeetingNotes';
import { uploadTranscript } from '../services/meetingApi';

interface UploadFormProps {
  onSuccess: (notes: MeetingNotes) => void;
}

export default function UploadForm({ onSuccess }: UploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      setLoading(true);
      const notes = await uploadTranscript(selectedFile);
      onSuccess(notes);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <input
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        className="block w-full text-sm text-slate-700
                   file:mr-4
                   file:rounded-md
                   file:border-0
                   file:bg-blue-600
                   file:px-4
                   file:py-2
                   file:text-white
                   file:cursor-pointer
                   hover:file:bg-blue-700"
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !selectedFile}
        className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {loading ? 'Generating...' : 'Generate Notes'}
      </button>
    </div>
  );
}