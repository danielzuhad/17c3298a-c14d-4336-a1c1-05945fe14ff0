"use client";

import { httpBatchLink, getFetch, loggerLink } from "@trpc/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { getUrl } from "@/utils/getUrl";
import queryClient from "@/utils/queryClient";
import SuperJSON from "superjson";
import { Toaster } from "react-hot-toast";

export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: () => true,
        }),
        httpBatchLink({
          url: getUrl(),
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: "include",
            });
          },
          transformer: SuperJSON,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
