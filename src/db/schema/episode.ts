import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { movie } from "./movie";

export const episode = pgTable("episode", {
  movieId: text("movie_id").references(() => movie.id, { onDelete: "cascade" }).notNull(),
  name: text("name"),
  slug: text("slug"),
  filename: text("filename"),
  linkEmbed: text("link_embed"),
  linkM3u8: text("link_m3u8"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
