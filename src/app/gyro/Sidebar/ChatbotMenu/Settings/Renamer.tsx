'use client';

import styles from './Renamer.module.scss';
import { Conversation } from '~/app/gyro/Sidebar/ChatbotMenu/ChatbotMenu.types';
import { useForm } from 'react-hook-form';
import { Requestee } from '~/lib/hooks/useMediator';
import { createPortal } from 'react-dom';
import React, { useRef, useState } from 'react';
import clsx from 'clsx';

export interface InitRenameArgs {
  selectedRef: HTMLSpanElement,
}

export interface RenamerDoneArgs {
  newName: string,
  on: Conversation,
}

type MaybeRenamerDoneArgs =
  | RenamerDoneArgs
  | {}

export type MaybeRenamerDoneArgsWithCleanup =
  & { cleanup: () => void }
  & MaybeRenamerDoneArgs

export interface RenamerProps {
  requestee: Requestee<InitRenameArgs, MaybeRenamerDoneArgsWithCleanup>,
  selected?: Conversation,
}

export const Renamer = ({ requestee, selected }: RenamerProps) => {
  const selectedRef = useRef<HTMLSpanElement>()
  const [args, setArgs] = useState<RenamerFormProps>();

  requestee.onRequest(({ selectedRef: _selectedRef }, onDone) => {
    selectedRef.current = _selectedRef;

    const cleanup = () => {
      requestee.markDone();
      setArgs(undefined);
    }

    setArgs({
      selected: selected!,
      onDone(doneArgs?: MaybeRenamerDoneArgs) {
        onDone({ ...doneArgs, cleanup });
      }
    });
  });

  if (args && selectedRef.current) {
    return createPortal(<RenamerForm {...args}/>, selectedRef.current)
  }
}

interface RenamerFormProps {
  selected: Conversation,
  onDone: (args?: MaybeRenamerDoneArgs) => void,
}

const RenamerForm = ({ selected, onDone }: RenamerFormProps) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<{ name: string }>();

  const onSubmit = handleSubmit(({ name }) => {
    setLoading(true);

    onDone({
      on: selected,
      newName: name,
    });
  });

  return <form
    id={styles.form}
    onSubmit={onSubmit}
    className={clsx(loading && styles.loading)}
    onBlur={(e) => {
      !e.currentTarget.contains(e.relatedTarget) && onDone();
    }}
    autoComplete="off"
  >
    <input
      type="text"
      {...register('name', { required: true })}
      autoFocus
      placeholder="Enter a new name..."
      aria-label="Text field to rename the chat (unfocus or submit to rename)"
      autoComplete="one-time-code"
      defaultValue={selected.name}
    />
    <button aria-label="Submit the renamming"/>
  </form>;
}
