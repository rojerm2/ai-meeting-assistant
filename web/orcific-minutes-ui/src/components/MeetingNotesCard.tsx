import type { MeetingNotes } from '../models/MeetingNotes.ts';

interface Props {
    notes: MeetingNotes;
    onDownloadPdf: () => void;
}

export default function MeetingNotesCard({ notes, onDownloadPdf }: Props) {
    return (
        <div>
            <div className="p-8 mt-8 bg-white shadow-md rounded-xl">
                {/* Metadata */}
                <div className="mb-6 rounded-md bg-slate-100 p-4 text-sm">
                    <p>
                        <strong>Model:</strong> {notes.metadata.model}
                    </p>
                    <p>
                        <strong>Generation Time:</strong>{' '}
                        {(notes.metadata.durationMs / 1000).toFixed(2)} sec
                    </p>
                    <p>
                        <strong>Generated At:</strong>{' '}
                        {new Date(notes.metadata.generatedAt).toLocaleString()}
                    </p>
                </div>

                <section className="mb-6">
                    <span className="mb-2 text-xl font-bold">Summary</span>
                    <p className="whitespace-pre-wrap">{notes.summary}</p>
                </section>

                <section className="mb-6">
                    <span className="mb-2 text-xl font-bold">Key Decisions</span>

                    {notes.keyDecisions?.length > 0 ? (
                        <ul className="list-disc pl-6">
                            {notes.keyDecisions.map((decision, index) => (
                                <li key={index}>{decision}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No key decisions.</p>
                    )}
                </section>

                <section className="mb-6">
                    <span className="mb-2 text-xl font-bold">Action Items</span>

                    {notes.actionItems?.length > 0 ? (
                        <ul className="list-disc pl-6">
                            {notes.actionItems.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No action items.</p>
                    )}
                </section>

                <section>
                    <span className="mb-2 text-xl font-bold">Open Questions</span>

                    {notes.openQuestions?.length > 0 ? (
                        <ul className="list-disc pl-6">
                            {notes.openQuestions.map((question, index) => (
                                <li key={index}>{question}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No open questions.</p>
                    )}
                </section>
            </div>

            <div>
                <button
                    onClick={onDownloadPdf}
                    className=" mt-3 rounded bg-green-600 px-4 py-2 text-white cursor-pointer hover:bg-green-700 transition"
                >
                    Download as PDF
                </button>
            </div>
        </div>

        // <div className="p-8 mt-8 bg-white shadow-md rounded-xl">

        //     <section>
        //         <div className="mb-2 text-xl font-bold">Summary</div>
        //         <p>{notes.summary}</p>
        //     </section>

        // <button
        //     onClick={onDownloadPdf}
        //     className="ml-3 rounded bg-green-600 px-4 py-2 text-white cursor-pointer hover:bg-green-700 transition"
        // >
        //     Download as PDF
        // </button>
        // </div>
    );
}
