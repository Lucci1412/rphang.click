import React from "react";

import MovieListSession from "../session/movie-list";
import TopKeywords from "../session/top-keyworks";

const MovieView = () => {


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Phim sex mới</h1>
        </div>

        {/* Movie Grid */}

        <MovieListSession></MovieListSession>

        {/* Pagination */}
        {/* <div className="flex justify-center space-x-2 mb-8">
          <Button
            variant="outline"
            size="sm"
            className="bg-red-600 text-white border-red-600"
          >
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <span className="px-3 py-2">...</span>
          <Button variant="outline" size="sm">
            97
          </Button>
          <Button variant="outline" size="sm">
            →
          </Button>
        </div> */}

        {/* Top Keywords */}
       <TopKeywords></TopKeywords>
      </main>

      {/* Footer */}
    </div>
  );
};

export default MovieView;
