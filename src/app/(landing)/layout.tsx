import { ReactNode } from 'react';
import { Nav } from './Nav';

interface Props {
  children: ReactNode,
}

const Layout = ({ children }: Props) => <>
  <Nav/>
  {children}
</>;

export default Layout;
