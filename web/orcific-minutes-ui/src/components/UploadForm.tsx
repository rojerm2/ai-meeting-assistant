import { useState, type ChangeEvent } from 'react';
import type { MeetingNotes } from '../models/MeetingNotes';
import { saveMeeting, uploadTranscript } from '../services/meetingApi';
import ExportButtons from './ExportButtons';

interface UploadFormProps {
    loading: boolean;
    onLoadingChange: (loading: boolean) => void;
    onSuccess: (notes: MeetingNotes) => void;
    onFileSelected: (transcript: string) => void;
}

export default function UploadForm({
    loading,
    onLoadingChange,
    onSuccess,
    onFileSelected,
}: UploadFormProps): import('react').JSX.Element {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [model, setModel] = useState('qwen2.5:3b');
    const [notes, setNotes] = useState<MeetingNotes | null>(null);
    const [transcript, setTranscript] = useState('');
    const [id, setId] = useState<number>();
    // const [loading, setLoading] = useState(false);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        setSelectedFile(file);
        readFileContent(file);
        // onFileSelected(file ? URL.createObjectURL(file) : null);
        setNotes({
            summary: 'Sample summary',
            keyDecisions: ['Decision 1', 'Decision 2'],
            actionItems: ['Action Item 1'],
            openQuestions: ['Open Question 1'],
            metadata: {
                model: 'Sample Model',
                durationMs: 1234,
                generatedAt: new Date().toISOString(),
            },
        } as MeetingNotes);
    };

    const readFileContent = (file: File | null) => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            onFileSelected(content);
            setTranscript(content);
        };
        reader.readAsText(file);
    };

    const handleGenerate = async () => {
        if (!selectedFile) {
            return;
        }

        try {
            onLoadingChange(true);
            const notes = await uploadTranscript(selectedFile, model);
            setNotes(notes);
            onSuccess(notes);
        } catch (err) {
            setError('Unable to generate meeting notes.');
        } finally {
            onLoadingChange(false);
        }
    };

    const handleSaveMeeting = async () => {
        const title = prompt('Meeting title:');

        if (!title) return;

        const id = await saveMeeting(title, transcript, notes as MeetingNotes);

        alert(`Meeting saved! ID = ${id}`);
    };

    return (
        <div className="p-8 mb-1 bg-white shadow-md rounded-xl">
            {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}
            {selectedFile && <div className="text-sm text-slate-600">📄 {selectedFile.name}</div>}
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
                   hover:file:bg-blue-700
                   mb-1
                   bg-slate-200
                   p-1.5
                   rounded-md
                   mt-4
                   cursor-pointer
                  hover:bg-slate-300"
            />
            <button
                onClick={handleGenerate}
                disabled={loading || !selectedFile}
                className={`mt-1 
          w-full rounded-lg bg-blue-600 py-3 
          text-white transition hover:bg-blue-700 
          cursor-pointer
          ${loading || !selectedFile ? 'disabled:cursor-not-allowed disabled:bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}
                // className={`
                //     w-full rounded-lg py-3 font-semibold text-white transition

                //     ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
                //     `}
            >
                {loading ? 'Generating...' : 'Generate Notes'}
            </button>
            {!notes && (
                <div>
                    Select a model:
                    <select
                        className="p-2 mt-4 ml-2 border rounded-md border-slate-300"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    >
                        <option value="qwen2.5:3b">Qwen 2.5 3B</option>
                        <option value="gemma3:4b">Gemma 3 4B</option>
                        <option value="phi3:mini">Phi-3 Mini</option>
                    </select>
                </div>
            )}

            {notes && (
                <button
                    onClick={handleSaveMeeting}
                    className="rounded bg-green-600 px-4 py-2 text-white mt-4"
                >
                    Save Meeting
                </button>
            )}

            <ExportButtons meetingNotes={notes as MeetingNotes} />
        </div>
    );
}
