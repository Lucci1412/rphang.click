"use client";
import { trpc } from "@/trpc/client";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PaginationCustom } from "@/components/pagingnation";
import { PAGE_LIMIT } from "@/const";

import { Skeleton } from "@/components/ui/skeleton";
import MovieCard from "@/components/movie-card";

interface MovieListProps {
  type: string;
  page?: number;
}
export const MovieList = ({ type, page }: MovieListProps) => {
  return (
    <Suspense fallback={<MovieListSkeleton></MovieListSkeleton>}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <MovieListSuspense type={type} page={page} />
      </ErrorBoundary>
    </Suspense>
  );
};

const MovieListSuspense = ({ type, page }: MovieListProps) => {
  const currentPage = page ?? 1;

  const [data] = trpc.movie.getAllByType.useSuspenseQuery({
    type: type,
    page: currentPage,
    limit: PAGE_LIMIT,
  });
  const { movies, pagination } = data;

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-y-4 pt-2.5  ">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {movies?.map((movie,index) => (
             <MovieCard key={index} movie={movie}></MovieCard>
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
    <div className="max-w-[1400px] mx-auto flex flex-col gap-y-4 pt-2.5  ">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {Array.from({ length: PAGE_LIMIT })?.map((_, index) => (
            <Skeleton
              key={index}
              className="relative group overflow-hidden rounded-sm shadow-md cursor-pointer h-[280px] "
            ></Skeleton>
          ))}
        </div>
      </div>
    </div>
  );
};
