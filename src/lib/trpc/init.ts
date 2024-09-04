import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";

export const t = initTRPC.create({
  transformer: SuperJSON,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
