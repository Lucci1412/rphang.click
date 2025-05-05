import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const level = pgTable("level", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  order: integer("order").notNull(),
  icon: varchar("icon"),
  level: integer("level").notNull().unique(),
  maxExpDay: integer("max_exp_day").notNull(),
  expRequired: integer("exp_required").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
