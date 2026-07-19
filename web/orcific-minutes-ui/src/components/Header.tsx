export default function Header() {
    return (
        <header className="overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950 px-6 py-7 text-white shadow-[0_20px_60px_-24px_rgba(30,41,59,0.55)] sm:px-8 sm:py-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-400 text-base text-slate-950">✦</span>
                        AI meeting workspace
                    </div>
                    <div className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                        Orcific Minutes
                    </div>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                        Turn raw conversation into clear decisions, ownership, and next steps.
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-medium text-slate-200 backdrop-blur">
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                    Local &amp; private workspace
                </div>
            </div>
        </header>
    );
}
