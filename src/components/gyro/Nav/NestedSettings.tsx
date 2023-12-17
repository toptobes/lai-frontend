'use client';

import styles from './Nav.module.scss';
import Image from 'next/image';
import settingsSVG from 'public/icons/settings.svg';

export const NestedSettings = () =>
  <button className={styles.elem} id={styles.settings} aria-label="Open user settings dropdown">
    <span>username</span>
    <Image src={settingsSVG} alt="" className={styles.settingsIcon} aria-hidden/>
  </button>;
