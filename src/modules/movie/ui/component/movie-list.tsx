/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ChevronRight } from "lucide-react";
import MovieCard from "@/components/movie-card";
interface Props {
  movies: any;
  title: string;
}
const MovieList = ({ movies, title }: Props) => {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-orange-500 uppercase">{title}</h2>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {movies.map((movie:any, index:number) => (
          <MovieCard key={index} movie={movie}></MovieCard>
        ))}
      </div>
    </section>
  );
};

export default MovieList;
