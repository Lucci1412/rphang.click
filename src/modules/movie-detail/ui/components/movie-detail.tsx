import React from "react";
interface Props {
  movie: MovieDetailOutput;
}
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MovieDetailOutput } from "../type";
import { MovieDescription } from "./description";
import { EpisodeList } from "./episode-list";

const MovieDetail = ({ movie }: Props) => {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="episode" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger
                  value="episode"
                  className="data-[state=active]:bg-orange-600"
                >
                  Tập
                </TabsTrigger>
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-orange-600"
                >
                  Tổng quan
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-orange-500 mb-3">
                      Nội dung phim
                    </h3>

                    <MovieDescription
                      description={movie.content ?? ""}
                    ></MovieDescription>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Thông tin phim
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex">
                          <span className="text-gray-400 w-24">Đạo diễn:</span>
                          <span className="text-white">Đang cập nhật</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-400 w-24">Thể loại:</span>
                          <span className="text-white">Test</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-400 w-24">Quốc gia:</span>
                          <span className="text-white">test</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-400 w-24">Năm:</span>
                          <span className="text-white">{movie.year}</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-400 w-24">
                            Thời lượng:
                          </span>
                          <span className="text-white">{movie.time}</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-400 w-24">Chất lượng</span>
                          <span className="text-white">{movie.lang}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="episode" className="mt-6">
                <div>
                  <h3 className="text-xl font-bold text-orange-500 mb-4">
                    Danh sách tập
                  </h3>
                  <EpisodeList movie={movie}></EpisodeList>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
