import { z } from "zod";
import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

const hello = t.router({
  hello: t.procedure
    .input(z.object({ message: z.string() }))
    .query(async ({ input }) => {
      return { hello: input.message };
    }),
});

export const appRouter = t.router({
  hello,
});

export type AppRouter = typeof appRouter;
