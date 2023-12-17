'use client';

import styles from './DashboardMenu.module.scss';
import Link from 'next/link';

type Link = {
  name: string;
  href: string;
}

const links = [
  {
    name: 'Metrics',
    href: '/gyro/dashboard/metrics',
  },
  {
    name: 'Rankings',
    href: '/gyro/dashboard/rankings',
  },
  {
    name: 'API',
    href: '/gyro/dashboard/api',
  },
  {
    name: 'Endpoints',
    href: '/gyro/dashboard/endpoints',
  },
  {
    name: 'Vault',
    href: '/gyro/dashboard/vault',
  },
]

export const DashboardMenu = () =>
  <ul>{
    links.map(link => <NavLink key={link.name} link={link}/>)
  }</ul>

const NavLink = ({ link }: { link: Link }) =>
  <li>
  <Link href={link.href} scroll={false}>{link.name}</Link>
  </li>
