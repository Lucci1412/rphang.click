'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { MovieDetailOutput } from "../type";
import { EpisodeList } from "../components/episode-list";
import { Badge } from "@/components/ui/badge";
import { MovieDescription } from "../components/description";
interface Props {
  movie: MovieDetailOutput;
}
const MovieDetailSession = ({ movie }: Props) => {
  return (
    <section className="py-6 sm:py-10">
      <div className="container">
        <Tabs defaultValue="episodes" className="w-full">
          <TabsList className="mb-4 sm:mb-8 grid grid-cols-3 h-auto">
            <TabsTrigger value="episodes" className="text-sm sm:text-base py-2">
              Danh sách tập
            </TabsTrigger>
            <TabsTrigger value="about" className="text-sm sm:text-base py-2">
              Thông tin
            </TabsTrigger>

            <TabsTrigger value="reviews" className="text-sm sm:text-base py-2">
              Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="episodes" className="space-y-6 sm:space-y-8">
            <div>
              <EpisodeList movie={movie} />
            </div>
          </TabsContent>
          <TabsContent value="about" className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                {movie.name} - {movie.origin_name}
              </h2>

              <MovieDescription
                description={movie.content ?? ""}
              ></MovieDescription>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                Chi tiết
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
                <div>
                  <h3 className="font-semibold text-muted-foreground">
                    Trạng thái
                  </h3>
                  {movie.episode_current}
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground">
                    Thể loại
                  </h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {movie.categories.map((category, index) => {
                      return (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {category.category.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground">
                    Năm phát hành
                  </h3>
                  <p>{movie.year}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground">
                    Quốc gia
                  </h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {movie.countries.map((country, index) => {
                      return (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {country.country.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6 sm:space-y-8">
            <div>Chưa có review nào :)))</div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default MovieDetailSession;
