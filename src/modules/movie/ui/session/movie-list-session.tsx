"use client";
import React from "react";
import MovieList from "../component/movie-list";
import { trpc } from "@/trpc/client";
const MovieListSession = () => {
  const [dataTopView] = trpc.movie.getTopViewByTime.useSuspenseQuery({
    limit: 12,
    page: 1,
    type: "weekly",
  });
  const [dataNew] = trpc.movie.getTopNew.useSuspenseQuery({
    limit: 12,
  });

  const [dataChieuRap] = trpc.movie.getChỉeuRap.useSuspenseQuery({
    limit: 12,
  });
  return (
    <>
      <MovieList title="PHIM ĐỀ CỬ" movies={dataTopView.movies}></MovieList>
      {/* <MovieList title="Mới Cập Nhật" movies={dataNew.movies}></MovieList> */}
      <MovieList
        title="PHIM CHIẾU RẠP MỚI"
        movies={dataChieuRap.movies}
      ></MovieList>
      <MovieList title="PHIM MỚI CẬP NHẬT" movies={dataNew.movies}></MovieList>
    </>
  );
};

export default MovieListSession;
