/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { MonitorPlay } from "lucide-react";
import Link from "next/link";
import { MovieDetailOutput } from "../type";

interface EpisodeListProps {
  movie: MovieDetailOutput;
  currentEpisode?: string | null;
}
export const EpisodeList = ({ movie, currentEpisode }: EpisodeListProps) => {
  return (
    <div className="w-full  p-4 rounded-lg">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className=" border-gray-700 px-3 py-1.5 flex items-center gap-1.5"
            >
              <MonitorPlay className="h-4 w-4" />
              <span className="text-sm font-medium">DANH SÁCH TẬP</span>
            </Badge>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="flex flex-row flex-wrap  gap-2">
            {movie.episodes.map((episode: any, index) => (
              <Link key={index} href={`/phim/${movie.slug}/${episode.slug}`}>
                <Button
                  variant={
                    currentEpisode === episode.slug ? "destructive" : "default"
                  }
                  className={`w-full h-10 font-medium cursor-pointer
                }`}
                >
                  <div className="min-w-[60px] flex justify-center m-auto ">
                    Tập {episode.name}
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
