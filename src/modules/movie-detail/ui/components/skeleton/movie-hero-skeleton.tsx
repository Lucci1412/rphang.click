import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const MovieHeroSkeleton = () => {
  return (
    <div>
      <section className="relative mt-2 sm:mt-4 h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Skeleton className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>

        <div className="container relative z-10 flex h-full items-end pb-6 sm:pb-10">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
            <div className="hidden md:block shrink-0">
              <Skeleton className="h-[300px] w-[200px] lg:h-[450px] lg:w-[300px] rounded-lg" />
            </div>

            <div className="space-y-2 sm:space-y-4 w-full">
              <Skeleton className="h-8 w-3/4 sm:w-1/2 lg:w-1/3" />

              <div className="flex gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-16" />
              </div>

              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-16 rounded-full" />
                ))}
              </div>

              <Skeleton className="h-20 w-full max-w-[600px]" />

              <div className="pt-2">
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieHeroSkeleton;
