export default function MusicPlayer() {
  return (
    <div className="flex bg-red-50 flex-col w-full pt-12 pb-6">
      <div className="max-w-screen-sm flex gap-4 flex-col items-center">
        <div className="bg-gray-400 rounded-full w-72 h-72"></div>
        <div className="flex flex-col items-center gap-0">
          <h1 className="font-bold text-4xl text-black">Something</h1>
          <h1 className="font-medium text-2xl text-slate-500">The Beatles</h1>
        </div>
      </div>
    </div>
  );
}
