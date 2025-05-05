"use client";
import * as React from "react";
import { trpc } from "@/trpc/client";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { ErrorBoundary } from "react-error-boundary";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

export const HomeSidebar = () => {
  return (
    <React.Suspense fallback={<HomeSidebarSkeleton></HomeSidebarSkeleton>}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <HomeSidebarSuspense />
      </ErrorBoundary>
    </React.Suspense>
  );
};

const HomeSidebarSuspense = () => {
  const [movies] = trpc.movie.getTopView.useSuspenseQuery({
    limit: 5,
  });

  return (
    <div className="w-80 h-screen  p-2.5 xl:block hidden">
      <h2 className="text-xl font-bold text-orange-500 mb-4">XEM NHIỀU</h2>
      <div className="space-y-4">
        {movies?.map((movie, index) => (
          <Link key={index} href={`/phim/${movie.slug}`}>
            <Card className="flex flex-row items-center p-2 h-[105px] overflow-hidden  cursor-pointer">
              <div className="w-[70px] h-[90px] overflow-hidden rounded-md">
                <Image
                  src={movie.thumb_url ?? ""}
                  alt={movie.name}
                  width={70}
                  height={90}
                  data-loaded="false"
                  onLoad={(event) => {
                    event.currentTarget.setAttribute("data-loaded", "true");
                  }}
                  className="data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10"
                />
              </div>

              <CardContent className="p-0 flex flex-col flex-1 space-y-2 ">
                <div className="text-sm font-semibold line-clamp-2">
                  {movie.name}
                </div>
                <div className=" text-xs line-clamp-2">{movie.origin_name}</div>
                <div className="text-muted-foreground text-xs ">
                  Lượt xem: {movie.view}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export function HomeSidebarSkeleton() {
  return (
    <div className="w-80 h-screen bg-white p-2.5 xl:block hidden ">
      <h2 className="text-xl font-bold text-orange-500 mb-4">XEM NHIỀU</h2>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card
            key={index}
            className="flex flex-row items-center p-2 h-[105px] "
          >
            <Skeleton className="w-[70px] h-[90px] rounded-md"></Skeleton>
            <CardContent className="p-0 flex flex-col flex-1 space-y-2  ">
              <Skeleton className="w-[150px] h-6"></Skeleton>
              <Skeleton className="w-[150px] h-4"></Skeleton>
              <Skeleton className="w-[150px]  h-4"></Skeleton>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
