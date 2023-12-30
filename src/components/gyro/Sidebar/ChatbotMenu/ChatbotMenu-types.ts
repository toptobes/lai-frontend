import { CSSProperties } from 'react';
import { InternalUserAPI } from '~/generated';
import { DTOType } from '~/lib/prelude';

export type ConversationsDTO = DTOType<typeof InternalUserAPI['getInternalGyroConversations']>

export interface Conversation {
  uuid: string,
  name: string,
  date: string,
  ord: number,
}

export interface UsedDocsDTO {
  documents?: UsedDocDTO[],
}

export interface UsedDocDTO {
  source_name: string,
  file_size: number,
  download_link?: string,
}

export interface UsedDoc {
  name: string,
  size: string,
  link: string | undefined,
}

export type ConversationGroup = [string, Conversation[]];

export type Action =
  | { action: 'toggle', selected: Conversation, conversations: ConversationGroup[] }

export interface State {
  selected: Conversation | undefined,
  listElemStyle: (si: number, li: number) => (CSSProperties | undefined),
  sectionStyle: (si: number) => (CSSProperties | undefined),
}
