import { relations } from "drizzle-orm";
import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { movieCategory } from "./movie_category";

export const category = pgTable("category", {
  id: varchar("id",{length:30}).primaryKey().notNull(),
  isDeleted: boolean("is_deleted").default(false),
  isHidden: boolean("is_hidden").default(false),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
});

export const categoryRelations = relations(category, ({ many }) => ({
  movieCategory: many(movieCategory),
}));
