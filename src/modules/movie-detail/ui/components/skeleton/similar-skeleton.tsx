import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SimilarSkeleton = () => {
  return (
    <section className="py-6 sm:py-8">
      <div className="container">
        <Skeleton className="h-6 sm:h-8 w-1/3 sm:w-1/4 mb-4 sm:mb-6" />

        <div className="relative">
          <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="min-w-[140px] sm:min-w-[180px] space-y-2"
              >
                <Skeleton className="aspect-[2/3] w-full rounded-md" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>

          {/* Scroll buttons (fake placeholders, non-clickable) */}
          <div className="absolute left-0 top-1/2 z-10 h-7 w-7 sm:h-8 sm:w-8 -translate-y-1/2 rounded-full bg-background/50 backdrop-blur" />
          <div className="absolute right-0 top-1/2 z-10 h-7 w-7 sm:h-8 sm:w-8 -translate-y-1/2 rounded-full bg-background/50 backdrop-blur" />
        </div>
      </div>
    </section>
  );
};

export default SimilarSkeleton;
