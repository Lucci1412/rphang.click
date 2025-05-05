"use client";
import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/trpc/client";
import { MovieDescription } from "../components/description";
import { EpisodeList } from "../components/episode-list";
import { MovieDetailOutput } from "../type";
import NoMoviesFound from "@/components/no-movie-found";
import { ErrorBoundary } from "react-error-boundary";
import { Skeleton } from "@/components/ui/skeleton";

interface MovieDetailViewProps {
  slug: string;
}
export const MovieDetailView = ({ slug }: MovieDetailViewProps) => {
  return (
    <Suspense fallback={<MovieDetailSkeleton />}>
      <ErrorBoundary fallback={<NoMoviesFound />}>
        <MovieDetailViewSuspense slug={slug} />
      </ErrorBoundary>
    </Suspense>
  );
};
const MovieDetailViewSuspense = ({ slug }: MovieDetailViewProps) => {
  const [data] = trpc.movieDetail.getBySlug.useSuspenseQuery({ slug });
  const movie = data as MovieDetailOutput;

  return (
    <>
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8">
          {/* Movie Poster */}

          <div className="relative w-full aspect-[2/3]">
            <Card className="overflow-hidden w-full h-full relative">
              <Image
                src={movie.thumb_url ?? ""}
                alt={movie.name}
                fill
                priority
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 50vw, 300px"
                quality={50}
              />
              <Link href={`/phim/${movie.slug}/${movie.episodes[0].slug}`}>
                <Button className="absolute bottom-6 left-6 right-6 bg-red-600 hover:bg-red-700 text-white gap-2 cursor-pointer">
                  <Play className="h-4 w-4" />
                  Xem Phim
                </Button>
              </Link>
            </Card>
          </div>
          {/* Movie Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold  mb-1">{movie.name}</h1>
              <p className="text-xl mb-4">{movie.origin_name}</p>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center  px-3 py-1 rounded-md">
                  <span className="text-3xl font-bold text-amber-600 mr-2">
                    {movie.vote_average}
                  </span>
                  <div className="flex">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.round(movie.vote_average ?? 0)
                            ? "fill-amber-600 text-amber-600"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-zinc-500 text-sm">
                  {movie.vote_count} lượt đánh giá
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-semibold min-w-30">Diễn viên:</span>
                  <div className="flex flex-wrap gap-x-1">
                    {movie.actor.slice(0, 5).map((name, index) => (
                      <span key={index} className="flex items-center">
                        {name}

                        {index < movie.actor.slice(0, 5).length - 1 && (
                          <span className="ml-1">,</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold min-w-30">Thể loại:</span>
                  <div className="flex flex-wrap gap-x-1">
                    {movie?.categories.map((item, index) => (
                      <span key={index} className="flex items-center">
                        <Link
                          href={`/the-loai/${item.category.slug}`}
                          className="text-blue-600 hover:underline"
                        >
                          {item.category.name}
                        </Link>
                        {index < movie.categories.length - 1 && (
                          <span className="ml-1">,</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold min-w-30">Trạng thái:</span>
                  <Link href="#" className="text-red-600 font-medium">
                    {movie.episode_current}
                  </Link>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold min-w-30">Quốc gia:</span>
                  <div className="flex flex-wrap gap-x-1">
                    {movie.countries.slice(0, 5).map((item, index) => (
                      <span key={index} className="flex items-center">
                        <Link
                          href={`/quoc-gia/${item.country.slug}`}
                          className="text-blue-600 hover:underline"
                        >
                          {item.country.name}
                        </Link>
                        {index < movie.countries.slice(0, 5).length - 1 && (
                          <span className="ml-1">,</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold min-w-30">Thời lượng:</span>
                  <span>{movie.time}</span>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold min-w-30">Lượt xem:</span>
                  <span>{movie.view}</span>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold min-w-30">Năm xuất bản: </span>
                  <span>{movie.year}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-bold mb-3">Nội dung phim</h2>
              <div className="text-zinc-700">
                <MovieDescription
                  description={movie.content ?? ""}
                ></MovieDescription>
              </div>
            </div>
          </div>
        </div>
        <EpisodeList movie={movie}></EpisodeList>
      </div>
    </>
  );
};

export default MovieDetailView;
const MovieDetailSkeleton = () => {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8">
        {/* Poster */}
        <div className="relative w-full aspect-[2/3]">
          <div className="relative w-full h-full rounded-md overflow-hidden">
            <Skeleton className="w-full h-full absolute top-0 left-0 rounded-md" />
            <Skeleton className="absolute bottom-6 left-6 right-6 h-10" />
          </div>
        </div>

        {/* Movie Detail */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-6" />

            <div className="flex items-center gap-2 mb-6">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-5 w-32" />
            </div>

            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="w-24 h-5" />
                  <Skeleton className="flex-1 h-5" />
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-muted" />

          <div>
            <Skeleton className="h-6 w-40 mb-3" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-3">
        <Skeleton className="h-6 w-40 mb-2" />
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};
