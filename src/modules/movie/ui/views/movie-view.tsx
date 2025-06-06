import React from "react";

import MovieListSession from "../session/movie-list";
// import TopKeywords from "../session/top-keyworks";

const MovieView = () => {
  return (
    <div className="min-h-screen   text-white">
      <main className="container mx-auto px-4 py-6 border-l-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Phim sex mới</h1>
        </div>
        <MovieListSession></MovieListSession>
        {/* <TopKeywords></TopKeywords> */}
      </main>
    </div>
  );
};

export default MovieView;
