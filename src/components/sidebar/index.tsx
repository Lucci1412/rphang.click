import React from "react";
import { HydrateClient, trpc } from "@/trpc/server";
import Trending from "./trending";
import Rank from "./rank";
import Trailer from "./trailer";

const Sidebar = () => {
  void trpc.movie.getTopViewByTime.prefetch({
    page: 1,
    type: "all",
    limit: 5,
  });
  void trpc.movie.getTopViewByTime.prefetch({
    page: 1,
    type: "weekly",
    limit: 5,
  });
  void trpc.movie.getTopTrailer.prefetch({
    limit: 5,
  });

  return (
    <HydrateClient>
      <div className="w-80 space-y-4">
        <Trending></Trending>
        <Rank></Rank>
        <Trailer></Trailer>
      </div>
    </HydrateClient>
  );
};

export default Sidebar;
