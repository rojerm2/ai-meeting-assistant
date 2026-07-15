export default function EmptyState() {
    return (
        <div className="rounded-xl border-2 border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="text-5xl">📄</div>

            <p className="mt-4 text-xl font-semibold text-gray-500"
            >
                No Meeting Notes Yet
            </p>

            <p className="mt-2 text-slate-500">
                Upload a meeting transcript and click
                <strong> Generate Notes</strong>.
            </p>
        </div>
    );
}