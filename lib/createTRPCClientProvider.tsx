import { type ReactNode } from "react";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnyRouter } from "@trpc/server/dist/index.d.ts";
import { createTRPCReact } from "@trpc/react-query";

declare const __REACT_QUERY_DEHYDRATED_STATE: unknown;

export const createTRPCClientProvider = <Router extends AnyRouter>(
  queryClient: QueryClient,
  trpc: ReturnType<typeof createTRPCReact<Router>>
) => {
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: "/api/trpc",
        maxURLLength: 1000 * 50
      }),
    ],
  });

  return function TRPCClientProvider({ children }: { children?: ReactNode }) {
    return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={__REACT_QUERY_DEHYDRATED_STATE}>{children}</Hydrate>
        </QueryClientProvider>
      </trpc.Provider>
    );
  }
}