import React from 'react';
import { useForm } from 'react-hook-form';
import s from './styles/Input.module.scss';
import { useCurrentConvo } from '~/lib/gyro/hooks/useCurrentConvo';
import { useConvoFocuser } from '~/lib/gyro/contexts/ChatInputRefCtx';
import clsx from 'clsx';

interface InputProps {
  showModal: () => void,
  noMsgs: boolean,
}

const _Input = ({ noMsgs, showModal }: InputProps) => {
  const { register, handleSubmit, watch } = useForm<{ message: string }>();
  const noConvoID = !useCurrentConvo();
  const { ref, focusing, unFocusInput } = useConvoFocuser();

  const onSubmit = handleSubmit(_ => {
    noConvoID && noMsgs && showModal();

    if (focusing) {
      unFocusInput();
    }
  });

  const msg = watch('message') ?? '';

  // Don't ask my how I got these numbers; they just work. I hope.
  const inputHeight = ((msg.split('\n').length - 1) * 26 + 56) + 'px';
  const labelOpacity = msg.length > 0 ? 0 : undefined;

  return <form id={s.chatForm} onSubmit={onSubmit}>
    <div id={s.textareaWrapper} style={{ height: inputHeight }} ref={r => ref.current = r?.firstChild as HTMLTextAreaElement}>
      <textarea
        wrap="soft"
        {...register('message', {
          required: true,
        })}
        placeholder={noMsgs ? undefined : 'Message Gyro...'}
        id={s.textarea}
      />
      {noMsgs &&
        <label htmlFor={s.textarea} id={s.label} style={{ opacity: labelOpacity }}>
          Ask me <span>anything</span>
        </label>}
      <div className={clsx(s.indicator, (!focusing || msg) && s.indicatorHidden)}>
        Type here, then hit send!
      </div>
    </div>
    <button aria-label="Send your message to Gyro"/>
  </form>
}

export const Input = React.memo(_Input);
