import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

type AuthOutput = inferRouterOutputs<AppRouter>["auth"]["login"];

export type UserType = AuthOutput["user"];

