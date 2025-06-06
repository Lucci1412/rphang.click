import { movieDetailRouter } from "@/modules/movie-detail/server/procedures";
import { createTRPCRouter } from "../init";
import { movieRouter } from "@/modules/movie/server/procedures";
import { categoryRouter } from "@/modules/category/server/procedures";
import { searchRouter } from "@/modules/search/server/procedures";
import { actorRouter } from "@/modules/actor/server/procedures";
import { countryRouter } from "@/modules/country/server/procedures";

export const appRouter = createTRPCRouter({
  movieDetail: movieDetailRouter,
  movie: movieRouter,
  category: categoryRouter,
  search: searchRouter,
  actor: actorRouter,
  country: countryRouter,
});
export type AppRouter = typeof appRouter;
