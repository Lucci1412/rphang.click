import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { movie } from "./movie";

export const view = pgTable("views", {
  id: serial("id").primaryKey(),
  timeWatched:integer("time_watched").default(0),
  movieId: text("movie_id")
    .references(() => movie.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
