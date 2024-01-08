import { CSSProperties, Dispatch } from 'react';
import { Consumer, IO } from '~/lib/prelude';
import { RenamerDoneArgs } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/Renamer';
import { WithContainerRef } from '~/app/gyro/Sidebar/Sidebar';

export interface Conversation {
  uuid: string,
  name: string,
  date: string,
  ord: number,
}

export interface UsedDoc {
  name: string,
  size: string,
  link: string | undefined,
}

export type ConversationGroup = [string, Conversation[]]
export const GroupName = 0;
export const GroupConvos = 1;

export type HistoryAction =
  | { action: 'toggle-settings', conversation: Conversation }
  | { action: 'new-chat', name: string, uuid: string }
  | { action: 'set-msgs', groups: ConversationGroup[] }
  | { action: 'reset-msg-animations' }
  | { action: 'set-selected-name', name: string }
  | { action: 'del-selected-chat' }

export interface HistoryState extends WithContainerRef {
  selected: Conversation | undefined,
  listElemStyle: (si: number, li: number) => (CSSProperties | undefined),
  sectionStyle: (si: number) => (CSSProperties | undefined),
  savedScrollTop: number,
  ioActions: IO<[Consumer<HistoryAction>], void>,
  groups?: ConversationGroup[],
}

export interface HistoryProps {
  dispatch: Dispatch<HistoryAction>,
  state: HistoryState,
}
