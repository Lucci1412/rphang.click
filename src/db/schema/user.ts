import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { level } from "./level";
import { ROLE } from "../../const";
import { z } from "zod";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  username: varchar("user_name", { length: 50 }).notNull(),
  role: integer("role").default(ROLE.USER),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  levelId: uuid("level_id")
    .notNull()
    .references(() => level.id),
});

export const insertUserSchema = createInsertSchema(user).extend({
  levelId: z.string().uuid().optional(),
});
export const updateUserSchema = createUpdateSchema(user);
export const selectUserSchema = createSelectSchema(user);
