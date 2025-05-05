// "use client";

// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import { useState, useEffect, Suspense } from "react";
// import MovieCard from "./movie-card";
// import { trpc } from "@/trpc/client";
// import { ErrorBoundary } from "react-error-boundary";
// import { Skeleton } from "@/components/ui/skeleton";

// export const SlideMovie = () => {
//   return (
//     <Suspense fallback={<SlideMovieSkeleton></SlideMovieSkeleton>}>
//       <ErrorBoundary fallback={<div>Something went wrong</div>}>
//         <SlideMovieSuspense />
//       </ErrorBoundary>
//     </Suspense>
//   );
// };

// export default function SlideMovieSuspense() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [movies] = trpc.movie.getMovieHot.useSuspenseQuery({
//     limit: 5,
//   });
//   const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
//     loop: true,
//     slideChanged(slider) {
//       setCurrentSlide(slider.track.details.rel);
//     },
//     created() {
//       setLoaded(true);
//     },
//     slides: {
//       perView: 1,
//     },
//   });

//   // Add autoplay functionality
//   useEffect(() => {
//     if (loaded && instanceRef.current) {
//       // Start autoplay - changes slide every 5000ms (5 seconds)
//       const autoplayInterval = setInterval(() => {
//         instanceRef.current?.next();
//       }, 5000);

//       return () => {
//         clearInterval(autoplayInterval);
//       };
//     }
//   }, [loaded, instanceRef]);

//   const [thumbnailRef] = useKeenSlider<HTMLDivElement>({
//     slides: {
//       perView: 5,
//       spacing: 10,
//     },
//     loop: true,
//     initial: 0,
//   });

//   return (
//     <div className="w-full">
//       {/* Main Slider */}
//       <div ref={sliderRef} className="keen-slider mb-4">
//         {movies.map((movie) => (
//           <div key={movie.id} className="keen-slider__slide">
//             <MovieCard isPriority movie={movie} isThumbnailLarge />
//           </div>
//         ))}
//       </div>

//       {/* Thumbnail Slider */}
//       <div ref={thumbnailRef} className="keen-slider">
//         {movies.map((movie, idx) => (
//           <div
//             key={movie.id}
//             className={`keen-slider__slide cursor-pointer ${
//               idx === currentSlide ? "opacity-100" : "opacity-50"
//             } transition-opacity`}
//             onClick={() => instanceRef.current?.moveToIdx(idx)}
//           >
//             <MovieCard isPriority movie={movie} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export const SlideMovieSkeleton = () => {
//   return (
//     <div className="w-full max-w-[1400px]">
//       <Skeleton className="h-[450px] max-w-[1400px]"></Skeleton>
//       {Array.from({ length: 5 })?.map((_, index) => (
//         <Skeleton
//           key={index}
//           className="relative group overflow-hidden rounded-sm shadow-md cursor-pointer h-[150px] "
//         ></Skeleton>
//       ))}
//     </div>
//   );
// };


"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import MovieCard from "./movie-card";
import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { Skeleton } from "@/components/ui/skeleton";

export const SlideMovie = () => {
  return (
    <Suspense fallback={<SlideMovieSkeleton />}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <SlideMovieSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

export default function SlideMovieSuspense() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [movies] = trpc.movie.getMovieHot.useSuspenseQuery({ limit: 5 });
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      // nothing special here
    },
    slides: { perView: 1 },
  });

  const [thumbnailRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 5, spacing: 10 },
    loop: true,
    initial: 0,
  });

  // Gán lại ref khi movies có dữ liệu
  useEffect(() => {
    if (movies.length > 0 && sliderContainerRef.current) {
      sliderRef(sliderContainerRef.current);
    }
    if (movies.length > 0 && thumbnailContainerRef.current) {
      thumbnailRef(thumbnailContainerRef.current);
    }
  }, [movies, sliderRef, thumbnailRef]);

  // autoplay
  useEffect(() => {
    if (instanceRef.current) {
      const autoplay = setInterval(() => {
        instanceRef.current?.next();
      }, 5000);
      return () => clearInterval(autoplay);
    }
  }, [instanceRef]);

  return (
    <div className="w-full">
      {/* Main Slider */}
      <div ref={sliderContainerRef} className="keen-slider mb-4">
        {movies.map((movie) => (
          <div key={movie.id} className="keen-slider__slide">
            <MovieCard isPriority movie={movie} isThumbnailLarge />
          </div>
        ))}
      </div>

      {/* Thumbnail Slider */}
      <div ref={thumbnailContainerRef} className="keen-slider">
        {movies.map((movie, idx) => (
          <div
            key={movie.id}
            className={`keen-slider__slide cursor-pointer ${
              idx === currentSlide ? "opacity-100" : "opacity-50"
            } transition-opacity`}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
          >
            <MovieCard quality={10}  isPriority movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export const SlideMovieSkeleton = () => (
  <div className="w-full max-w-[1400px]">
    <Skeleton className="h-[450px] w-[1400px]" />
    {Array.from({ length: 5 }).map((_, index) => (
      <Skeleton
        key={index}
        className="relative group overflow-hidden rounded-sm shadow-md cursor-pointer h-[150px]"
      />
    ))}
  </div>
);
