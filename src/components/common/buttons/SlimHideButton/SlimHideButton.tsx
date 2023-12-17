'use client';

import styles from './SlimHideButton.module.scss';
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

interface Props {
  className?: string,
  selector: string,
  hidden: string,
}

export const SlimHideButton = ({ className, selector, hidden }: Props) => {
  const navRef = useRef<Element>();

  useEffect(() => {
    navRef.current = document.querySelector(selector)!;
  });

  const handleHide = () => {
    navRef.current!.classList.toggle(styles.hidden);
    navRef.current!.classList.toggle(hidden);
  }

  return <button className={clsx(styles.button, className)} onClick={handleHide} aria-label="Hide Gyro navbar"/>;
}
