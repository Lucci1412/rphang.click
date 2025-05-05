import React from "react";
import {  TopView } from "./top-view";
import { HydrateClient, trpc } from "@/trpc/server";

const Sidebar = async () => {
  void trpc.movie.getTopView.prefetch({ limit: 5 });
  return (
    <HydrateClient>
      <TopView></TopView>
    </HydrateClient>
  );
};

export default Sidebar;
