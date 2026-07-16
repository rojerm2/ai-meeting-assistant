export default function EmptyState() {
    return (
        <div className="p-12 text-center bg-white border-2 border-dashed rounded-xl border-slate-300">
            <div className="text-5xl">📄</div>

            <p className="mt-4 text-xl font-semibold text-gray-500">No Meeting Notes Yet</p>

            <p className="mt-2 text-slate-500">
                Upload a meeting transcript and click
                <strong> Generate Notes</strong>.
            </p>
        </div>
    );
}
