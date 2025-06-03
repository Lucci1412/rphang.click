import { category } from "./../../../db/schema/category";
import { db } from "@/db/index";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import {
  actor,
  country,
  episode,
  movie,
  movieActor,
  movieCategory,
  movieCountry,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
export const movieDetailRouter = createTRPCRouter({
  getBySlugNoEposide: baseProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input }) => {
      // 1. Lấy thông tin movie theo slug
      const [movieData] = await db
        .select()
        .from(movie)
        .where(eq(movie.slug, input.slug));

      if (!movieData) throw new TRPCError({ code: "NOT_FOUND" });

      return {
        ...movieData,
      };
    }),
  getBySlug: baseProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input }) => {
      const [movieData] = await db
        .select()
        .from(movie)
        .where(eq(movie.slug, input.slug));

      if (!movieData) throw new TRPCError({ code: "NOT_FOUND" });

      // 2. Thực hiện song song các truy vấn episodes và categories
      const [episodes, categories, countries, actors] = await Promise.all([
        // 2a. Lấy tất cả episodes theo movieId
        db.select().from(episode).where(eq(episode.movieId, movieData.id)),

        // 2b. Lấy danh sách category qua bảng trung gian
        db
          .select()
          .from(movieCategory)
          .innerJoin(category, eq(movieCategory.categoryId, category.id))
          .where(eq(movieCategory.movieId, movieData.id)),
        db
          .select()
          .from(movieCountry)
          .innerJoin(country, eq(movieCountry.countryId, country.id))
          .where(eq(movieCountry.movieId, movieData.id)),
        db
          .select()
          .from(movieActor)
          .innerJoin(actor, eq(movieActor.actorId, actor.id))
          .where(eq(movieActor.movieId, movieData.id)),
      ]);

      // 3. Trả về kết quả
      return {
        ...movieData,
        episodes,
        categories,
        countries,
        actors,
      };
    }),
  getEpisodeByMovieId: baseProcedure
    .input(
      z.object({
        movieId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const data = await db
        .select()
        .from(episode)
        .where(eq(episode.movieId, input.movieId))
        .orderBy(episode.name);
      if (!data) throw new TRPCError({ code: "NOT_FOUND" });

      return data;
    }),
  getEpisodeBySlug: baseProcedure
    .input(
      z.object({
        movieId: z.string(),
        slug: z.string(),
        episode: z.string(),
      })
    )
    .query(async ({ input }) => {
      const data = await db
        .select()
        .from(episode)
        .where(eq(episode.movieId, input.movieId))
        .orderBy(episode.name);
      if (!data) throw new TRPCError({ code: "NOT_FOUND" });

      return data;
    }),
});
