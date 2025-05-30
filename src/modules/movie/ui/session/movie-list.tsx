"use client";
import React from "react";
import { trpc } from "@/trpc/client";
import MovieCard from "@/components/movie-card";
const MovieListSession = () => {
  const [data] = trpc.movie.getTopNew.useSuspenseQuery({
    limit: 20,
  });
  const { movies } = data;
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={index}></MovieCard>
        ))}
      </div>
    </>
  );
};

export default MovieListSession;
