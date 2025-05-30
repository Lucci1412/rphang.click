"use client";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import NoMoviesFound from "@/components/no-movie-found";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import MovieDetail from "../components/movie-detail";
import ListRelated from "../components/list-related";
import SideBar from "../components/side-bar";
import ListCategory from "../components/list-category";

interface MoviePlayerViewProps {
  slug: string;
}

export const MoviePlayerView = ({ slug }: MoviePlayerViewProps) => {
  return (
    <Suspense fallback={<MoviePlayerViewSkeleton></MoviePlayerViewSkeleton>}>
      <ErrorBoundary fallback={<NoMoviesFound />}>
        <MoviePlayerViewSuspense slug={slug} />
      </ErrorBoundary>
    </Suspense>
  );
};
const MoviePlayerViewSuspense = ({ slug }: MoviePlayerViewProps) => {
  const [data] = trpc.movieDetail.getBySlug.useSuspenseQuery({ slug });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { categories, episodes, countries, ...movie } = data;
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header - Mobile Back Button */}
      <div className="md:hidden p-4 border-b border-gray-700">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Video Player Section */}
      <div className="relative">
        {/* Advertising Banners */}

        {/* Main Content */}
        <div className="container mx-auto px-4 flex flex-row">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Video Player */}
            <div className="lg:col-span-3">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
                <video
                  className="w-full h-full"
                  controls
                  poster={`/images/chuong-nhuoc-nam.jpg`}
                >
                  <source src="#" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Info */}
              <div>
                <MovieDetail episodes={episodes} movie={movie}></MovieDetail>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-gray-400">Suzume Mino</span>
                </div>
                <ListCategory categories={categories}></ListCategory>
              </div>
            </div>
          </div>

          {/* Sidebar - Related Videos */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold mb-4">Phim liên quan</h2>
            <SideBar></SideBar>
          </div>
        </div>

        {/* More Related Videos Grid */}
        <ListRelated></ListRelated>
      </div>
    </div>
  );
};

export default MoviePlayerView;
const MoviePlayerViewSkeleton = () => {
  return (
    <div className="p-4">
      {/* name movie skeleton */}
      <div>
        <Skeleton className="h-7 w-[500px]"></Skeleton>
      </div>
      {/* video player skeleton */}
      <Skeleton className=" w-full h-[315px] md:h-[500px] rounded-md" />
      {/* episode skeleton */}
      <div className="w-full p-4 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-md">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-2">
          {Array.from({ length: 12 }).map((_, idx) => (
            <Skeleton key={idx} className="w-full h-10 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
};
