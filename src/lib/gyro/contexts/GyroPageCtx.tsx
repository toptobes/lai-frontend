'use client';

import { createContext, ReactNode, useMemo } from 'react';
import { usePathname } from 'next/navigation';

// Okay so this is not by choice; it's because parallel routing is half-baked and was being buggy. Thanks, Vercel.
// I'll probably revisit it later when I have more time

export type GyroPage = 'dash' | 'chat';

export type GyroPageCtx = {
  page: GyroPage,
  fold: <T>(opts: { dash: T, chat: T }) => T,
}

export const GyroPageCtx = createContext<GyroPageCtx>(null as any);

export const GyroPageCtxProvider = ({ children }: { children: ReactNode }) => {
  const page = pageFromPath(usePathname());

  const ctx = useMemo<GyroPageCtx>(() => ({
    page,
    fold: (opts) => (page === 'dash')
      ? opts.dash
      : opts.chat,
  }), [page]);

  return <GyroPageCtx.Provider value={ctx}>
    {children}
  </GyroPageCtx.Provider>
}

const pageFromPath = (pathname: string): GyroPage =>
  (pathname.startsWith('/gyro/dashboard'))
    ? 'dash'
    : 'chat';
