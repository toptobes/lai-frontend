'use client';

import { createContext, MutableRefObject, RefObject, useContext, useRef, useState } from 'react';
import { Kids } from '~/lib/prelude';
import { useRouter } from 'next/navigation';

export interface ChatInputFocus {
  ref: MutableRefObject<HTMLTextAreaElement | undefined>,
  focusInput: () => void,
  unFocusInput: () => void,
  focusing: boolean,
}

const ChatInputRefCtx = createContext<ChatInputFocus>(null!);

export const useConvoFocuser = () => useContext(ChatInputRefCtx);

export const ChatInputRefProvider = ({ children }: Kids) => {
  const [focus, setFocus] = useState(false);
  const ref = useRef<HTMLTextAreaElement>();
  const { push } = useRouter();

  return <ChatInputRefCtx.Provider value={{
    ref,
    focusInput: () => {
      push('/gyro');
      setFocus(true);
      ref.current?.focus();
    },
    unFocusInput: () => setFocus(false),
    focusing: focus,
  }}>
    {children}
  </ChatInputRefCtx.Provider>
}
