"use client";
import React from "react";
import HeroSession from "./hero-session";
import MovieList from "../component/movie-list";
import { trpc } from "@/trpc/client";
const MovieListSession = () => {
  const [dataTopView] = trpc.movie.getTopViewByTime.useSuspenseQuery({
    limit: 10,
    page: 1,
    type: "monthly",
  });
  const [dataNew] = trpc.movie.getTopNew.useSuspenseQuery({
    limit: 10,
  });
  return (
    <>
      <HeroSession movie={dataTopView.movies[0]}></HeroSession>
      <MovieList title="Top Xem Nhiều" movies={dataTopView.movies}></MovieList>
      <MovieList title="Mới Cập Nhật" movies={dataNew.movies}></MovieList>
      {/* <MovieList></MovieList>
      <MovieList></MovieList> */}
    </>
  );
};

export default MovieListSession;
