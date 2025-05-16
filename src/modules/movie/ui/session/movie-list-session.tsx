"use client";
import { Button } from "@/components/ui/button";
import MovieCard from "../component/movie-card";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import MovieCardMobile from "../component/movie-card-mobile";
interface MovieListSessionsProps {
  title: string;
  type: string;
  url: string;
}
export default function MovieListSessions({
  title,
  type,
  url,
}: MovieListSessionsProps) {
  const [data] = trpc.movie.getAllByType.useSuspenseQuery({
    type: type,
    page: 1,
    limit: 20,
  });
  const { movies } = data;
  return (
    <section className="py-6 ">
      <div className="container mx-auto ">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-orange-600">
            {title.toUpperCase()}
          </h2>
          <div className=" items-center gap-2 hidden xl:flex">
            {[2023, 2022, 2021, 2020].map((year) => (
              <Button
                key={year}
                variant="outline"
                size="sm"
                className=" border-gray-600"
              >
                {year}
              </Button>
            ))}
            <Link href={url ?? ""}>
              <Button className="cursor-pointer" variant="ghost" size="sm">
                Xem tất cả
              </Button>
            </Link>
          </div>
        </div>
        {/* //mobie */}
        <div className="md:block grid grid-cols-1 md:grid-cols-5 gap-2">
          <div className="grid grid-cols-2 gap-2 md:hidden">
            {movies.slice(0, 10).map((movie) => (
              <MovieCardMobile quality={20} key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
        {/* tablet pc */}
        <div className="hidden md:grid md:grid-cols-5 gap-2">
          <div className="md:col-span-2 row-span-2 ">
            <MovieCard quality={50} movie={movies[0]} isLarge />
          </div>
          {movies.slice(1, 6).map((movie) => (
            <MovieCard quality={50} key={movie.id} movie={movie} />
          ))}
          {movies.slice(7, 13).map((movie) => (
            <MovieCard quality={50} key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}
