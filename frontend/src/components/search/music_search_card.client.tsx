"use client";
import { SongQueue, type Song } from "@/stores/music";
import Image from "next/image";
import { BsPlusCircleFill } from "react-icons/bs";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";

interface MusicSearchCardProps {
  song: Song;
  music: SongQueue[];
  addMusic: (song: Song) => void;
  likeMusic: (songId: string) => void;
}

export default function MusicSearchCard({
  song,
  music,
  likeMusic,
  addMusic,
}: MusicSearchCardProps) {
  const inQueue = music.some((m) => m.id === song.id);
  const isLiked = music.some((m) => m.id === song.id && m.likes > 0);
  const likeCount = music.find((m) => m.id === song.id)?.likes || 0;

  return (
    <button
      onClick={() => {
        if (inQueue && !isLiked) likeMusic(song.id);
        else if (!inQueue) addMusic(song);
      }}
      className="flex bg-white px-2 py-2 rounded-lg duration-300 transition-all ease-in-out hover:bg-slate-100 hover:border-slate-400 border-white border justify-between items-center"
    >
      <div className="flex gap-2 items-center">
        <Image
          src={song.cover}
          width={64}
          height={64}
          alt={song.title}
          className="rounded-md w-16 h-16"
        ></Image>
        <div className="flex flex-col gap-1 items-start justify-center">
          <p className="text-lg text-left font-bold text-black leading-none">
            {song.title}
          </p>
          <p className="text-base text-left font-medium text-slate-500">
            {song.artist} · {song.duration}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        {inQueue ? (
          <>
            {isLiked ? (
              <RiThumbUpFill className="text-slate-900 w-6 h-6" />
            ) : (
              <RiThumbUpLine className="text-slate-900 w-6 h-6" />
            )}
            <p className="text-xs font-bold trext-black">{likeCount}</p>
          </>
        ) : (
          <BsPlusCircleFill className="text-slate-900 hover:text-slate-500 druation-300 ease-in-out transition-colors w-6 h-6" />
        )}
      </div>
    </button>
  );
}

export function MusicSearchCardSkeleton() {
  return (
    <div className="flex bg-white px-2 py-2 rounded-lg duration-300 transition-all ease-in-out border-white border justify-between items-center">
      <div className="flex gap-2 items-center">
        <div className="rounded-md w-16 h-16 bg-gray-400 animate-pulse"></div>
        <div className="flex flex-col gap-1 items-start justify-center">
          <div className="w-40 h-3 bg-gray-400 rounded-sm animate-pulse"></div>
          <div className="w-64 h-3 bg-gray-400 rounded-sm animate-pulse"></div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-6 h-6 bg-gray-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
