import styles from './Nav.module.scss';
import { SlimHideButton } from '~/lib/components/buttons/SlimHideButton';
import { PageBtns } from './PageBtns';
import { NestedSettings } from '~/app/gyro/Nav/NestedSettings';

export const Nav = () =>
  <nav id={styles.nav} aria-label="Gyro Menu">
    <SlimHideButton selector={`#${styles.nav}`} hidden={styles.navHidden} className={styles.hideButton}/>
    <PageBtns/>
    <NestedSettings/>
  </nav>;
