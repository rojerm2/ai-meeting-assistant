export default function UploadForm() {
    return (
        <div className="bg-white rounded-xl shadow-md p-8">
            
            <input
                type="file"
                accept=".txt"
                className="block w-full text-sm text-slate-700
                           file:mr-4
                           file:rounded-md
                           file:border-0
                           file:bg-blue-600
                           file:px-4
                           file:py-2
                           file:text-white
                           file:cursor-pointer
                           hover:file:bg-blue-700"
             />

             <button className="mt-6 w-full rounded-lg
                                bg-blue-600
                                py-3
                                text-white
                                hover:bg-blue-700
                                transition">
                Generate Notes
             </button>
        </div>
    )
}