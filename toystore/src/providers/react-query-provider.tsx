"use client";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const client = new QueryClient({});

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary state={dehydrate(client)}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
