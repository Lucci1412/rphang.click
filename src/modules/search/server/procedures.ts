import { PAGE_LIMIT } from "@/const";
import { db } from "@/db/index";
import { movie } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { count, desc, or, sql } from "drizzle-orm";
import { z } from "zod";
export const searchRouter = createTRPCRouter({
  searchMovie: baseProcedure
    .input(
      z.object({
        keyword: z.string().trim(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(PAGE_LIMIT),
      })
    )
    .query(async ({ input }) => {
      const { keyword, page, limit } = input;
      const offset = (page - 1) * limit;

      const searchKeyword = `%${keyword}%`;

      const slugKeyword = keyword
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");

      const slugSearchKeyword = `%${slugKeyword}%`;

      const searchCondition = keyword
        ? or(
            sql`LOWER(${movie.name}) LIKE LOWER(${searchKeyword})`,
            sql`LOWER(${movie.slug}) LIKE LOWER(${slugSearchKeyword})`
          )
        : undefined;

      const [movies, totalMoviesResult] = await Promise.all([
        db
          .select()
          .from(movie)
          .where(searchCondition)
          .limit(limit)
          .offset(offset)
          .orderBy(desc(movie.updatedAt)),

        db.select({ count: count() }).from(movie).where(searchCondition),
      ]);

      const total = totalMoviesResult[0]?.count || 0;

      if (!movies.length && page === 1) {
        return {
          movies: [],
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        };
      }

      return {
        movies,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    }),
});
