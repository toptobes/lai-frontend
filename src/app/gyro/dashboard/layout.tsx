import React from 'react';
import styles from './layout.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) =>
  <>
    <main className={styles.main}>{children}</main>
  </>

export default Layout;
