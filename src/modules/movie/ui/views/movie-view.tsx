import React from "react";
import Link from "next/link";
// import HeroSession from "../session/hero-session";
import MovieListSession from "../session/movie-list-session";

const MovieView = () => {
  return (
    <div className="flex flex-col">
      <div
        className="border rounded-xl p-4 my-4 text-sm text-center shadow-sm border-blue-200 bg-blue-50 text-blue-900 dark:border-white/10 dark:bg-blue-950/40 dark:text-white/90"
      >
        <span className="flex flex-wrap justify-center items-center gap-x-1">
          Truy cập
          <Link
            href="https://phimchill.fun/"
            className="hover:underline font-medium text-blue-700 dark:text-blue-300"
          >
            phimchill.fun
          </Link>
          <span>nếu không vào được PhimChill</span>
        </span>
      </div>

      <main className="flex-1">
        <MovieListSession></MovieListSession>
      </main>
    </div>
  );
};

export default MovieView;
