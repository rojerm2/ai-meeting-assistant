export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-8">
            <div className="w-10 h-10 border-4 rounded-full animate-spin border-slate-300 border-t-blue-600" />

            <p className="mt-4 text-slate-600">Generating meeting notes...</p>
        </div>
    );
}
