import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { movie } from "./movie";
import { actor } from "./actor";
import { relations } from "drizzle-orm";
//actor
export const movieActor = pgTable("movie_actor", {
  actorId: uuid("actor_id")
    .notNull()
    .references(() => actor.id),
  movieId: varchar("movie_id", { length: 30 })
    .notNull()
    .references(() => movie.id, { onDelete: "cascade" }),
});

export const movieActorRelations = relations(movieActor, ({ one }) => ({
  movie: one(movie, {
    fields: [movieActor.movieId],
    references: [movie.id],
  }),
  category: one(actor, {
    fields: [movieActor.actorId],
    references: [actor.id],
  }),
}));
