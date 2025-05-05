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
import { count, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { PAGE_LIMIT } from "@/const";

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
        .orderBy(desc(movie.updatedAt));

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

  getTopView: baseProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(PAGE_LIMIT),
      })
    )
    .query(async ({ input }) => {
      const movies = await db
        .select()
        .from(movie)
        .orderBy(desc(movie.view))
        .limit(input.limit);
      if (!movies) {
        throw new TRPCError({ code: "NOT_FOUND", message: "No movies found" });
      }
      return movies;
    }),
  getMovieHot: baseProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(PAGE_LIMIT),
      })
    )
    .query(async ({ input }) => {
      const movies = await db
        .select()
        .from(movie)
        .orderBy(desc(movie.updatedAt), desc(movie.view))
        .limit(input.limit);
      if (!movies) {
        throw new TRPCError({ code: "NOT_FOUND", message: "No movies found" });
      }
      return movies;
    }),

  createViewByMovieId: baseProcedure
    .input(
      z.object({
        movieId: z.string(),
        timeWatched:z.number()
      })
    )
    .mutation(async ({ input }) => {
      await db.insert(view).values({
        movieId: input.movieId,
        timeWatched:input.timeWatched
      });

      return { success: true };
    }),

  
});
