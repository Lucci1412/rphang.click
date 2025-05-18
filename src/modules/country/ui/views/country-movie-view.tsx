"use client";
import { trpc } from "@/trpc/client";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PaginationCustom } from "@/components/pagingnation";
import { PAGE_LIMIT } from "@/const";

import { Skeleton } from "@/components/ui/skeleton";
import MovieCard from "@/components/movie-card";
import NoMoviesFound from "@/components/no-movie-found";

interface MovieListProps {
  country: string;
  page?: number;
}
export const CountryMovieView = ({ country, page }: MovieListProps) => {
  return (
    <Suspense fallback={<MovieListSkeleton></MovieListSkeleton>}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <MovieListSuspense country={country} page={page} />
      </ErrorBoundary>
    </Suspense>
  );
};

const MovieListSuspense = ({ country, page }: MovieListProps) => {
  const currentPage = page ?? 1;

  const [data] = trpc.movie.getMovieByCountry.useSuspenseQuery({
    country: country,
    page: currentPage,
    limit: PAGE_LIMIT,
  });
  const { movies, pagination } = data;
  if (!movies || movies.length === 0) {
    return <NoMoviesFound search={""} />;
  }
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-y-6 pt-2.5  ">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <PaginationCustom
          currentPage={pagination.page}
          totalPage={pagination.totalPages}
          limit={pagination.limit}
        ></PaginationCustom>
      </div>
    </div>
  );
};
const MovieListSkeleton = () => {
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-y-6 pt-2.5  ">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {Array.from({ length: PAGE_LIMIT })?.map((_, index) => (
            <Skeleton
              key={index}
              className="relative group overflow-hidden rounded-sm shadow-md cursor-pointer h-[150px] "
            ></Skeleton>
          ))}
        </div>
      </div>
    </div>
  );
};
