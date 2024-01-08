import { useRouter } from 'next/navigation';
import { useSidebarLock } from '~/lib/gyro/contexts/SidebarLockCtx';
import clsx from 'clsx';
import styles from './styles/Group.module.scss';
import { noProp } from '~/lib/prelude';
import { SyntheticEvent } from 'react';
import { GroupProps } from '~/app/gyro/Sidebar/ChatbotMenu/Conversations/Group';
import { Conversation as ConversationT } from '~/app/gyro/Sidebar/ChatbotMenu/ChatbotMenu.types';

interface ConversationProps extends Omit<GroupProps, 'group'> {
  conversation: ConversationT,
  li: number,
}

export const Conversation = ({ conversation, currentID, si, li, state, dispatch, renamer }: ConversationProps) => {
  const { push } = useRouter();
  const { toggleNoClose } = useSidebarLock();

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
    toggleNoClose();
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
