import React from 'react';
import { useForm } from 'react-hook-form';
import styles from '~/app/gyro/(chat)/Chat.module.scss';
import { useCurrentConvo } from '~/lib/gyro/hooks/useCurrentConvo';

interface InputProps {
  showModal: () => void,
  noMsgs: boolean,
}

const _Input = ({ noMsgs, showModal }: InputProps) => {
  const { register, handleSubmit, watch } = useForm<{ message: string }>();
  const noConvoID = !useCurrentConvo();

  const onSubmit = handleSubmit(_ => {
    noConvoID && noMsgs && showModal();
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
          placeholder={noMsgs ? undefined : 'Message Gyro...'}
        />
        {noMsgs &&
          <label htmlFor="message" style={{ opacity: labelOpacity }}>
            Ask me <span>anything</span>
          </label>}
      </div>
      <button aria-label="Send your message to Gyro"/>
    </form>
  </>
}

export const Input = React.memo(_Input);
