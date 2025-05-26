"use client";
import { trpc } from "@/trpc/client";
import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const Rank = () => {
  const [dataTopView] = trpc.movie.getTopViewByTime.useSuspenseQuery({
    limit: 10,
    page: 1,
    type: "all",
  });
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold text-orange-500 mb-4 uppercase">
        BẢNG XẾP HẠNG
      </h3>
      <div className="space-y-2">
        {dataTopView.movies.map((movie, index) => (
          <Link
            href={`/phim/${movie.slug}-${movie.year}-vietsub`}
            key={movie.id}
            className="flex items-center space-x-3 p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer transition-colors"
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
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-sm font-medium truncate leading-tight">
                {movie.name}
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center">
                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-yellow-400">
                    {movie.vote_average}
                  </span>
                </div>
                <span className="text-xs text-gray-400">({movie.year})</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Rank;
