import { RefObject, useEffect, useRef, useState } from 'react';
import { id } from '~/lib/prelude';

export interface WithModalRef {
  modalRef: RefObject<HTMLDialogElement>,
}

export interface ModalState<A, B> extends WithModalRef {
  showModal: (args: A) => void,
  hideModal: () => void,
  modalState?: B,
}

export type ModalProps<A, B> =
  A extends B
    ? A extends A
      ? { contramap?: (args: A) => B }
      : { contramap: (args: A) => B }
    : { contramap: (args: A) => B };

export const useModalState = <A = void, B = A>(props: ModalProps<A, B>): ModalState<A, B> => {
  const [modalState, setModalState] = useState<B | undefined>();
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = modalRef.current;
    const listener = () => setModalState(undefined)

    dialog && dialog.addEventListener('close', listener);

    return () => {
      dialog && dialog.removeEventListener('close', listener);
    }
  }, [modalRef]);

  const showModal = (state: A) => {
    setModalState((props?.contramap || id)(state));
    modalRef.current?.showModal();
  }

  const hideModal = () => {
    setModalState(undefined);
    modalRef.current?.close();
  }

  return { modalRef, showModal, hideModal, modalState };
}
