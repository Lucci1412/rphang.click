import { movieDetailRouter } from "@/modules/movie-detail/server/procedures";
import { createTRPCRouter } from "../init";
import { movieRouter } from "@/modules/movie/server/procedures";
import { categoryRouter } from "@/modules/category/server/procedures";
import { countryRouter } from "@/modules/country/server/procedures";
import { searchRouter } from "@/modules/search/server/procedures";

export const appRouter = createTRPCRouter({
  movieDetail: movieDetailRouter,
  movie: movieRouter,
  category: categoryRouter,
  country: countryRouter,
  search: searchRouter,
});
export type AppRouter = typeof appRouter;
