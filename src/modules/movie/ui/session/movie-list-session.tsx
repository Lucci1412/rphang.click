"use client";
import React from "react";
import HeroSession from "./hero-session";
import MovieList from "../component/movie-list";
import { trpc } from "@/trpc/client";
const MovieListSession = () => {
  const [dataTopView] = trpc.movie.getTopViewByTime.useSuspenseQuery({
    limit: 10,
    page: 1,
    type: "day",
  });
  return (
    <>
      <HeroSession movie={dataTopView.movies[0]}></HeroSession>
      <MovieList title="Top Xem Nhiều" movies={dataTopView.movies}></MovieList>
      {/* <MovieList></MovieList>
      <MovieList></MovieList> */}
    </>
  );
};

export default MovieListSession;
