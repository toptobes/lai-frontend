import { CSSProperties, Dispatch } from 'react';
import { Consumer, DTOType, IO } from '~/lib/prelude';
import { WithContainerRef } from '~/app/gyro/Sidebar';
import { UserAPI } from '~/generated';
import { RenamerDoneArgs, MaybeRenamerDoneArgsWithCleanup } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/Renamer';

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
  | { action: 'set-name' } & RenamerDoneArgs

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
