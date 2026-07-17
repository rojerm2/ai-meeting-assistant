import { useState, type ChangeEvent } from 'react';
import type { MeetingNotes } from '../models/MeetingNotes';
import type { NotificationType } from '../types/notifications';
import { saveMeeting, uploadTranscript } from '../services/meetingApi';
import ExportButtons from './ExportButtons';

interface UploadFormProps {
    loading: boolean;
    onLoadingChange: (loading: boolean) => void;
    onSuccess: (notes: MeetingNotes) => void;
    onFileSelected: (transcript: string) => void;
    onNotify: (type: NotificationType, title: string, message?: string) => void;
    onMeetingSaved?: (meetingId: number) => void;
}

export default function UploadForm({
    loading,
    onLoadingChange,
    onSuccess,
    onFileSelected,
    onNotify,
    onMeetingSaved,
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
        // setNotes({
        //     summary: 'Sample summary',
        //     keyDecisions: ['Decision 1', 'Decision 2'],
        //     actionItems: ['Action Item 1'],
        //     openQuestions: ['Open Question 1'],
        //     metadata: {
        //         model: 'Sample Model',
        //         durationMs: 1234,
        //         generatedAt: new Date().toISOString(),
        //     },
        // } as MeetingNotes);
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
            onNotify(
                'info',
                'No transcript selected',
                'Please choose a transcript file before generating notes.',
            );
            return;
        }

        try {
            onLoadingChange(true);
            const notes = await uploadTranscript(selectedFile, model);
            setNotes(notes);
            onSuccess(notes);
            onNotify('success', 'Notes generated', 'Meeting notes were generated successfully.');
        } catch (err) {
            setError('Unable to generate meeting notes.');
            onNotify(
                'error',
                'Generation failed',
                'Unable to generate meeting notes. Please try again.',
            );
        } finally {
            onLoadingChange(false);
        }
    };

    const handleSaveMeeting = async () => {
        const title = prompt('Meeting title:');

        if (!title) return;

        try {
            const id = await saveMeeting(title, transcript, notes as MeetingNotes);
            onMeetingSaved?.(id);
            onNotify('success', 'Meeting saved', `Meeting saved. ID = ${id}`);
        } catch (err) {
            onNotify('error', 'Save failed', 'Unable to save meeting. Please try again.');
        }
    };

    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900">Generate meeting notes</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Upload a transcript, choose a model, and turn it into a polished summary.
                    </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600">
                    Step 1 · Upload
                </div>
            </div>

            <div className="mt-6 space-y-4">
                {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">
                        Transcript file
                    </span>
                    <input
                        type="file"
                        accept=".txt"
                        onChange={handleFileChange}
                        className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-white file:cursor-pointer hover:file:bg-slate-700"
                    />
                    {selectedFile && (
                        <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                            📄 {selectedFile.name}
                        </div>
                    )}
                </label>

                {!notes && (
                    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-800">Model</p>
                            <p className="text-sm text-slate-500">
                                Choose the local model for generation.
                            </p>
                        </div>
                        <select
                            className="rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-400"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        >
                            <option value="qwen2.5:3b">Qwen 2.5 3B</option>
                            <option value="gemma3:4b">Gemma 3 4B</option>
                            <option value="phi3:mini">Phi-3 Mini</option>
                        </select>
                    </div>
                )}

                <button
                    onClick={handleGenerate}
                    disabled={loading || !selectedFile}
                    className={`w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400 ${loading ? 'animate-pulse' : ''}`}
                >
                    {loading ? 'Generating...' : 'Generate Notes'}
                </button>

                {notes && (
                    <button
                        onClick={handleSaveMeeting}
                        className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                    >
                        Save Meeting
                    </button>
                )}
            </div>
        </section>
    );
}
