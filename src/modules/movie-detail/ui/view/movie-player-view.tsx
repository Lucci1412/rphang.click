"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import MovieDetail from "../components/movie-detail";
import ListRelated from "../components/list-related";
import ListCategory from "../components/list-category";
import { useState } from "react";
import dynamic from "next/dynamic";

const MovieIframe = dynamic(() => import("../components/movie-iframe"), {
  ssr: false,
});
interface MoviePlayerViewProps {
  slug: string;
}

export const MoviePlayerView = ({ slug }: MoviePlayerViewProps) => {
  return <MoviePlayerViewSuspense slug={slug} />;
};
const MoviePlayerViewSuspense = ({ slug }: MoviePlayerViewProps) => {
  const [data] = trpc.movieDetail.getBySlug.useSuspenseQuery({ slug });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { categories, episodes, countries, actors, ...movie } = data;
  const [serverPlayUrl, setServerPlayUrl] = useState<string>(
    episodes[0]?.link ?? ""
  );
  return (
    <div className="min-h-screen  text-white">
      {/* Header - Mobile Back Button */}
      <div className="md:hidden p-4 border-b border-gray-700">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <span className="text-sm"> Đổi server2 nếu server1 lỗi,tải chậm</span>
      </div>

      {/* Video Player Section */}
      <div className="relative">
        {/* Advertising Banners */}

        {/* Main Content */}
        <div className="container mx-auto px-4 flex flex-row">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
              <MovieIframe url={serverPlayUrl}></MovieIframe>
            </div>

            {/* Video Info */}
            <div>
              <MovieDetail
                changeServerName={(value) => setServerPlayUrl(value)}
                episodes={episodes}
                movie={movie}
              ></MovieDetail>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <div className="text-sm">
                {actors.map((item) => {
                  return (
                    <span key={item.actor.id} className="text-gray-400">
                      {item.actor.name}
                    </span>
                  );
                })}
              </div>
              <ListCategory categories={categories}></ListCategory>
            </div>
          </div>
        </div>

        {/* More Related Videos Grid */}
        <ListRelated></ListRelated>
      </div>
    </div>
  );
};

export default MoviePlayerView;
