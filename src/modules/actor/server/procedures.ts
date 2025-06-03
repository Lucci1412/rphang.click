import { db } from "@/db/index";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { actor } from "@/db/schema";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
export const actorRouter = createTRPCRouter({
  getAllActor: baseProcedure.query(async () => {
    const actors = await db
      .select()
      .from(actor)
      .where(and(eq(actor.isDeleted, false), eq(actor.isHidden, false)));
    if (!actors) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No actors found",
      });
    }
    return actors;
  }),
  getBySlug: baseProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { slug } = input;
      const actorData = await db
        .select()
        .from(actor)
        .where(eq(actor.name, slug));
      if (!actorData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No actor found",
        });
      }
      return actorData;
    }),
});
