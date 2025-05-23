"use client";
import React from "react";
import HeroSession from "./hero-session";
import MovieList from "../component/movie-list";
import { trpc } from "@/trpc/client";
const MovieListSession = () => {
  const [dataTopView] = trpc.movie.getTopViewByTime.useSuspenseQuery({
    limit: 10,
    page: 1,
    type: "weekly",
  });
  // const [dataNew] = trpc.movie.getTopNew.useSuspenseQuery({
  //   limit: 10,
  // });
  const [dataSingle] = trpc.movie.getAllByType.useSuspenseQuery({
    limit: 10,
    page: 1,
    type: "phim-le",
  });
  const [dataSeries] = trpc.movie.getAllByType.useSuspenseQuery({
    limit: 10,
    page: 1,
    type: "phim-bo",
  });
  const [dataHoatHinh] = trpc.movie.getAllByType.useSuspenseQuery({
    limit: 10,
    page: 1,
    type: "hoat-hinh",
  });
  return (
    <>
      <HeroSession movie={dataTopView.movies[0]}></HeroSession>
      <MovieList title="Top Xem Nhiều" movies={dataTopView.movies}></MovieList>
      {/* <MovieList title="Mới Cập Nhật" movies={dataNew.movies}></MovieList> */}
      <MovieList
        title="Phim Mới Lẻ Mới Cập Nhật"
        movies={dataSingle.movies}
      ></MovieList>
      <MovieList
        title="Phim Bộ Mới Cập Nhật"
        movies={dataSeries.movies}
      ></MovieList>
      <MovieList
        title="Phim Hoạt Hình Mới Cập Nhật"
        movies={dataHoatHinh.movies}
      ></MovieList>
      {/* <MovieList></MovieList>
      <MovieList></MovieList> */}
    </>
  );
};

export default MovieListSession;
