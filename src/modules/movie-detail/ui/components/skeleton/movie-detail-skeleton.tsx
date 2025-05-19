import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const DetailSkeleton = () => {
  return (
    <section className="py-6 sm:py-10">
      <div className="container">
        <div className="mb-4 sm:mb-8 grid grid-cols-3 gap-2 sm:gap-4">
          <Skeleton className="h-8 sm:h-10 w-full rounded-md" />
          <Skeleton className="h-8 sm:h-10 w-full rounded-md" />
          <Skeleton className="h-8 sm:h-10 w-full rounded-md" />
        </div>

        {/* Tab content: Episodes */}
        <div className="space-y-4 sm:space-y-6">
          {/* Skeleton cho danh sách tập */}
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-md" />
          ))}
        </div>

        {/* Tab content: About */}
        <div className="mt-10 space-y-6 sm:space-y-8">
          <Skeleton className="h-6 w-1/3 sm:w-1/4" />
          <Skeleton className="h-24 w-full" />

          <Skeleton className="h-6 w-1/4 sm:w-1/5" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-5 w-2/3" />
              </div>
            ))}
          </div>
        </div>

        {/* Tab content: Reviews */}
        <div className="mt-10">
          <Skeleton className="h-6 w-1/4 sm:w-1/6" />
        </div>
      </div>
    </section>
  );
};

export default DetailSkeleton;
