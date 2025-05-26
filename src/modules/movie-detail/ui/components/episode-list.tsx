/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { MovieDetailOutput } from "../type";

interface EpisodeListProps {
  movie: MovieDetailOutput;
  currentEpisode?: string | null;
}
export const EpisodeList = ({ movie, currentEpisode }: EpisodeListProps) => {
  return (
    <div className="w-full ">
      <Tabs defaultValue="all" className="w-full">
        <TabsContent value="all" className="mt-0">
          <div className="flex flex-row flex-wrap  gap-2.5">
            {movie.episodes.map((episode: any, index) => (
              <Link
                key={index}
                href={`/xem/${movie.slug}-${movie.year}-vietsub/tap-${episode.slug}`}
              >
                <Button
                  variant={
                    currentEpisode === episode.slug ? "destructive" : "default"
                  }
                  className={`w-full h-9 font-medium cursor-pointer
                }`}
                >
                  <div className="min-w-[55px] flex justify-center m-auto ">
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
