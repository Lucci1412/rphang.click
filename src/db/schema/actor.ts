import { relations } from "drizzle-orm";
import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { movieActor } from "./movie_actor";

export const actor = pgTable("actor", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  isDeleted: boolean("is_deleted").default(false),
  isHidden: boolean("is_hidden").default(false),
  name: text("name").notNull(),
});

export const actorRelations = relations(actor, ({ many }) => ({
  movieActor: many(movieActor),
}));
