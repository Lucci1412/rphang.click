import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { movieCategory } from "./movie_category";

export const movie = pgTable("movie", {
  id: varchar("id", { length: 30 }).primaryKey().notNull(),
  // ophimId: varchar("ophim_id", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  serverName: varchar("server_name", { length: 30 }),
  actor: text("actor").array().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  origin_name: varchar("origin_name", { length: 255 }),
  content: text("description"),
  type: varchar("type", { length: 50 }),
  status: varchar("status", { length: 50 }),
  thumb_url: varchar("thumb_url", { length: 255 }),
  poster_url: varchar("poster_url", { length: 255 }),
  chieurap: boolean("chieurap").default(false),
  trailer_url: varchar("trailer_url", { length: 255 }),
  time: varchar("time", { length: 50 }),
  episode_current: varchar("episode_current", { length: 100 }),
  episode_total: varchar("episode_total", { length: 20 }),
  quality: varchar("quality", { length: 50 }),
  lang: varchar("lang", { length: 50 }),
  year: integer("year"),
  view: integer("view"),
  vote_average: real("vote_average"),
  vote_count: integer("vote_count"),
});

export const movieRelations = relations(movie, ({ many }) => ({
  country: many(movieCategory),
  category: many(movieCategory),
}));

export const insertMovieSchema = createInsertSchema(movie);
export const updateMovieSchema = createUpdateSchema(movie);
export const selectMovieSchema = createSelectSchema(movie);
