/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import MovieCard from "./movie-card";
interface Props{
  movies:any
}
export default function MovieSlider({movies}:Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = isMobile ? -150 : -300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = isMobile ? 150 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };


  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="flex space-x-3 sm:space-x-4 overflow-x-auto scrollbar-hide pb-4"
      >
        {movies.map((movie: any) => (
          <div key={movie.id} className="min-w-[140px] sm:min-w-[180px]">
            <MovieCard
              title={movie.name}
              image={movie.thumb_url ?? ""}
              year={String(movie.year) ?? ""}
              rating={String(movie.vote_average) ?? ""}
              slug={movie.slug}
            />
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 z-10 h-7 w-7 sm:h-8 sm:w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur"
        onClick={scrollLeft}
      >
        <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="sr-only">Scroll left</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 z-10 h-7 w-7 sm:h-8 sm:w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur"
        onClick={scrollRight}
      >
        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="sr-only">Scroll right</span>
      </Button>
    </div>
  );
}
