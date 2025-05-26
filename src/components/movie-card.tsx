/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { Play, Star } from "lucide-react";
interface Props {
  movie: any;
}
const MovieCard = ({ movie }: Props) => {
  return (
    <Link
      key={movie.id}
      href={`/phim/${movie.slug}-${movie.year}-vietsub`}
      // className={cn(className)}
    >
      <Card
        className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-200 cursor-pointer group py-0 rounded-sm"
        // onClick={() => router.push(`/movie/${movie.id}`)}
      >
        <CardContent className="p-0">
          <div className="relative">
            <Image
              width={200}
              height={280}
              src={movie.thumb_url || "/placeholder.svg"}
              className="w-full h-60 object-cover rounded-sm"
              alt={movie.name}
            />
            <div className="absolute top-1 left-1">
              <Badge
                variant="secondary"
                className="bg-green-600 text-white text-xs px-1 py-0"
              >
                {movie.episode_current}
              </Badge>
            </div>
            <div className="absolute top-1 right-1">
              <Badge
                variant="secondary"
                className="bg-black/70 text-white text-xs px-1 py-0"
              >
                <Star className="w-2 h-2 mr-1 fill-yellow-400 text-yellow-400" />
                {movie.vote_average}
              </Badge>
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="p-2">
            <h3 className="text-xs font-medium text-white truncate leading-tight">
              {movie.name}
            </h3>
            <p className="text-xs text-gray-400 mt-1">{movie.year}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
