'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Play, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MovieDetailOutput } from "../type";
import { MovieDescription } from "../components/description";
interface Props {
  movie: MovieDetailOutput;
}
const MovieHeroSession = ({ movie }: Props) => {
  return (
      <section className="relative mt-2 sm:mt-4 h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={movie.thumb_url ?? ""}
            alt="Movie backdrop"
            className="h-full w-full object-cover"
            width={1080}
            height={1920}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>
        <div className="container relative z-10 flex h-full items-end pb-6 sm:pb-10">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
            <div className="hidden md:block shrink-0">
              <Image
                src={movie.thumb_url ?? ""}
                alt="Movie poster"
                className="h-[300px] w-[200px] lg:h-[450px] lg:w-[300px] rounded-lg object-cover shadow-lg"
                width={300}
                height={450}
                priority
              />
            </div>
            <div className="space-y-2 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
                {movie.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <span className="flex items-center">
                  <Star className="mr-1 h-3 w-3 sm:h-4 sm:w-4 fill-primary text-primary" />
                  {movie.vote_average}
                </span>
                <span className="text-muted-foreground">•</span>
                <span>2014</span>
                <span className="text-muted-foreground">•</span>
                <span className="flex items-center">
                  <Clock className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> {movie.time}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {movie.categories.map((category, index) => {
                  return (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {category.category.name}
                    </Badge>
                  );
                })}
              </div>

             
              <MovieDescription
                description={movie.content ?? ""}
              ></MovieDescription>
              <div className="flex gap-2 sm:gap-4 pt-2">
                <Button asChild  className="gap-1 sm:gap-2 sm:size-lg">
                  <Link
                    href={`/xem/${movie.slug}-${movie.year}-vietsub/tap-${movie.episodes[0].slug}`}
                  >
                    <Play className="h-3 w-3 sm:h-4 sm:w-4" /> Xem Phim
                  </Link>
                </Button>
                
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default MovieHeroSession;
