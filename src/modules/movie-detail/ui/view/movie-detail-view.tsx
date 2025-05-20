"use client";
import { trpc } from "@/trpc/client";
import { MovieDetailOutput } from "../type";
import NoMoviesFound from "@/components/no-movie-found";
import { ErrorBoundary } from "react-error-boundary";
import MovieHeroSession from "../session/movie-hero-session";
import MovieDetailSession from "../session/movie-detail-session";
// import SimilarSession from "../session/similar-session";
import MovieHeroSkeleton from "../components/skeleton/movie-hero-skeleton";
// import DetailSkeleton from "../components/skeleton/movie-detail-skeleton";
// import SimilarSkeleton from "../components/skeleton/similar-skeleton";
import SimilarSession from "../session/similar-session";
import { Suspense } from "react";

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
    <div className="min-h-screen bg-background">
      <MovieHeroSession movie={movie}></MovieHeroSession>
      <MovieDetailSession movie={movie}></MovieDetailSession>
      <SimilarSession />
    </div>
  );
};

export default MovieDetailView;
const MovieDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <MovieHeroSkeleton></MovieHeroSkeleton>
      {/* <DetailSkeleton></DetailSkeleton>
      <SimilarSkeleton></SimilarSkeleton> */}
    </div>
  );
};
