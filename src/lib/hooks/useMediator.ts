import { useMemo, useRef, useState } from 'react';
import { Consumer } from '~/lib/prelude';

export interface Requester<A, B> {
  request: Consumer<A>,
  onDone: Consumer<Consumer<B>>,
  mediating: boolean,
  markDone(): void,
}

export interface Requestee<A, B> {
  onRequest(cb: (a: A, onDone: Consumer<B>) => void): void,
  markDone(): void,
}

export type Mediator<A, B> = [
  Requester<A, B>,
  Requestee<A, B>,
];

export const useMediator = <A = void, B = void>(): Mediator<A, B> => {
  const [mediating, setMediating] = useState(false);
  const onRequest = useRef<(a: A, onDone: Consumer<B>) => void>(() => {});
  const onDone = useRef<Consumer<B>>(() => {});

  const requester = useMemo(() => ({
    request: (a: A) => {
      return onRequest.current(a, onDone.current);
    },
    onDone: (cb: Consumer<B>) => {
      onDone.current = cb;
    },
    mediating: mediating,
    markDone() {
      setMediating(false)
    },
  }), [mediating])

  const requestee = useMemo(() => ({
    onRequest(cb: (a: A, onDone: Consumer<B>) => void) {
      onRequest.current = (a, onDone) => {
        setMediating(true);
        cb(a, onDone);
      };
    },
    markDone() {
      setMediating(false)
    },
  }), []);

  return [requester, requestee];
}
