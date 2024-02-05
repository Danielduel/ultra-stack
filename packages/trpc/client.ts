import { httpBatchLink } from "@trpc/client";
import { trpc } from "./trpc-react.ts";
import { isLocal } from "@/packages/utils/envrionment.ts";
import { webappRoot } from "@/packages/utils/constants.ts";

const getTrpcClientFromUrl = (url: string) =>
  trpc.createClient({
    links: [
      httpBatchLink({
        url,
        maxURLLength: 1000 * 50,
      }),
    ],
  });

export const createTrpcClient = (internal: boolean) =>
  internal
    ? getTrpcClientFromUrl("/api/trpc")
    : isLocal()
    ? getTrpcClientFromUrl("http://localhost:8081/api/trpc")
    : getTrpcClientFromUrl(`${webappRoot}/api/trpc`);
