'use client';

import { useRouter } from 'next/navigation';
import { useSidebarLock } from '~/lib/gyro/contexts/SidebarLockCtx';
import clsx from 'clsx';
import styles from './Group.module.scss';
import { noProp } from '~/lib/prelude';
import { SyntheticEvent } from 'react';
import { GroupProps } from '~/app/gyro/Sidebar/ChatbotMenu/Conversations/Group';

interface ConversationProps extends Omit<GroupProps, 'group'> {
  conversation: Conversation,
  li: number,
}

export const Conversation = ({ conversation, currentID, si, li, state, dispatch, renamer }: ConversationProps) => {
  const { push } = useRouter();
  const { toggleLock } = useSidebarLock();

  const isSelected = conversation.ord === state.selected?.ord;

  const className = clsx(
    styles.dateGroupContent,
    conversation.uuid == currentID && styles.menuUlCurrent,
    isSelected && styles.selected,
    renamer.mediating && styles.renaming,
  );

  const toggleMenuMode = noProp((e: SyntheticEvent) => {
    e.target instanceof HTMLButtonElement && e.target.blur();
    dispatch({ action: 'toggle-settings', conversation });
    toggleLock();
  });

  const onListClick = !isSelected
    ? () => push(`/gyro?c=${conversation.uuid}`, { scroll: false })
    : toggleMenuMode;

  return <li key={conversation.name}>
    <div
      tabIndex={0}
      style={state.listElemStyle(si, li)}
      onClick={onListClick}
      onKeyDown={onListClick}
      className={className}
      role="button"
    >
      <span>{conversation.name}</span>
      <button onClick={toggleMenuMode} className={styles.dateGroupSettingsButton}/>
    </div>
  </li>
}
