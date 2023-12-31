// React Router
import { BrowserRouter } from "react-router-dom";

// React Query
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UltraClient, { ImportMapScript, hydrate } from "https://deno.land/x/danielduel_ultra_stack_ultra@0.0.5/lib/react/client.js";
import { HelmetProvider } from "react-helmet-async";

import { createTRPCReact } from "@trpc/react-query";
import { createTRPCClientProvider } from "./createTRPCClientProvider.tsx";
import { AnyRouter } from "@trpc/server/dist/index.d.ts";
import { Helmet } from "react-helmet-async";
import { TwindStyleTag } from "./twind.tsx";

declare const __REACT_QUERY_DEHYDRATED_STATE: unknown;

export const createClientAppAndHydrate = <Router extends AnyRouter>(
  App: () => JSX.Element,
  queryClient: QueryClient,
  trpc: ReturnType<typeof createTRPCReact<Router>>,
) => {
  const TRPCClientProvider = createTRPCClientProvider(queryClient, trpc);

  function ClientApp() {
    return (
      <UltraClient>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={__REACT_QUERY_DEHYDRATED_STATE}>
              <TRPCClientProvider>
                <BrowserRouter>
                  <App />
                  <Helmet>
                    <ImportMapScript />
                    <TwindStyleTag />
                  </Helmet>
                </BrowserRouter>
              </TRPCClientProvider>
            </Hydrate>
          </QueryClientProvider>
        </HelmetProvider>
      </UltraClient>
    );
  }

  const innerHydrate = () => {
    try {
      hydrate(document, <ClientApp />)
    } catch (err) {
      console.error("There was an error while hydrating", err)
    }
  };

  return [
    ClientApp,
    innerHydrate
  ] as const;
};
