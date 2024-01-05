'use client';

import styles from './Sidebar.module.scss';
import clsx from 'clsx';
import { nunito } from '~/app/fonts';
import { ReactNode, RefObject, useContext, useRef, useState } from 'react';
import { ChatbotMenu } from '~/app/gyro/Sidebar/ChatbotMenu/ChatbotMenu';
import { DashboardMenu } from '~/app/gyro/Sidebar/DashboardMenu/DashboardMenu';
import Link from 'next/link';
import { GyroPageCtx, useGyroPage } from '~/lib/gyro/contexts/GyroPageCtx';
import { SidebarLockCtxProvider, useSidebarLock } from '~/lib/gyro/contexts/SidebarLockCtx';

export interface WithContainerRef {
  containerRef: RefObject<HTMLDivElement>;
}

const DashboardProps = {
  ariaLabel: 'Dashboard menu',
  className: '',
  children: DashboardMenu,
};

const ChatbotProps = {
  ariaLabel: 'Chatbot menu',
  className: styles.sidebarSliding,
  children: ChatbotMenu,
};

const _Sidebar = () => {
  const props = useGyroPage().fold({
    dash: DashboardProps,
    chat: ChatbotProps,
  });

  const { locked } = useSidebarLock();

  const containerRef = useRef<HTMLDivElement>(null);

  return <>
    <nav className={clsx(styles.sidebar, props.className, locked && styles.sidebarLocked)} aria-label={props.ariaLabel}>
      <header className={styles.header}>
        <Link href={'/'} title="LindauerAI Home" aria-label="Go to Lindauer AI's landing page" prefetch={false}/>
        <Link href={'/gyro'} aria-label="Start a new chat" prefetch={false} className={nunito.className}>GYRO</Link>
        <div className={styles.planInstitutional}><span>inst.</span></div>
      </header>
      <div className={styles.childrenWrapper}>
        <div className={styles.children} ref={containerRef}>
          <props.children containerRef={containerRef}/>
        </div>
      </div>
    </nav>
  </>;
}

export const Sidebar = () =>
  <SidebarLockCtxProvider>
    <_Sidebar/>
  </SidebarLockCtxProvider>
