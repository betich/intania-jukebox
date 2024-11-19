"use client";
import Image from "next/image";
import { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";

interface MusicSearchCardProps {
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

export default function MusicSearchCard({
  title,
  artist,
  duration,
  cover,
}: MusicSearchCardProps) {
  const [inQueue, setInQueue] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
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
      <div className="flex flex-col items-center">
        {inQueue ? (
          <>
            <button onClick={() => setIsLiked((l) => !l)}>
              {isLiked ? (
                <RiThumbUpFill className="text-slate-900 w-6 h-6" />
              ) : (
                <RiThumbUpLine className="text-slate-900 w-6 h-6" />
              )}
            </button>
            <p className="text-xs font-bold trext-black">6</p>
          </>
        ) : (
          <button onClick={() => setInQueue(true)}>
            <BsPlusCircleFill className="text-slate-900 hover:text-slate-500 druation-300 ease-in-out transition-colors w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
