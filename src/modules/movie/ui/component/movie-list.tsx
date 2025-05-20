import React from "react";
import MovieSlider from "./movie-slider";
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  movies: any;
  title: string;
}
const MovieList = ({ movies, title }: Props) => {
  return (
    <section className="pt-4  max-w-[1400px] mx-auto">
      <div className="container">
        <h2 className="mb-4 md:mb-6 text-xl md:text-2xl font-bold tracking-tight">
          {title}
        </h2>
        <MovieSlider movies={movies} />
      </div>
    </section>
  );
};

export default MovieList;
