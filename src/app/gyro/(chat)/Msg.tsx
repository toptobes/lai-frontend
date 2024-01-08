import s from '~/app/gyro/(chat)/styles/Msg.module.scss';
import React from 'react';
import Markdown from 'react-markdown';
import { Message, Messages, Source } from '~/app/gyro/(chat)/Msgs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserAPI } from '~/generated';
import { DUMMY_CREDENTIALS } from '~/lib/prelude';

interface Props {
  msg: Message,
  convoID: string,
}

export const Msg = ({ msg, ...props }: Props) =>
  <li className={s['msg__' + msg.role]}>
    <Header msg={msg} {...props}/>
    <Markdown>{msg.body}</Markdown>
    {msg.sources && <Docs docs={msg.sources}/>}
  </li>

const Header = ({ msg, ...props }: Props) =>
  (msg.role === 'human')
    ? <HumanHeader msg={msg} {...props}/>
    : <GyroHeader/>

const HumanHeader = ({ msg, convoID }: Props) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => UserAPI.deleteGyroConversationsMessages(DUMMY_CREDENTIALS, convoID, msg.uuid),
  });

  const onDelete = () => deleteMutation.mutate(null!, {
    onSuccess: () => queryClient.setQueryData<Messages>(['messages', convoID], (prev) => (prev && {
      ...prev,
      history: prev.history.takeWhile((m) => m.uuid !== msg.uuid),
    })),
  });

  return <div>
    <h4>You</h4>
    <div>
      - <button>edit</button> - <button onClick={onDelete}>delete</button>
    </div>
  </div>;
}

const GyroHeader = () => <div>
  <h4>Gyro</h4>
  <div>
    - <button>refresh</button>
  </div>
</div>

const Docs = ({ docs }: { docs: Source[] }) =>
  <ul id={s.docs}>
    {docs.map((doc, i) => <li key={i}><i/>{doc.name}</li>)}
  </ul>
