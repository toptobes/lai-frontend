'use client';

import { useCurrentConvo } from '~/lib/gyro/hooks/useCurrentConvo';
import { useQuery } from '@tanstack/react-query';
import { UserAPI } from '~/generated';
import { DUMMY_CREDENTIALS } from '~/lib/prelude';
import { processConvosDTO } from '~/app/gyro/Sidebar/ChatbotMenu/ChatbotMenu.logic';
import { useEffect } from 'react';
import { Group } from '~/app/gyro/Sidebar/ChatbotMenu/Conversations/Group';
import { GroupName } from '~/app/gyro/Sidebar/ChatbotMenu/ChatbotMenu.types';
import { ConversationsProps } from '~/app/gyro/Sidebar/ChatbotMenu/Conversations/Conversations';

export const Groups = ({ state, dispatch, renamer }: ConversationsProps) => {
  const currentConvo = useCurrentConvo();

  const { data: groups } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => UserAPI.getGyroConversations(DUMMY_CREDENTIALS).then(processConvosDTO),
    // queryFn: () => processConvosDTO(fakeConversations()),
  });

  useEffect(() => {
    groups && dispatch({ action: 'set-msgs', groups })
  }, [dispatch, groups]);

  if (!state.groups) {
    return <div>Loading...</div>;
  }

  return state.groups.map((group, si) => (
    <Group key={group[GroupName]} group={group} si={si} currentID={currentConvo} state={state} dispatch={dispatch} renamer={renamer}/>
  ));
}
