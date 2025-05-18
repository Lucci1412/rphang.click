"use client";
import React, { Suspense } from "react";

import { trpc } from "@/trpc/client";
import { MovieDetailOutput } from "../type";
import NoMoviesFound from "@/components/no-movie-found";
import { ErrorBoundary } from "react-error-boundary";
import { Skeleton } from "@/components/ui/skeleton";
import MovieHeroSession from "../session/movie-hero-session";
import MovieDetailSession from "../session/movie-detail-session";
import SimilarSession from "../session/similar-session";

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
    <div className="min-h-screen !bg-background">
      <MovieHeroSession movie={movie}></MovieHeroSession>
      <MovieDetailSession movie={movie}></MovieDetailSession>
      <SimilarSession />
    </div>
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
