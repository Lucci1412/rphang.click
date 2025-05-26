"use client";
import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { MovieDetailOutput } from "../type";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import LazyVideoPlayerWrapper from "../components/lazy-video-player-wrapper";
import NoMoviesFound from "@/components/no-movie-found";
import MovieDetail from "../components/movie-detail";

interface MoviePlayerViewProps {
  slug: string;
  episodeId: string;
}

export const MoviePlayerView = ({ slug, episodeId }: MoviePlayerViewProps) => {
  return (
    <Suspense fallback={<MoviePlayerViewSkeleton></MoviePlayerViewSkeleton>}>
      <ErrorBoundary fallback={<NoMoviesFound />}>
        <MoviePlayerViewSuspense slug={slug} episodeId={episodeId} />
      </ErrorBoundary>
    </Suspense>
  );
};
const MoviePlayerViewSuspense = ({ slug, episodeId }: MoviePlayerViewProps) => {
  const [data] = trpc.movieDetail.getBySlug.useSuspenseQuery({ slug });
  const movie = data as MovieDetailOutput;
  if (!movie) {
    return <NoMoviesFound />;
  }
  const videoData = movie.episodes.filter(
    (episode) => episode.slug === episodeId
  )[0];

  return (
    <div className="p-4">
      <div>
        <h1 className="text-xl font-bold mb-2">
          {movie.name} {movie.year} - Tập {videoData?.name}
        </h1>
      </div>
      <LazyVideoPlayerWrapper
        src={videoData?.linkM3u8 ?? ""}
        movieId={movie.id}
        poster={movie.thumb_url ?? ""}
      />
      <MovieDetail movie={movie}></MovieDetail>
    </div>
  );
};

export default MoviePlayerView;
const MoviePlayerViewSkeleton = () => {
  return (
    <div className="p-4">
      {/* name movie skeleton */}
      <div>
        <Skeleton className="h-7 w-[500px]"></Skeleton>
      </div>
      {/* video player skeleton */}
      <Skeleton className=" w-full h-[315px] md:h-[500px] rounded-md" />
      {/* episode skeleton */}
      <div className="w-full p-4 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-md">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-2">
          {Array.from({ length: 12 }).map((_, idx) => (
            <Skeleton key={idx} className="w-full h-10 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
};
