"use client";
import Image from "next/image";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";

interface MusicCardProps {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  position: number;
  likes: number;
  likeMusic: (songId: string) => void;
  isLiked: boolean;
}

export default function MusicCard({
  id,
  title,
  artist,
  duration,
  position,
  likes,
  cover,
  likeMusic,
  isLiked,
}: MusicCardProps) {
  return (
    <button
      onClick={() => {
        if (!isLiked) {
          likeMusic(id);
        }
      }}
      className="flex bg-white px-2 py-2 rounded-lg duration-300 transition-all ease-in-out hover:bg-slate-100 hover:border-slate-400 border-white border justify-between items-center"
    >
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
          priority
        ></Image>
        <div className="flex flex-col items-start">
          <p className="text-lg text-left font-bold text-black leading-none">
            {title}
          </p>
          <p className="text-base text-left font-medium text-slate-500">
            {artist} · {duration}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span>
          {isLiked ? (
            <RiThumbUpFill className="text-slate-900 w-6 h-6" />
          ) : (
            <RiThumbUpLine className="text-slate-900 w-6 h-6" />
          )}
        </span>
        <p className="text-xs font-bold trext-black">{likes}</p>
      </div>
    </button>
  );
}
