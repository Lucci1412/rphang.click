import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { movieCountry } from "./movie_country";
import { relations } from "drizzle-orm";

export const country = pgTable("country", {
  id: varchar("id", { length: 30 }).primaryKey().notNull(),
  isDeleted: boolean("is_deleted").default(false),
  isHidden: boolean("is_hidden").default(false),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
});

export const countryRelations = relations(country, ({ many }) => ({
  movieCountry: many(movieCountry),
}));
