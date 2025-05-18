import React from "react";
import MovieSlider from "./movie-slider";
interface Props {
  movies: any;
  title: string;
}
const MovieList = ({ movies, title }: Props) => {
  
  return (
    <div>
      <div>
        <section className="py-6 md:py-8">
          <div className="container">
            <h2 className="mb-4 md:mb-6 text-xl md:text-2xl font-bold tracking-tight">
              {title}
            </h2>
            <MovieSlider movies={movies} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MovieList;
