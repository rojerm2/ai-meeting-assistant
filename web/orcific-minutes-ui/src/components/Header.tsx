export default function Header() {
    return (
        <header className="rounded-3xl border border-slate-200 bg-white/80 px-6 py-8 shadow-sm backdrop-blur sm:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                        AI meeting workspace
                    </p>
                    <div className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                        Orcific Minutes
                    </div>
                    <p className="mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
                        Generate summaries, save meetings, and ask questions about your saved
                        conversations with a polished local AI workflow.
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    Local LLM • Saved history • RAG assistant
                </div>
            </div>
        </header>
    );
}
