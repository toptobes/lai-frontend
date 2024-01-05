import { Kids } from '~/lib/prelude';
import clsx from 'clsx';
import styles from './BasicModal.module.scss';
import { WithModalRef } from '~/lib/hooks/useModalState';

export interface BasicModalProps extends Kids, WithModalRef {
  className?: string,
  header: string,
}

export const BasicModal = ({ className, header, children, modalRef }: BasicModalProps) =>
  <dialog className={clsx(styles.modal, className)} ref={modalRef}>
    <h3>{header}</h3>
    {children}
  </dialog>;
