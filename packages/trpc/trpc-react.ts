import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@/packages/trpc/router.ts";

export const trpc = createTRPCReact<AppRouter>();
