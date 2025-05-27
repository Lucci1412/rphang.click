"use client";
import { trpc } from "@/trpc/client";
import { Calendar, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Trailer = () => {
  const [dataTopView] = trpc.movie.getTopTrailer.useSuspenseQuery({
    limit: 5,
  });
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold text-orange-500 mb-4 uppercase">
        SẮP CHIẾU
      </h3>
      <div className="space-y-3">
        {dataTopView.movies.map((movie) => (
          <Link
            href={`/${
              movie.type == "single"
                ? "phim-le"
                : movie.type == "series"
                ? "phim-bo"
                : movie.type == "hoathinh"
                ? "hoat-hinh"
                : "tvshow"
            }/${movie.slug}-${movie.quality}-${movie.year}`}
            key={movie.id}
            className="flex items-center space-x-3 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer transition-colors"
          >
            <Image
              width={48}
              height={64}
              src={movie.thumb_url || "/placeholder.svg"}
              alt={movie.name}
              className="w-12 h-16 object-cover rounded flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-sm font-medium truncate leading-tight">
                {movie.name}
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                  <span className="text-xs text-gray-400">{movie.year}</span>
                </div>
              </div>
              <div className="flex items-center mt-1">
                <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-yellow-400">
                  {movie.vote_average}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Trailer;
