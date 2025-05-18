"use client";
import MovieSlider from "@/modules/movie/ui/component/movie-slider";
import { trpc } from "@/trpc/client";
import React from "react";

const SimilarSession = () => {
  const [dataTopView] = trpc.movie.getTopViewByTime.useSuspenseQuery({
    limit: 10,
    page: 1,
    type: "day",
  });
  return (
    <section className="py-6 sm:py-8">
      <div className="container">
        <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold tracking-tight">
          Có thể bạn sẽ thích
        </h2>
        <MovieSlider movies={dataTopView.movies} />
      </div>
    </section>
  );
};

export default SimilarSession;
