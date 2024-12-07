import { H2, H3 } from "@/components/common/typography";
import { Song } from "@/stores/music";
import Image from "next/image";

function PlayerSkeleton() {
  return (
    <div className="max-w-screen-sm mx-auto flex gap-4 flex-col items-center">
      <div>
        <div className="bg-gray-400 rounded-full w-72 h-72"></div>
      </div>
      <div className="flex flex-col items-center gap-0">
        <H2 className="text-center">Song</H2>
        <H3 className="text-center">Artist</H3>
      </div>
    </div>
  );
}

export default function Player({ music }: { music: Song[] }) {
  const song = music[0];

  if (song === undefined) return <PlayerSkeleton />;
  else
    return (
      <div className="max-w-screen-sm mx-auto flex gap-4 flex-col items-center">
        <div>
          <Image
            className="bg-gray-400 rounded-full w-72 h-72"
            src={song.cover}
            width={288}
            height={288}
            alt={song.title}
          />
        </div>
        <div className="flex flex-col items-center gap-0">
          <H2 className="text-center">{song.title}</H2>
          <H3 className="text-center">{song.artist}</H3>
        </div>
      </div>
    );
}
