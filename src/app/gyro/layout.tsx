import React from 'react';
import { Nav } from './Nav';
import { Sidebar } from './Sidebar';
import styles from './layout.module.scss';
import { GyroPageCtxProvider } from '~/lib/gyro/contexts/GyroPageCtx';
import { CreateNewChatProvider } from '~/lib/gyro/contexts/CreateNewChatCtx';
import { Kids } from '~/lib/prelude';

const Layout = ({ children }: Kids) =>
  <GyroPageCtxProvider>
    <CreateNewChatProvider>
      <div id={styles.bg}>
        <Nav/>
        <Sidebar/>
        {children}
      </div>
    </CreateNewChatProvider>
  </GyroPageCtxProvider>

export default Layout;
