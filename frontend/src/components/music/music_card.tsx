import Image from "next/image";

interface MusicCardProps {
  title: string;
  artist: string;
  duration: string;
  position: number;
  cover: string;
}

export default function MusicCard({
  title,
  artist,
  duration,
  position,
  cover,
}: MusicCardProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <p className="font-medium w-4 text-2xl font-sans text-black">
          {position}
        </p>
        <Image
          src={cover}
          width={64}
          height={64}
          alt={title}
          className="rounded-md w-16 h-16"
        ></Image>
        <div className="flex flex-col gap-1 jusitfy-center">
          <p className="text-lg font-bold text-black leading-none">{title}</p>
          <p className="text-lg font-medium text-slate-500">
            {artist} · {duration}
          </p>
        </div>
      </div>
    </div>
  );
}
