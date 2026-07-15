export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-8">
            <div
                className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600"
            />

             <p className="mt-4 text-slate-600">
                Generating meeting notes...
            </p>
        </div>
    );
}
