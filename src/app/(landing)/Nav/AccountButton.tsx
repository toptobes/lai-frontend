'use client';

import styles from './Nav.module.scss'
import Link from 'next/link';

const LoggedIn = false;

export const AccountButton = () => {
  return LoggedIn
    ? <button id={styles.accountBtnAccount}>Account</button>
    : <Link id={styles.accountBtnLogin} href={'/account/login'}>Log in</Link>;
}
