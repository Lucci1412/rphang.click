import { db } from "@/db/index";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { category } from "@/db/schema";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
export const categoryRouter = createTRPCRouter({
  getAllCategory: baseProcedure.query(async () => {
    const categories = await db
      .select()
      .from(category)
      .where(and(eq(category.isDeleted, false), eq(category.isHidden, false)));
    if (!categories) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No categories found",
      });
    }
    return categories;
  }),
  getBySlug: baseProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { slug } = input;
      const categoryData = await db
        .select()
        .from(category)
        .where(eq(category.slug, slug));
      if (!categoryData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No category found",
        });
      }
      return categoryData;
    }),
});
