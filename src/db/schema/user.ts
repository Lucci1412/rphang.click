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
import { ROLE } from "../../const";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  username: varchar("user_name", { length: 50 }).notNull(),
  role: integer("role").default(ROLE.USER),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),

});

export const insertUserSchema = createInsertSchema(user);
export const updateUserSchema = createUpdateSchema(user);
export const selectUserSchema = createSelectSchema(user);
