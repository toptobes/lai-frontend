'use client';

import { createContext, ReactNode, useContext, useRef } from 'react';
import { Action, Consumer, Tuple2Obj } from '~/lib/prelude';
import { HistoryAction } from '~/app/gyro/Sidebar/ChatbotMenu/ChatbotMenu.types';
import { Mediator, useMediator } from '~/lib/hooks/useMediator';

export type NewChatArgs = Omit<Action<HistoryAction, 'new-chat'>, 'action'>;

export interface CreateNewChatCtx {
  requestNewChat: Consumer<NewChatArgs>,
  setCallback: Consumer<(args: NewChatArgs) => void>,
}

const CreateNewChatCtx = createContext<CreateNewChatCtx>(null!);

export const useChatCreationMediator = () => useContext(CreateNewChatCtx)

export const CreateNewChatProvider = ({ children }: { children: ReactNode }) => {
  const [requester, requestee] = useMediator<NewChatArgs>();

  const setCallback = (cb: (args: NewChatArgs) => void) =>
    requestee.onRequest((args, onDone) => {
      cb(args);
      onDone();
    });

  return <CreateNewChatCtx.Provider value={{ requestNewChat: requester.request, setCallback }}>
    {children}
  </CreateNewChatCtx.Provider>
}
