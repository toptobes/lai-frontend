import { Consumer, DUMMY_CREDENTIALS } from '~/lib/prelude';
import { useCurrentConvo } from '~/lib/gyro/hooks/useCurrentConvo';
import { useQuery } from '@tanstack/react-query';
import { ListMessagesDTO, UserAPI } from '~/generated';
import styles from '~/app/gyro/(chat)/Chat.module.scss';
import React from 'react';
import Markdown from 'react-markdown';

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

  const msgs = query.data ?? [];
  setShowLabel(msgs.length === 0);

  if (msgs.length === 0) {
    return <div className={styles.skeleLogo}/>;
  }

  return <>
    <h4 id={styles.startOfChat}>Start of chat</h4>
    <ul id={styles.msgList}>
      {msgs.map((msg, i) => <Msg key={i} msg={msg}/>)}
    </ul>
  </>;
}

export const Msgs = React.memo(_Msgs);

const Msg = ({ msg }: { msg: Message }) =>
  <li className={styles['msg__' + msg.role]}>
    <h4>{msg.role === 'human' ? 'You' : 'Gyro'}</h4>
    <Markdown>{msg.body}</Markdown>
    {msg.sources && <Docs docs={msg.sources}/>}
  </li>

const Docs = ({ docs }: { docs: Source[] }) =>
  <ul id={styles.docs}>
    {docs.map((doc, i) => <li key={i}><i/>{doc.name}</li>)}
  </ul>

type Role = 'human' | 'ai';

interface Message {
  uuid: string,
  body: string,
  role: Role,
  created: Date,
  sources: Source[],
}

interface Source {
  name: string,
  text: string[],
}

const processMessagesDTO = ({ messages }: ListMessagesDTO): Message[] => messages.map(m => ({
  uuid: m.id,
  body: m.body,
  role: m.role as Role,
  created: new Date(m.created),
  sources: m.sources?.alistGroupBy(s => s.source_name)?.map(([name, sources]) => ({
    name,
    text: sources.map(s => s.source_value),
  })) ?? [],
}));
