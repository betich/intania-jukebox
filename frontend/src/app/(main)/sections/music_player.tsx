import { H1, H3 } from "@/components/common/typography";
import { Player } from "@/components/music";

export default function MusicPlayer() {
  return (
    <div className="flex bg-red-50 flex-col w-full pt-12 pb-6">
      <div className="max-w-screen-sm flex gap-4 flex-col items-center">
        <Player />
        <div className="flex flex-col items-center gap-0">
          <H1>Something</H1>
          <H3>The Beatles</H3>
        </div>
      </div>
    </div>
  );
}
