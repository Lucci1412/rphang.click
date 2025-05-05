import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

type MovieGetAllOutput = inferRouterOutputs<AppRouter>["movie"]["getAll"];

// Danh sách phim
export type MovieList = MovieGetAllOutput["movies"];

// Một bộ phim
export type MovieItem = MovieList[number];

// Thông tin phân trang
export type MoviePagination = MovieGetAllOutput["pagination"];