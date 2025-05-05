

import React from "react";

interface Props {
  children: React.ReactNode;
}
const MovieDetailLayout = ({ children }: Props) => {
  return (
    <div >
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="flex min-h-screen ">
          <main className="flex-1 overflow-y-auto ">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailLayout;
