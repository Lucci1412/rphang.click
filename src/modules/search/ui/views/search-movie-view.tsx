"use client";
import { trpc } from "@/trpc/client";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PAGE_LIMIT } from "@/const";
import { Skeleton } from "@/components/ui/skeleton";
import MovieCard from "@/components/movie-card";
import { PaginationSearch } from "@/components/pagination-search";
import NoMoviesFound from "@/components/no-movie-found";

interface MovieListProps {
  search: string;
  page?: number;
}
export const SearchMovieView = ({ search, page }: MovieListProps) => {
  return (
    <Suspense fallback={<MovieListSkeleton></MovieListSkeleton>}>
      <ErrorBoundary fallback={<div>Lỗi rồi ní ơi </div>}>
        <MovieListSuspense search={search} page={page} />
      </ErrorBoundary>
    </Suspense>
  );
};

const MovieListSuspense = ({ search, page }: MovieListProps) => {
  const currentPage = page ?? 1;

  const [data] = trpc.search.searchMovie.useSuspenseQuery({
    keyword: search,
    page: currentPage,
    limit: PAGE_LIMIT,
  });
  const { movies, pagination } = data;
  if (!movies || movies.length === 0) {
    return <NoMoviesFound search={search} />;
  }
  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-y-4 pt-2.5  ">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <Suspense fallback={<div>Đang tải...</div>}>
          <PaginationSearch
            currentPage={pagination.page}
            totalPage={pagination.totalPages}
            limit={pagination.limit}
          ></PaginationSearch>
        </Suspense>
      </div>
    </div>
  );
};
const MovieListSkeleton = () => {
  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-y-4 pt-2.5  ">
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
