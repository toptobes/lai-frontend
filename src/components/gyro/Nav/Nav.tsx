import styles from './Nav.module.scss';
import { SlimHideButton } from '~/components/common/buttons/SlimHideButton/SlimHideButton';
import { PageBtns } from '~/components/gyro/Nav/PageBtns';
import { NestedSettings } from '~/components/gyro/Nav/NestedSettings';

export const Nav = () =>
  <nav id={styles.nav} aria-label="Gyro Menu">
    <SlimHideButton selector={`#${styles.nav}`} hidden={styles.navHidden} className={styles.hideButton}/>
    <PageBtns/>
    <NestedSettings/>
  </nav>;
