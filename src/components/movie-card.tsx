/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import React from "react";
import Image from "next/image";
interface Props {
  movie: any;
}
const MovieCard = ({ movie }: Props) => {
  return (
    <Link key={movie.id} href={`/phim/${movie.slug}`} className="group">
      <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden ">
        <Image
          src={movie.thumb_url}
          alt={movie.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform"
          quality={40}
        />
        <div className="absolute top-2 left-2">
          <span className="bg-red-600 text-xs px-2 py-1 rounded">Vietsub</span>
        </div>
        <div className="absolute bottom-2 right-2">
          <span className="bg-black/70 text-xs px-2 py-1 rounded">
            {movie.time}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M8 5v10l8-5-8-5z" />
            </svg>
          </div>
        </div>
      </div>
      <h3 className="mt-2 text-sm font-medium line-clamp-2 group-hover:text-red-500">
        {movie.name}
      </h3>
      <div className="flex items-center justify-between mt-1 text-xs text-gray-400">
        {/* <span>{movie.view} lượt xem</span> */}
        {/* <span>{movie.category}</span> */}
      </div>
    </Link>
  );
};

export default MovieCard;
