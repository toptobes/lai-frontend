'use client'

import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Kids } from '~/lib/prelude';

const queryClient = new QueryClient();

const WithProviders = ({ children }: Kids) =>
  <ThemeProvider defaultTheme="dark">
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ThemeProvider>

export default WithProviders;
