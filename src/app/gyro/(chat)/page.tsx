'use client';

import styles from './page.module.scss';
import { nunito } from '~/app/fonts';
import { useForm } from 'react-hook-form';
import skeletonLogoSVG from 'public/logos/logo-big-skeleton.svg';
import Image from 'next/image';
import Markdown from 'react-markdown';
import React, { useMemo } from 'react';

interface Msg {
  body: string,
  role: 'human' | 'ai',
  docs?: string[],
}

const Page = () =>
  <main id={styles.main} className={nunito.className}>
    <MemoizedMsgs/>
    <Input/>
  </main>;

export default Page;

const Input = () => {
  const { register, handleSubmit, watch } = useForm<{ message: string }>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const msg = watch('message') ?? '';

  // Don't ask my how I got these numbers; they just work. I hope.
  const inputHeight = ((msg.split('\n').length - 1) * 26 + 56) + 'px';
  const labelOpacity = msg.length > 0 ? 0 : undefined;

  return <>
    <form id={styles.chatForm} onSubmit={onSubmit}>
      <div className={styles.textareaWrapper} style={{ height: inputHeight }}>
        <textarea
          wrap="soft"
          {...register('message', {
            required: true,
          })}
        />
        <label htmlFor="message" style={{ opacity: labelOpacity }}>
          Ask me <span>anything</span>
        </label>
      </div>
      <button type="submit"/>
    </form>
  </>
}

const Msgs = () => {
  const msgs = useMsgHistory();

  if (msgs.length === 0) {
    return <Image className={styles.skeleLogo} src={skeletonLogoSVG} alt="" aria-hidden="true"/>;
  }

  return <>
    <h4 id={styles.startOfChat}>Start of chat</h4>
    <ul id={styles.msgList}>
      {msgs.map((msg, i) => <Msg key={i} msg={msg}/>)}
    </ul>
  </>;
}

const MemoizedMsgs = React.memo(Msgs);

const Msg = ({ msg }: { msg: Msg }) =>
  <li className={styles['msg__' + msg.role]}>
    <h4>{msg.role === 'human' ? 'You' : 'Gyro'}</h4>
    <Markdown>{msg.body}</Markdown>
    {msg.docs && <Docs docs={msg.docs}/>}
  </li>

const Docs = ({ docs }: { docs: string[] }) =>
  <ul id={styles.docs}>
    {docs.map((doc, i) => <li key={i}><i/>{doc}</li>)}
  </ul>

const useMsgHistory = (): Msg[] => useMemo(() => [
  {
    role: 'human',
    body: 'What does it mean to fuse a micro-op?',
  },
  {
    role: 'ai',
    body: `
"Fusing a micro-op" refers to the combination of multiple micro-operations (micro-ops) into a single micro-op. In modern CPUs, especially those with a complex instruction set computing (CISC) design like the x86 architecture, instructions from a program get broken down into simpler operations (micro-ops) that the CPU's execution engine can handle more efficiently. By fusing multiple micro-ops together, the CPU can execute them as if they were a single operation, improving throughput and overall performance.

There are several benefits to micro-op fusion:
1. Reduced Queue Pressure: Since fused micro-ops occupy a single entry in various CPU queues (like the reorder buffer or the scheduler queue), more operations can fit into these structures, which can lead to better throughput.
2. Improved Efficiency: Executing a fused micro-op often requires fewer resources than executing two separate ones, leading to power and efficiency gains.
3. Higher Instruction Throughput: Fusing micro-ops can allow for more instructions to be dispatched and retired per cycle, improving the CPU's instruction throughput.

Intel's CPUs, for instance, have leveraged micro-op fusion for various instructions to increase execution efficiency.`,
    docs: ['some_agner_fog_manual.pdf', 'some_other_agner_fog_manual.pdf'],
  },
], []);
