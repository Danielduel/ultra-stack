import { ErrorBoundary } from "https://esm.sh/*react-error-boundary@4.0.11";

import useAsset from "ultra/hooks/use-asset.js";
import { ImportMapScript } from "ultra/lib/react/client.js";

import { Suspense } from "react";
import { dehydrate } from "@tanstack/react-query";
import { queryClient } from "@/packages/react-query/query-client.ts";
import { Routing } from "@/apps/webapp/Routing.tsx";

const logError = (error: Error, info: { componentStack: string }) => {
  console.log(error, info);
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Ultra</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href={useAsset("/favicon.ico")} />
        <link rel="stylesheet" href={useAsset("/style.css")} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="/refresh.js"></script>
        <ImportMapScript />
        <script
          dangerouslySetInnerHTML={{
            __html: "window.__REACT_QUERY_DEHYDRATED_STATE = " +
              JSON.stringify(dehydrate(queryClient)),
          }}
        >
        </script>
      </head>
      <body>
        <ErrorBoundary
          fallback={<div>Something went wrong</div>}
          onError={logError}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <Routing />
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
