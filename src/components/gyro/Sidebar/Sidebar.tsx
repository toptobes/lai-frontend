'use client';

import styles from './Sidebar.module.scss';
import clsx from 'clsx';
import { nunito } from '~/app/fonts';
import { ReactNode, useContext } from 'react';
import { GyroPageCtx } from '~/contexts/gyro/GyroPageCtx';
import { ChatbotMenu } from '~/components/gyro/Sidebar/ChatbotMenu/ChatbotMenu';
import { DashboardMenu } from '~/components/gyro/Sidebar/DashboardMenu/DashboardMenu';
import Link from 'next/link';

interface InternalProps {
  ariaLabel: string,
  className?: string,
  children: ReactNode,
}

const DashboardProps = {
  ariaLabel: 'Dashboard menu',
  children: <DashboardMenu/>,
} as InternalProps;

const ChatbotProps = {
  ariaLabel: 'Chatbot menu',
  className: styles.sidebarSliding,
  children: <ChatbotMenu/>,
} as InternalProps;

export const Sidebar = () => {
  const props = useContext(GyroPageCtx).fold({
    dash: DashboardProps,
    chat: ChatbotProps,
  });

  return <nav className={clsx(styles.sidebar, props.className)} aria-label={props.ariaLabel}>
    <header className={styles.header}>
      <Link href="/" title="LindauerAI Home" aria-label="Go to Lindauer AI's landing page"/>
      <span className={nunito.className}>GYRO</span>
      <div className={styles.planInstitutional}><span>inst.</span></div>
    </header>
    <div className={styles.children}>
      {props.children}
    </div>
  </nav>;
}
