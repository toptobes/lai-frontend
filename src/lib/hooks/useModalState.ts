import { RefObject, useEffect, useRef, useState } from 'react';
import { id } from '~/lib/prelude';

export interface WithModalRef {
  modalRef: RefObject<HTMLDialogElement>,
}

export interface ModalState<A, S = A> {
  showModal: (args: A) => void,
  isModalOpen: boolean,
  modalProps: ModalProps<S>
}

export interface ModalProps<S = void> extends WithModalRef {
  hideModal: () => void,
  modalState?: S,
}

export type UseModalArgs<A, S> =
  A extends S
    ? A extends A
      ? { contramap?: (args: A) => S }
      : { contramap: (args: A) => S }
    : { contramap: (args: A) => S };

interface StateWrapper<S> {
  state: S,
}

export const useModalState = <A = void, S = A>(props: UseModalArgs<A, S>): ModalState<A, S> => {
  const [state, setState] = useState<StateWrapper<S> | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = modalRef.current;
    const listener = () => setState(null)

    dialog && dialog.addEventListener('close', listener);

    return () => {
      dialog && dialog.removeEventListener('close', listener);
    }
  }, [modalRef]);

  const showModal = (newState: A) => {
    setState({ state: (props?.contramap || id)(newState) });
    modalRef.current?.showModal();
  }

  const hideModal = () => {
    setState(null);
    modalRef.current?.close();
  }

  const modalProps = { modalRef, modalState: state?.state, hideModal };

  return { showModal, isModalOpen: state !== null, modalProps };
}
