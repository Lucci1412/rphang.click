import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
// import { relations } from "drizzle-orm";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { movieCategory } from "./movie_category";

export const movie = pgTable("movie", {
  id: varchar("id", { length: 30 }).primaryKey().notNull(),
  name: varchar("name", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull(),
  content: text("description"),
  type: varchar("type", { length: 50 }),
  status: varchar("status", { length: 50 }),
  thumb_url: varchar("thumb_url", { length: 255 }),
  // ophimId: varchar("ophim_id", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  time: varchar("time", { length: 50 }),
  quality: varchar("quality", { length: 50 }),
  lang: varchar("lang", { length: 50 }),
  view: integer("view").default(0),
});

export const movieRelations = relations(movie, ({ many }) => ({
  country: many(movieCategory),
  category: many(movieCategory),
}));

export const insertMovieSchema = createInsertSchema(movie);
export const updateMovieSchema = createUpdateSchema(movie);
export const selectMovieSchema = createSelectSchema(movie);
