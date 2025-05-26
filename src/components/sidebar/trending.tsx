"use client";
import { trpc } from "@/trpc/client";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Trending = () => {
  const [dataTopView] = trpc.movie.getTopViewByTime.useSuspenseQuery({
    limit: 10,
    page: 1,
    type: "weekly",
  });
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold text-orange-500 mb-4 uppercase">
        TRENDING
      </h3>
      <div className="space-y-3">
        {dataTopView.movies.map((movie, index) => (
          <Link
            href={`/phim/${movie.slug}-${movie.year}-vietsub`}
            key={movie.id}
            className="flex items-center space-x-3 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer transition-colors"
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                index <= 3
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                  : "bg-gray-600 text-gray-300"
              }`}
            >
              {index + 1}
            </div>
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
              <div className="flex flex-col items-start space-x-2 mt-1 ">
                <div className="flex  ">
                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-yellow-400">
                    {movie.vote_average}
                  </span>
                </div>
                <div className="flex ">
                  <span className="text-xs text-gray-400">
                    {movie.view_count} lượt xem
                  </span>
                  {/* <span className="text-xs text-gray-500">{movie.time}</span> */}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Trending;
