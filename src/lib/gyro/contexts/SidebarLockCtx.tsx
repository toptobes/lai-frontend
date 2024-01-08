'use client';

import { createContext, useContext, useState } from 'react';
import { Kids } from '~/lib/prelude';
import s from '~/app/gyro/Sidebar/styles/Sidebar.module.scss';

export interface SidebarLockCtx {
  lockedClass: string | undefined;
  toggleNoClose: () => void;
  setNoOpen: (to: boolean) => void;
}

const SidebarLockCtx = createContext<SidebarLockCtx>(null!);

export const useSidebarLock = () => useContext(SidebarLockCtx);

export const SidebarLockCtxProvider = ({ children }: Kids) => {
  const [lockedClass, setLockedClass] = useState<string | undefined>(s.sidebarNoOpen);

  const setNoClose = () => {
    setLockedClass(state => state === s.sidebarNoClose ? undefined : s.sidebarNoClose);
  }

  const setNoOpen = (to: boolean) => {
    setLockedClass(state => state === s.sidebarNoClose ? s.sidebarNoClose : to ? s.sidebarNoOpen : undefined);
  }

  return <SidebarLockCtx.Provider value={{ lockedClass, toggleNoClose: setNoClose, setNoOpen }}>
    {children}
  </SidebarLockCtx.Provider>
}
