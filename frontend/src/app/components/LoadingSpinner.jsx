export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-700 border-t-indigo-500 animate-spin"></div>
        <div className="absolute inset-4 rounded-full border-4 border-gray-800 border-t-indigo-500 animate-spin-slow"></div>
      </div>
    </div>
  );
}
