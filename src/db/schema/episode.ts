import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { movie } from "./movie";

export const episode = pgTable("episode", {
  movieId: text("movie_id").references(() => movie.id, { onDelete: "cascade" }),
  name: text("name"),
  slug: text("slug"),
  link: text("link"),
  serverName: varchar("server_name", { length: 255 }),
});
