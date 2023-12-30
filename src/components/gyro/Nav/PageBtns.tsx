'use client';

import clsx from 'clsx';
import styles from '~/components/gyro/Nav/Nav.module.scss';
import Image from 'next/image';
import dashboardSVG from 'public/icons/dashboard.svg';
import chatbotSVG from 'public/icons/chatbot.svg';
import React, { useContext } from 'react';
import Link from 'next/link';
import { GyroPage, GyroPageCtx } from '~/lib/gyro/contexts/GyroPageCtx';

export const PageBtns = () => <>
  <PageBtn page="dash"/>
  <PageBtn page="chat"/>
</>;

const Pages = {
  dash: {
    icon: dashboardSVG,
    label: 'Switch to dashboard (lands on metrics page)',
    href: '/gyro/dashboard/metrics',
  },
  chat: {
    icon: chatbotSVG,
    label: 'Switch to Gyro chatbot',
    href: '/gyro',
  },
}

const PageBtn = ({ page }: { page: GyroPage }) => {
  const { page: currentPage } = useContext(GyroPageCtx);

  return <Link
    href={Pages[page].href}
    className={clsx(styles.elem, { [styles.elemSelected]: currentPage === page })}
    id={styles['page-btn__' + page]}
    aria-label={Pages[page].label}
    scroll={false}
    prefetch={false}
  >
    <Image src={Pages[page].icon} alt="" className={styles.icon} aria-hidden/>
    <div className={styles.indicator} aria-hidden></div>
  </Link>;
}
