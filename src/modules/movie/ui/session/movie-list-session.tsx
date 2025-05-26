"use client";
import React from "react";
import MovieList from "../component/movie-list";
import { trpc } from "@/trpc/client";
const MovieListSession = () => {
  const [dataTopView] = trpc.movie.getTopViewByTime.useSuspenseQuery({
    limit: 16,
    page: 1,
    type: "weekly",
  });
  // const [dataNew] = trpc.movie.getTopNew.useSuspenseQuery({
  //   limit: 16,
  // });
  const [dataSingle] = trpc.movie.getAllByType.useSuspenseQuery({
    limit: 16,
    page: 1,
    type: "phim-le",
  });
  const [dataSeries] = trpc.movie.getAllByType.useSuspenseQuery({
    limit: 16,
    page: 1,
    type: "phim-bo",
  });
  const [dataHoatHinh] = trpc.movie.getAllByType.useSuspenseQuery({
    limit: 16,
    page: 1,
    type: "hoat-hinh",
  });
  return (
    <>
      <MovieList title="PHIM ĐỀ CỬ" movies={dataTopView.movies}></MovieList>
      {/* <MovieList title="Mới Cập Nhật" movies={dataNew.movies}></MovieList> */}
      <MovieList
        title="PHIM MỚI CẬP NHẬT"
        movies={dataSingle.movies}
      ></MovieList>
      <MovieList
        title="PHIM CHIẾU RẠP MỚI"
        movies={dataSeries.movies}
      ></MovieList>
      <MovieList title="PHIM LẺ MỚI" movies={dataHoatHinh.movies}></MovieList>
      <MovieList title="PHIM BỘ MỚI" movies={dataHoatHinh.movies}></MovieList>
    </>
  );
};

export default MovieListSession;
