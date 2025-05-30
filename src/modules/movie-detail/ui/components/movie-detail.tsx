/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
interface Props {
  movie: any;
  episodes: any;
}
const MovieDetail = ({ movie, episodes }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-sm">
        {episodes.map((item: any, index: any) => (
          <span key={index} className="bg-red-600 px-2 py-1 rounded text-xs">
            {item.serverName}
          </span>
        ))}
        {/* <span className="text-gray-400">OLDSS-392</span>
        <span className="text-red-500">vlxx.bz/2501</span> */}
      </div>

      <h1 className="text-xl font-bold">{movie.name}</h1>

      <p className="text-gray-300 text-sm leading-relaxed">{movie.content}</p>
    </div>
  );
};

export default MovieDetail;
