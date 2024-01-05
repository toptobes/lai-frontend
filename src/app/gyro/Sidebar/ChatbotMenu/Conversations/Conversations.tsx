'use client';

import { HistoryProps, } from '~/app/gyro/Sidebar/ChatbotMenu/ChatbotMenu.types';
import { slideOffLeft } from '~/app/gyro/Sidebar/ChatbotMenu/ChatbotMenu.logic';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Requester } from '~/lib/hooks/useMediator';
import { InitRenameArgs, RenamerDoneArgs } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/Renamer';
import { Groups } from '~/app/gyro/Sidebar/ChatbotMenu/Conversations/Groups';
import styles from './Conversations.module.scss';

export interface ConversationsProps extends HistoryProps {
  renamer: Requester<InitRenameArgs, RenamerDoneArgs>
}

export const ConversationsMenu = ({ state, ...props }: ConversationsProps) => {
  const { push } = useRouter();

  return <>
    <Suspense>
      <Groups state={state} {...props}/>
    </Suspense>
    <button
      id={styles.newChat}
      aria-label="Create a new chat"
      style={state.selected && slideOffLeft}
      onClick={() => push('/gyro', { scroll: false })}
      disabled={state.groups === undefined}
    />
  </>;
}
