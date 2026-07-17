import type { MeetingNotes } from '../models/MeetingNotes.ts';
import ExportButtons from './ExportButtons';

interface Props {
    notes: MeetingNotes;
    onDownloadPdf: () => void;
    onNotify: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
}

export default function MeetingNotesCard({ notes, onDownloadPdf, onNotify }: Props) {
    return (
        <div className="mt-8 rounded-4xl bg-white p-8 shadow-md">
            <div className="mb-8 rounded-3xl bg-slate-100 p-6 text-sm text-slate-700">
                <div className="grid gap-3 md:grid-cols-3">
                    <div>
                        <p className="font-semibold text-slate-900">Model</p>
                        <p>{notes.metadata.model}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-slate-900">Generation Time</p>
                        <p>{(notes.metadata.durationMs / 1000).toFixed(2)} sec</p>
                    </div>
                    <div>
                        <p className="font-semibold text-slate-900">Generated At</p>
                        <p>{new Date(notes.metadata.generatedAt).toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <section className="mb-8">
                <h3 className="mb-3 text-xl font-semibold text-slate-900">Summary</h3>
                <p className="text-justify whitespace-pre-wrap text-slate-700">{notes.summary}</p>
            </section>

            <div className="grid gap-6 lg:grid-cols-3">
                <section>
                    <h4 className="mb-3 text-lg font-semibold text-slate-900">Key Decisions</h4>
                    {notes.decisions?.length > 0 ? (
                        <ul className="text-left list-disc space-y-2 pl-6 text-slate-700">
                            {notes.decisions.map((decision, index) => (
                                <li key={index}>{decision}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-500">No key decisions.</p>
                    )}
                </section>

                <section>
                    <h4 className="mb-3 text-lg font-semibold text-slate-900">Action Items</h4>
                    {notes.actionItems?.length > 0 ? (
                        <ul className="text-left list-disc space-y-2 pl-6 text-slate-700">
                            {notes.actionItems.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-500">No action items.</p>
                    )}
                </section>

                <section>
                    <h4 className="mb-3 text-lg font-semibold text-slate-900">Open Questions</h4>
                    {notes.openQuestions?.length > 0 ? (
                        <ul className="text-left list-disc space-y-2 pl-6 text-slate-700">
                            {notes.openQuestions.map((question, index) => (
                                <li key={index}>{question}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-500">No open questions.</p>
                    )}
                </section>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
                <ExportButtons meetingNotes={notes} onDownloadPdf={onDownloadPdf} onNotify={onNotify} />
            </div>
        </div>
    );
}
