'use client';

import { Suspense, useReducer } from 'react';
import { defaultState, reducer } from './ChatbotMenu.logic';
import { ConversationsMenu } from './Conversations/ConversationsMenu';
import { ChatSettings } from './Settings/ChatSettings';
import { useChatCreationMediator } from '~/lib/gyro/contexts/CreateNewChatCtx';
import { useMediator } from '~/lib/hooks/useMediator';
import { InitRenameArgs, Renamer, MaybeRenamerDoneArgsWithCleanup } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/Renamer';
import { WithContainerRef } from '~/app/gyro/Sidebar/Sidebar';

export const ChatbotMenu = ({ containerRef }: WithContainerRef) => {
  const [state, dispatch] = useReducer(reducer, defaultState(containerRef));
  state.ioActions(dispatch);

  useChatCreationMediator().setCallback((args) => {
    dispatch({ action: 'new-chat', ...args });
  });

  const [requester, requestee] = useMediator<InitRenameArgs, MaybeRenamerDoneArgsWithCleanup>();

  return <>
    <Renamer requestee={requestee} selected={state.selected}/>
    <Suspense>
      <ConversationsMenu state={state} dispatch={dispatch} renamer={requester}/>
    </Suspense>
    {state.selected && <ChatSettings selected={state.selected} dispatch={dispatch} renamer={requester}/>}
  </>
}
