'use client';

import s from './DashboardMenu.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type Link = {
  name: string,
  href: string,
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
  <ul className={s.menuList}>{
    links.map(link => <NavLink key={link.name} link={link}/>)
  }</ul>

const NavLink = ({ link }: { link: Link }) => {
  const pathname = usePathname();

  const isSelected = pathname === link.href;
  const className = clsx(s.menuListContent, isSelected && s.menuListCurrent);

  return <li>
    <Link href={link.href} scroll={false} className={className}>{link.name}</Link>
  </li>;
}
