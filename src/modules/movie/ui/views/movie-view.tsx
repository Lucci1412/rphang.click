import React from "react";
import MovieSlider from "../session/slider-session";
import MovieListSessions from "../session/movie-list-session";
import Link from "next/link";

const MovieView = () => {
  return (
    <div className="flex flex-col">
      <div
        className="border rounded-xl p-4 mt-4 text-sm text-center shadow-sm
  border-blue-200 bg-blue-50 text-blue-900
  dark:border-white/10 dark:bg-blue-950/40 dark:text-white/90"
      >
        <span className="flex flex-wrap justify-center items-center gap-x-1">
          Truy cập
          <Link
            href="https://vietube.tokyo/"
            className="hover:underline font-medium text-blue-700 dark:text-blue-300"
          >
            vietube.tokyo
          </Link>
          <span>nếu không vào được PhimChill</span>
        </span>
      </div>
      <div className="hidden xl:flex">
        <main className="flex w-full min-h-screen flex-col items-center justify-center p-4">
          <div className=" max-w-7xl">
            <MovieSlider />
          </div>
        </main>
      </div>
      {/* <MovieSlider /> */}
      <MovieListSessions
        url="/danh-sach/phim-le"
        type="single"
        title="phim lẻ mới cập nhật"
      />
      <MovieListSessions
        url="/danh-sach/phim-bo"
        type="series"
        title="phim bộ mới cập nhật"
      />
      <MovieListSessions
        url="/danh-sach/hoat-hinh"
        type="hoathinh"
        title="phim hoạt hình mới cập nhật"
      />
      <MovieListSessions
        url="/danh-sach/tv-shows"
        type="tvshows"
        title="TvShow mới cập nhật"
      />
    </div>
  );
};

export default MovieView;
