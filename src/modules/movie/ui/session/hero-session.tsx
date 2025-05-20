"use client";
import { Button } from "@/components/ui/button";
import { MovieDescription } from "@/modules/movie-detail/ui/components/description";
import { Play, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  movie: any;
}
const HeroSession = ({ movie }: Props) => {
  return (
    <div>
      <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={movie.thumb_url ?? ""}
            alt="Featured movie"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-background/20" />
        </div>
        <div className="container relative z-10 flex h-full flex-col justify-center space-y-3 md:space-y-5 pt-16 max-w-[1400px] mx-auto">
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {movie.name} {movie.year}
          </h1>
          <div className="max-w-xl text-sm md:text-base lg:text-lg text-muted-foreground">
            <MovieDescription
              description={movie.content ?? ""}
            ></MovieDescription>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="flex items-center">
              <Star className="mr-1 h-3 w-3 sm:h-4 sm:w-4 fill-primary text-primary" />
              9.2
            </span>
            <span className="text-muted-foreground">•</span>
            <span>{movie.year}</span>
            <span className="text-muted-foreground">•</span>
            <span>{movie.time}</span>
            <span className="text-muted-foreground hidden sm:inline">•</span>
            <span>{movie.quality}</span>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <Button asChild size="sm" className="gap-1 sm:gap-2 sm:size-lg">
              <Link href={`/phim/${movie.slug}-${movie.year}-vietsub`}>
                <Play className="h-3 w-3 sm:h-4 sm:w-4" /> Xem phim
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSession;
