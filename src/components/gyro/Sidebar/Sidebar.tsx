'use client';

import styles from './Sidebar.module.scss';
import clsx from 'clsx';
import { nunito } from '~/app/fonts';
import { ReactNode, RefObject, useContext, useRef } from 'react';
import { ChatbotMenu } from '~/components/gyro/Sidebar/ChatbotMenu/ChatbotMenu';
import { DashboardMenu } from '~/components/gyro/Sidebar/DashboardMenu/DashboardMenu';
import Link from 'next/link';
import { GyroPageCtx } from '~/lib/gyro/contexts/GyroPageCtx';

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

export const Sidebar = () => {
  const props = useContext(GyroPageCtx).fold({
    dash: DashboardProps,
    chat: ChatbotProps,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  return <nav className={clsx(styles.sidebar, props.className)} aria-label={props.ariaLabel}>
    <header className={styles.header}>
      <Link href="/" title="LindauerAI Home" aria-label="Go to Lindauer AI's landing page"/>
      <span className={nunito.className}>GYRO</span>
      <div className={styles.planInstitutional}><span>inst.</span></div>
    </header>
    <div className={styles.childrenWrapper}>
      <div className={styles.children} ref={containerRef}>
        <props.children containerRef={containerRef}/>
      </div>
    </div>
  </nav>;
}
