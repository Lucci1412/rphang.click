import { db } from "@/db/index";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { country } from "@/db/schema";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
export const countryRouter = createTRPCRouter({
  getAllCountry: baseProcedure.query(async () => {
    const countries = await db
      .select()
      .from(country)
      .where(and(eq(country.isDeleted, false), eq(country.isHidden, false)));
    if (!countries) {
      throw new TRPCError({ code: "NOT_FOUND", message: "No countries found" });
    }
    return countries;
  }),
  getBySlug: baseProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { slug } = input;
      const countryData = await db
        .select()
        .from(country)
        .where(eq(country.slug, slug));
      if (!countryData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No category found",
        });
      }
      return countryData;
    }),
});
