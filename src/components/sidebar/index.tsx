import React from "react";
import { HydrateClient } from "@/trpc/server";

const Sidebar = () => {
  return (
    <HydrateClient>
      <div className="w-80 space-y-4"></div>
    </HydrateClient>
  );
};
export default Sidebar;
