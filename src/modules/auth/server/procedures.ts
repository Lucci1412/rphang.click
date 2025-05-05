import { db } from "@/db/index";
import { level, user } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ROLE } from "@/const";
import { TRPCError } from "@trpc/server";
export const authRouter = createTRPCRouter({
  login: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      console.log(input);
      const [userExitingEmail] = await db
        .select()
        .from(user)
        .where(and(eq(user.email, input.email), eq(user.role, ROLE.USER)))
        .limit(1);
      if (!userExitingEmail) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Sai tài khoản hoặc mật khẩu",
        });
      }
      const isMatch = await bcrypt.compare(
        input.password,
        userExitingEmail.password
      );

      if (!isMatch) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Sai tài khoản hoặc mật khẩu",
        });
      }
      const userWithLevel = await db
        .select({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          createAt: user.createdAt,
          updateAt: user.updatedAt,
          level: level,
        })
        .from(user)
        .leftJoin(level, eq(user.levelId, level.id))
        .where(eq(user.id, userExitingEmail.id))
        .then((res) => res[0]);

      const token = jwt.sign(
        {
          id: userWithLevel.id,
          username: userWithLevel.username,
          role: userWithLevel.role,
          email: userWithLevel.email,
        },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: "7d" }
      );

      return { user: userWithLevel, token: token };
    }),
  register: baseProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      // Check username đã tồn tại chưa
      const [existingUser] = await db
        .select()
        .from(user)
        .where(and(eq(user.username, input.username), eq(user.role, ROLE.USER)))
        .limit(1);

      if (existingUser) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Tên người dùng đã được sử dụng",
        });
      }
      const [existingUserEmail] = await db
        .select()
        .from(user)
        .where(and(eq(user.email, input.email), eq(user.role, ROLE.USER)))
        .limit(1);

      if (existingUserEmail) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email đã được sử dụng",
        });
      }

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const [listLevel] = await db
        .select()
        .from(level)
        .orderBy(desc(level.order))
        .limit(1);
      // Insert user mới
      const [newUser] = await db
        .insert(user)
        .values({
          username: input.username,
          password: hashedPassword,
          email: input.email,
          levelId: listLevel.id,
        })
        .returning();
      const userWithLevel = await db
        .select({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          createAt: user.createdAt,
          updateAt: user.updatedAt,

          level: level,
        })
        .from(user)
        .leftJoin(level, eq(user.levelId, level.id))
        .where(eq(user.id, newUser.id))
        .then((res) => res[0]);
      const token = jwt.sign(
        {
          id: userWithLevel.id,
          username: userWithLevel.username,
          role: userWithLevel.role,
          email: userWithLevel.email,
        },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: "7d" }
      );

      return { user: userWithLevel, token };
    }),
});
