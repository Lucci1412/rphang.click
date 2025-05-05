"use client";

import { useEffect, useRef, useState } from "react";
import { trpc } from "@/trpc/client";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  movieId: string;
}

export default function VideoPlayer({
  src,
  poster,
  movieId,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const create = trpc.movie.createViewByMovieId.useMutation();

  // Track whether a view has been counted for this session
  const [viewCounted, setViewCounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let hls: any;

    const setupHls = async () => {
      if (!videoRef.current) return;

      if ((await import("hls.js")).default.isSupported()) {
        const Hls = (await import("hls.js")).default;
        hls = new Hls({
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
          maxBufferSize: 30 * 1000 * 1000,
        });
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = src;
      }
    };

    setupHls();

    return () => {
      hls?.destroy();
    };
  }, [src]);

  // Set up event listeners for the video player
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Handle play event
    const handlePlay = () => {
      // Count view only once per session
      if (!viewCounted) {
        setViewCounted(true);
        // Submit view when play is clicked
        create.mutate(
          {
            movieId,
            timeWatched: 0, // We're not tracking watch time anymore
          },
          {
            onSuccess: () => {
              // View creation successful
            },
            onError: () => {
              // Reset on error
              setViewCounted(false);
            },
          }
        );

        // const script = document.createElement("script");
        // script.innerHTML = `(function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://shebudriftaiter.net/tag.min.js',9290355,document.body||document.documentElement)`;
        // document.body.appendChild(script); 
      }
    };

    // Add event listener
    videoElement.addEventListener("play", handlePlay);

    // Clean up event listener
    return () => {
      videoElement.removeEventListener("play", handlePlay);
    };
  }, [viewCounted, create, movieId]);

  return (
    <div className="relative w-full h-[315px] md:h-[500px]">
      <video
        ref={videoRef}
        controls
        className="absolute top-0 h-[315px] md:h-[500px] left-0 w-full object-cover rounded-md"
        poster={poster}
      />
    </div>
  );
}
