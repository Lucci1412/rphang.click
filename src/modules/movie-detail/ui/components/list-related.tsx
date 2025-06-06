"use client";
import { trpc } from "@/trpc/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ListRelated = () => {
  const [data] = trpc.movie.getTopNew.useSuspenseQuery({ limit: 10 });
  const { movies } = data;

  return (
    <div>
      <div className="mt-12">
        <h2 className="text-lg font-bold mb-6">Có thể bạn sẽ thích</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <Link key={movie.id} href={`/phim/${movie.slug}`} className="group">
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <Image
                  src={movie.thumb_url ?? ""}
                  alt={movie.name}
                  fill
                  quality={40}
                  className="object-cover group-hover:scale-105 transition-transform"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-red-600 text-xs px-2 py-1 rounded">
                    Vietsub
                  </span>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="bg-black/70 text-xs px-2 py-1 rounded">
                    {movie.time}
                  </span>
                </div>
              </div>
              <h3 className="mt-2 text-sm font-medium line-clamp-2 group-hover:text-red-500">
                {movie.name}
              </h3>
              {/* <p className="text-xs text-gray-400 mt-1">
                {movie.} lượt xem
              </p> */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListRelated;
