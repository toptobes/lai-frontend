import styles from './Nav.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import bigLogoSVG from 'public/logos/logo-big.svg';
import { SiteLinks } from '~/components/landing/Nav/SiteLinks';
import { AccountButton } from '~/components/landing/Nav/AccountButton';

export const Nav = () =>
  <nav id={styles.nav} aria-label="Site Menu">
    <div className={styles.navLinkWrapper}>
      <Link href={'/'} id={styles.homeBtn}>
        <Image src={bigLogoSVG} alt="" aria-hidden/>
      </Link>
      <SiteLinks/>
    </div>
    <AccountButton/>
  </nav>;
