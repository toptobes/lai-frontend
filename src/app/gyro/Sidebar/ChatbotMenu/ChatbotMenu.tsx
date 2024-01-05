'use client';

import React, { useReducer } from 'react';
import { defaultState, reducer } from './ChatbotMenu.logic';
import { WithContainerRef } from '~/app/gyro/Sidebar';
import { ConversationsMenu } from './Conversations/Conversations';
import { ChatSettings } from './Settings/ChatSettings';
import { useChatCreationMediator } from '~/lib/gyro/contexts/CreateNewChatCtx';
import { useMediator } from '~/lib/hooks/useMediator';
import { InitRenameArgs, Renamer, MaybeRenamerDoneArgsWithCleanup } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/Renamer';

export const ChatbotMenu = ({ containerRef }: WithContainerRef) => {
  const [state, dispatch] = useReducer(reducer, defaultState(containerRef));
  state.ioActions(dispatch);

  useChatCreationMediator().setCallback((args) => {
    dispatch({ action: 'new-chat', ...args });
  });

  const [requester, requestee] = useMediator<InitRenameArgs, MaybeRenamerDoneArgsWithCleanup>();

  return <>
    <Renamer requestee={requestee} selected={state.selected}/>
    <ConversationsMenu state={state} dispatch={dispatch} renamer={requester}/>
    {state.selected && <ChatSettings selected={state.selected} dispatch={dispatch} rename={requester}/>}
  </>
}
