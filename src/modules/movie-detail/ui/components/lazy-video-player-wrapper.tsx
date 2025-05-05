"use client";

import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const VideoPlayer = dynamic(() => import("./movie-player"), {
  ssr: false,
  loading: () => <Skeleton className="h-[315px] md:h-[500px] rounded-md " />,
});

interface LazyVideoPlayerWrapperProps {
  src: string;
  poster?: string;
  movieId: string;
}

export default function LazyVideoPlayerWrapper({
  src,
  poster,
  movieId,
}: LazyVideoPlayerWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  // Kích hoạt load khi user scroll tới vùng player
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowPlayer(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {showPlayer ? (
        <VideoPlayer src={src} poster={poster} movieId={movieId} />
      ) : (
        <Skeleton className="h-[315px] md:h-[500px] "></Skeleton>
      )}
    </div>
  );
}
{

}
