export const ErrorDisplay = ({ error }: { error: string }) => {
    if (!error) return null;
    return (
        <div className="max-w-2xl mx-auto mb-8 bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl flex items-center justify-center gap-3 animate-pulse">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
        </div>
    );
};
