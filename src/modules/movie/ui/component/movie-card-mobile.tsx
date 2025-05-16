/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { PlayCircle } from "lucide-react";
import Link from "next/link";

interface MovieCardProps {
  movie: any;
  quality?: number;
}

export default function MovieCardMobile({
  movie,
}: MovieCardProps) {
  return (
    <Link href={`/phim/${movie.slug}`}>
      <div
        className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer 
         h-[280px]"
      >
        <div className="absolute top-2 left-2 text-white bg-red-600 text-xs font-bold py-1 px-2 rounded z-10">
          {movie.quality}
        </div>

        {/* Thumbnail */}
        <Image
          src={movie.thumb_url ?? ""}
          alt={movie.name}
          width={150}
          height={280}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          quality={10}
        />

        <div className="absolute inset-0 flex items-center justify-center  bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayCircle className="text-yellow-500 w-16 h-16" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-2 bg-black/35 bg-opacity-70 text-white text-sm font-semibold truncate">
          {movie.name}
        </div>
      </div>
    </Link>
  );
}
