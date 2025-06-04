import { trpc } from "@/trpc/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SideBar = () => {
  const [data ]= trpc.movie.getTopNew.useSuspenseQuery({limit:10})
 
  return (
    <div className="space-y-4">
      {data.movies.map((movie) => (
        <Link key={movie.id} href={`/phim/${movie.slug}`} className="block group">
          <div className="flex space-x-3">
            <div className="relative w-24 h-16 bg-gray-800 rounded overflow-hidden flex-shrink-0">
              <Image
                src={movie.thumb_url??''}
                alt={movie.slug}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-1 left-1">
                <span className="bg-red-600 text-xs px-1 rounded">Vietsub</span>
              </div>
              <div className="absolute bottom-1 right-1">
                <span className="bg-black/70 text-xs px-1 rounded">
                  {movie.time}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium line-clamp-2 group-hover:text-red-500">
                {movie.slug}
              </h3>
              {/* <p className="text-xs text-gray-400 mt-1">
                {movie.} lượt xem
              </p> */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
