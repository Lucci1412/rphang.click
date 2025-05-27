import { db } from "@/db/index";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import {
  category,
  country,
  movie,
  movieCategory,
  movieCountry,
  view,
} from "@/db/schema";
import { and, count, desc, eq, gte, sql } from "drizzle-orm";
import { z } from "zod";
import { PAGE_LIMIT } from "@/const";
import { subDays, subMonths, subYears } from "date-fns";

export const movieRouter = createTRPCRouter({
  getAll: baseProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(PAGE_LIMIT),
      })
    )
    .query(async ({ input }) => {
      const { page, limit } = input;
      const offset = (page - 1) * limit;

      // Lấy danh sách phim với phân trang
      const movies = await db.select().from(movie).limit(limit).offset(offset);

      // Lấy tổng số phim để tính tổng số trang
      const totalMovies = await db.select({ count: count() }).from(movie);
      const total = totalMovies[0]?.count || 0;

      if (!movies.length && page === 1) {
        throw new TRPCError({ code: "NOT_FOUND", message: "No movies found" });
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

  getMovieByCategory: baseProcedure
    .input(
      z.object({
        category: z.string(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(PAGE_LIMIT),
      })
    )
    .query(async ({ input }) => {
      const { category: categorySlug, page, limit } = input;
      const offset = (page - 1) * limit;
      const whereCondition =
        categorySlug && categorySlug !== ""
          ? eq(category.slug, categorySlug)
          : undefined;
      // 1. Tìm category theo slug
      const [categoryData] = await db
        .select()
        .from(category)
        .where(whereCondition);

      if (!categoryData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Category not found",
        });
      }

      // 2. Lấy danh sách movie và tổng số phim (song song)
      const [movies, totalMoviesResult] = await Promise.all([
        db
          .select()
          .from(movie)
          .innerJoin(movieCategory, eq(movie.id, movieCategory.movieId))
          .where(eq(movieCategory.categoryId, categoryData.id))
          .limit(limit)
          .offset(offset),

        db
          .select({ count: count() })
          .from(movie)
          .innerJoin(movieCategory, eq(movie.id, movieCategory.movieId))
          .where(eq(movieCategory.categoryId, categoryData.id)),
      ]);
      const total = totalMoviesResult[0]?.count || 0;

      // Kiểm tra có phim nào không
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
        movies: movies.map((item) => item.movie),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    }),
  getMovieByCountry: baseProcedure
    .input(
      z.object({
        country: z.string(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(PAGE_LIMIT),
      })
    )
    .query(async ({ input }) => {
      const { country: countrySlug, page, limit } = input;
      const offset = (page - 1) * limit;
      const whereCondition =
        countrySlug && countrySlug !== ""
          ? eq(country.slug, countrySlug)
          : undefined;
      // 1. Tìm category theo slug
      const [countryData] = await db
        .select()
        .from(country)
        .where(whereCondition);

      if (!countryData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "country not found",
        });
      }

      // 2. Lấy danh sách movie và tổng số phim (song song)
      const [movies, totalMoviesResult] = await Promise.all([
        db
          .select()
          .from(movie)
          .innerJoin(movieCountry, eq(movie.id, movieCountry.movieId))
          .where(eq(movieCountry.countryId, countryData.id))
          .limit(limit)
          .offset(offset),

        db
          .select({ count: count() })
          .from(movie)
          .innerJoin(movieCountry, eq(movie.id, movieCountry.movieId))
          .where(eq(movieCountry.countryId, countryData.id)),
      ]);
      const total = totalMoviesResult[0]?.count || 0;

      // Kiểm tra có phim nào không
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
        movies: movies.map((item) => item.movie),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    }),
  getAllByType: baseProcedure
    .input(
      z.object({
        type: z.string().optional(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
        year: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { page, limit } = input;
      const offset = (page - 1) * limit;
      let type = input.type ?? "";
      switch (input.type) {
        case "phim-bo":
          type = "series";
          break;
        case "phim-le":
          type = "single";
          break;
        case "hoat-hinh":
          type = "hoathinh";
          break;
        case "tv-shows":
          type = "tvshows";
          break;
        default:
          break;
      }
      const whereCondition =
        type && type !== "" ? eq(movie.type, type) : undefined;

      // Lấy danh sách phim với phân trang
      const movies = await db
        .select()
        .from(movie)
        .where(whereCondition)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(movie.year), desc(movie.updatedAt));

      // Lấy tổng số phim để tính tổng số trang
      const totalMovies = await db
        .select({ count: count() })
        .from(movie)
        .where(whereCondition);
      const total = totalMovies[0]?.count || 0;

      if (!movies.length && page === 1) {
        throw new TRPCError({ code: "NOT_FOUND", message: "No movies found" });
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
  getTopViewByTime: baseProcedure
    .input(
      z.object({
        type: z
          .enum(["day", "weekly", "monthly", "year", "all"])
          .default("day"),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ input }) => {
      const { type, page, limit } = input;

      // Tạo thời gian hiện tại theo múi giờ Việt Nam (UTC+7)
      const now = new Date();
      const vietnamOffset = 7 * 60; // Múi giờ Việt Nam UTC+7 tính bằng phút
      const vietnamNow = new Date(
        now.getTime() + vietnamOffset * 60000 - now.getTimezoneOffset() * 60000
      );

      let dateCondition: Date | undefined;

      if (type === "day") {
        dateCondition = subDays(vietnamNow, 1);
      } else if (type === "weekly") {
        dateCondition = subDays(vietnamNow, 7);
      } else if (type === "monthly") {
        dateCondition = subMonths(vietnamNow, 1);
      } else if (type === "year") {
        dateCondition = subYears(vietnamNow, 1);
      }
      // "all" thì không cần dateCondition

      // Chuyển đổi điều kiện thời gian từ múi giờ Việt Nam về UTC cho truy vấn CSDL
      const dateConditionUTC = dateCondition
        ? new Date(
            dateCondition.getTime() -
              vietnamOffset * 60000 +
              now.getTimezoneOffset() * 60000
          )
        : undefined;

      const whereCondition = dateConditionUTC
        ? gte(view.createdAt, dateConditionUTC)
        : undefined;

      const movieViews = await db
        .select({
          id: movie.id,
          name: movie.name,
          origin: movie.origin_name,
          thumb_url: movie.thumb_url,
          slug: movie.slug,
          content: movie.content,
          year: movie.year,
          status: movie.status,
          createdAt: movie.createdAt,
          updatedAt: movie.updatedAt,
          view_count: sql<number>`COUNT(${view.id})`,
          episode_current: movie.episode_current,
          time: movie.time,
          quality: movie.quality,
          vote_average: movie.vote_average,
          type: movie.type,
        })
        .from(movie)
        .leftJoin(view, eq(view.movieId, movie.id))
        .where(whereCondition)
        .groupBy(movie.id)
        .having(sql`COUNT(${view.id}) > 0`)
        .orderBy(sql`COUNT(${view.id}) DESC`)
        .limit(limit)
        .offset((page - 1) * limit);

      const totalResult = await db
        .select({ count: sql<number>`COUNT(DISTINCT ${view.movieId})` })
        .from(view)
        .where(whereCondition);

      const total = totalResult[0]?.count || 0;

      return {
        movies: movieViews,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    }),
  getTopNew: baseProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ input }) => {
      const { limit } = input;

      const movieViews = await db
        .select({
          id: movie.id,
          name: movie.name,
          origin: movie.origin_name,
          thumb_url: movie.thumb_url,
          slug: movie.slug,
          content: movie.content,
          year: movie.year,
          status: movie.status,
          createdAt: movie.createdAt,
          updatedAt: movie.updatedAt,
          episode_current: movie.episode_current,
          time: movie.time,
          quality: movie.quality,
        })
        .from(movie)
        .orderBy(desc(movie.updatedAt))
        .limit(limit);

      return {
        movies: movieViews,
      };
    }),
  getChỉeuRap: baseProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        page: z.number().min(1).default(1),
      })
    )
    .query(async ({ input }) => {
      const { limit, page } = input;

      const movieViews = await db
        .select({
          id: movie.id,
          name: movie.name,
          origin: movie.origin_name,
          thumb_url: movie.thumb_url,
          slug: movie.slug,
          content: movie.content,
          year: movie.year,
          status: movie.status,
          createdAt: movie.createdAt,
          updatedAt: movie.updatedAt,
          episode_current: movie.episode_current,
          time: movie.time,
          quality: movie.quality,
          chieurap: movie.chieurap,
        })
        .from(movie)
        .where(and(eq(movie.chieurap, true)))
        .orderBy(desc(movie.year), desc(movie.updatedAt))
        .limit(limit)
        .offset((page - 1) * limit);

      const totalResult = await db
        .select({ count: count() })
        .from(movie)
        .where(and(eq(movie.chieurap, true)));

      const total = totalResult[0]?.count || 0;

      return {
        movies: movieViews,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    }),
  getTopTrailer: baseProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ input }) => {
      const { limit } = input;

      const movieViews = await db
        .select({
          id: movie.id,
          name: movie.name,
          origin: movie.origin_name,
          thumb_url: movie.thumb_url,
          slug: movie.slug,
          content: movie.content,
          year: movie.year,
          status: movie.status,
          createdAt: movie.createdAt,
          updatedAt: movie.updatedAt,
          episode_current: movie.episode_current,
          time: movie.time,
          quality: movie.quality,
          vote_average: movie.vote_average,
          type: movie.type,
        })
        .from(movie)
        .where(and(eq(movie.status, "trailer"), eq(movie.year, 2025)))
        .orderBy(desc(movie.updatedAt))
        .limit(limit);

      return {
        movies: movieViews,
      };
    }),
  createViewByMovieId: baseProcedure
    .input(
      z.object({
        movieId: z.string(),
        timeWatched: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      await db.insert(view).values({
        movieId: input.movieId,
        timeWatched: input.timeWatched,
      });

      return { success: true };
    }),
});
