import { ReactNode } from 'react';
import { Nav } from '~/components/landing/Nav';

interface Props {
  children: ReactNode,
}

const Layout = ({ children }: Props) => <>
  <Nav/>
  {children}
</>;

export default Layout;
