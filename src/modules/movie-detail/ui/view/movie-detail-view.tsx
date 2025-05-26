"use client";
import { trpc } from "@/trpc/client";
import { MovieDetailOutput } from "../type";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Globe, Play, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MovieDetail from "../components/movie-detail";
import { useRouter } from "next/navigation";

interface MovieDetailViewProps {
  slug: string;
}
export const MovieDetailView = ({ slug }: MovieDetailViewProps) => {
  return <MovieDetailViewSuspense slug={slug} />;
};
const MovieDetailViewSuspense = ({ slug }: MovieDetailViewProps) => {
  const [data] = trpc.movieDetail.getBySlug.useSuspenseQuery({ slug });
  const movie = data as MovieDetailOutput;
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Movie Hero Section */}
      <div className="relative">
        <div
          className="h-96 bg-cover bg-center relative"
          style={{
            objectFit: "cover",
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(17,24,39,0.9)), url(${movie.thumb_url})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent " />
          <div className="container mx-auto px-4 h-full flex items-end pb-8 relative !z-40">
            <div className="flex gap-6 w-full">
              <div className="flex-shrink-0">
                <Image
                  src={movie.thumb_url || "/placeholder.svg"}
                  alt={movie.origin_name ?? ""}
                  className="w-48 h-72 object-cover rounded-lg shadow-2xl"
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {movie.name} {movie.year} {movie.quality}
                  </h1>
                  <p className="text-xl text-gray-300">{movie.origin_name}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-red-600 text-white">
                    {movie.quality}
                  </Badge>
                  <Badge className="bg-green-600 text-white">
                    {movie.lang}
                  </Badge>
                  <Badge className="bg-blue-600 text-white">
                    {movie.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-300">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span className="text-yellow-400 font-bold">
                      {movie.vote_average}
                    </span>
                    <span className="ml-1">IMDb</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{movie.year}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{movie.time}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-1" />
                    <span>Trung Quốc</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{movie.view} lượt xem</span>
                  </div>
                </div>
                {movie.actor.slice(0, 4).map((g, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-gray-300 border-gray-600"
                  >
                    {g}
                  </Badge>
                ))}
                <div className="flex items-center space-x-4">
                  <Button
                    size="lg"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8"
                    onClick={() =>
                      router.push(
                        `/play/${movie.slug}-${movie.year}-vietsub/tap-${movie.episodes[0].slug}`
                      )
                    }
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Xem Phim
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <MovieDetail movie={movie}></MovieDetail>
    </div>
  );
};

export default MovieDetailView;
