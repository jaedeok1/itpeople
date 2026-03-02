'use client';

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { useDataStore } from '@/stores/data-store';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

function StoreHydration() {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
    useDataStore.persist.rehydrate();
    // Initialize data store with mock data if not already done
    const state = useDataStore.getState();
    if (!state._initialized) {
      state.initialize();
    }
  }, []);
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <StoreHydration />
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
