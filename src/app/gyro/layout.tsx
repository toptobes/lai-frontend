import { ReactNode } from 'react';
import { Nav } from '~/components/gyro/Nav';
import { Sidebar } from '~/components/gyro/Sidebar';
import { GyroPageCtxProvider } from '~/contexts/gyro/GyroPageCtx';
import styles from './layout.module.scss';

interface Props {
  children: ReactNode,
}

const Layout = ({ children }: Props) =>
  <GyroPageCtxProvider>
    <div id={styles.bg}>
      <Nav/>
      <Sidebar/>
      {children}
    </div>
  </GyroPageCtxProvider>

export default Layout;
