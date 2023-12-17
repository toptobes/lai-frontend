'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './Nav.module.scss'

interface Link  {
  to: string;
  label: string;
}

const links = [
  { to: '/about',    label: 'About'   },
  { to: '/careers',  label: 'Careers' },
  { to: '/gyro/get', label: 'Pricing' },
  { to: '/gyro',     label: 'Gyro'    },
];

export const SiteLinks = () => {
  const pathname = usePathname();
  const selected = links.find(link => pathname.startsWith(link.to));

  return links.map((link) =>
    <SiteLink key={link.label} link={link} selected={selected}/>
  );
}

const SiteLink = ({ link, selected }: { link: Link, selected?: Link }) =>
  <Link href={link.to} className={clsx(selected === link && styles.current)}>{link.label}</Link>
