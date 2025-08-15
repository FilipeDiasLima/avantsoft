"use client";

import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
      <Toaster />
    </AuthProvider>
  );
}
