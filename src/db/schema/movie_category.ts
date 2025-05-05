import { pgTable, varchar } from "drizzle-orm/pg-core";
import { movie } from "./movie";
import { category } from "./category";
import { relations } from "drizzle-orm";

export const movieCategory = pgTable("movie_category", {
  movieId: varchar("movie_id", { length: 30 })
    .notNull()
    .references(() => movie.id, { onDelete: "cascade" }),
  categoryId: varchar("category_id", { length: 30 })
    .notNull()
    .references(() => category.id),
});

export const movieCategoryRelations = relations(movieCategory, ({ one }) => ({
  movie: one(movie, {
    fields: [movieCategory.movieId],
    references: [movie.id],
  }),
  category: one(category, {
    fields: [movieCategory.categoryId],
    references: [category.id],
  }),
}));
