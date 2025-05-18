import MovieSlider from "@/modules/movie/ui/component/movie-slider";
import React from "react";

const SimilarSession = () => {
  return (
    <section className="py-6 sm:py-8">
      <div className="container">
        <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold tracking-tight">
          Có thể bạn sẽ thích
        </h2>
        <MovieSlider />
      </div>
    </section>
  );
};

export default SimilarSession;
