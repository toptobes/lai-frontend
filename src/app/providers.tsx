'use client'

import React from 'react';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient;

const WithProviders = ({ children }: { children: React.ReactNode }) =>
  <ThemeProvider defaultTheme="dark">
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </ThemeProvider>

export default WithProviders;
