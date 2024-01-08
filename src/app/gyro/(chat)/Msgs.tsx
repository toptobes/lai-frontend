import { Consumer, DUMMY_CREDENTIALS } from '~/lib/prelude';
import { useCurrentConvo } from '~/lib/gyro/hooks/useCurrentConvo';
import { useQuery } from '@tanstack/react-query';
import { ListMessagesDTO, UserAPI } from '~/generated';
import s from '~/app/gyro/(chat)/styles/Msgs.module.scss';
import React from 'react';
import { Msg } from '~/app/gyro/(chat)/Msg';

const _Msgs = ({ setShowLabel }: { setShowLabel: Consumer<boolean> }) => {
  const convoID = useCurrentConvo();

  const query = useQuery({
    queryKey: ['messages', convoID],
    queryFn: () => UserAPI.getGyroConversationsMessages(DUMMY_CREDENTIALS, convoID!).then(processMessagesDTO),
    enabled: !!convoID,
  });

  if (convoID && !query.data) {
    return <h4>Loading...</h4>;
  }

  const msgs = query.data ?? { history: [] };
  const noHistory = !msgs.streaming && msgs.history.length === 0;

  setShowLabel(noHistory);

  if (!convoID || noHistory) {
    return <div className={s.skeleLogo}/>;
  }

  return <>
    <h4 id={s.startOfChat}>Start of chat</h4>
    <ul id={s.msgList}>
      {msgs.history.map((msg, i) => <Msg key={i} msg={msg} convoID={convoID}/>)}
    </ul>
  </>;
}

export const Msgs = React.memo(_Msgs);

export type Role = 'human' | 'ai';

export interface Messages {
  streaming?: Message,
  history: Message[],
}

export interface Message {
  uuid: string,
  body: string,
  role: Role,
  created: Date,
  sources: Source[],
}

export interface Source {
  name: string,
  text: string[],
}

const processMessagesDTO = ({ messages }: ListMessagesDTO): Messages => ({
  history: messages.map(m => ({
    uuid: m.id,
    body: m.body,
    role: m.role as Role,
    created: new Date(m.created),
    sources: m.sources?.alistGroupBy(s => s.source_name)?.map(([name, sources]) => ({
      name,
      text: sources.map(s => s.source_value),
    })) ?? [],
  }))
});
