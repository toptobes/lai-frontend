'use client';

import { createContext, useContext, useState } from 'react';
import { Kids, not } from '~/lib/prelude';

export interface SidebarLockCtx {
  locked: boolean;
  toggleLock: () => void;
}

const SidebarLockCtx = createContext<SidebarLockCtx>(null!);

export const useSidebarLock = () => useContext(SidebarLockCtx);

export const SidebarLockCtxProvider = ({ children }: Kids) => {
  const [locked, setLocked] = useState(false);

  const toggleLock = () => setLocked(not);

  return (
    <SidebarLockCtx.Provider value={{ locked, toggleLock }}>
      {children}
    </SidebarLockCtx.Provider>
  );
}
