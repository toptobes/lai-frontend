'use client';

import styles from './ChatSettings.module.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Consumer, DUMMY_CREDENTIALS } from '~/lib/prelude';
import { Conversation, HistoryAction } from '../ChatbotMenu.types';
import React from 'react';
import { UserAPI } from '~/generated';
import { Requester } from '~/lib/hooks/useMediator';
import clsx from 'clsx';
import { InitRenameArgs, MaybeRenamerDoneArgsWithCleanup } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/Renamer';
import { FileInput } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/FileInput';
import { Documents } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/Documents';
import convoStyles from '../Conversations/Group.module.scss';

export interface WithSelected {
  selected: Conversation,
}

interface ChatSettingsProps extends WithSelected {
  dispatch: Consumer<HistoryAction>,
  rename: Requester<InitRenameArgs, MaybeRenamerDoneArgsWithCleanup>,
}

export const ChatSettings = ({ selected, dispatch, rename }: ChatSettingsProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => UserAPI.deleteGyroConversations(DUMMY_CREDENTIALS, selected.uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] }).then(() => {
        dispatch({ action: 'toggle-settings', conversation: selected });
      });
    },
  });

  const renameMutation = useMutation(({
    mutationFn: (name: string) => UserAPI.putGyroConversations(DUMMY_CREDENTIALS, selected.uuid, { new_conversation_name: name }),
  }));

  rename.onDone((args) => {
    if (!('newName' in args)) return args.cleanup();

    renameMutation.mutate(args.newName, {
      onSuccess: () => dispatch({ action: 'set-name', ...args }),
      onSettled: args.cleanup,
    });
  });

  const reqRename = () => rename.request({
    selectedRef: document.querySelector<HTMLSpanElement>(`.${convoStyles.selected}`)!, // Temporary, I swear
  });

  return <>
    <section className={styles.chatSettings}>
      <h5>Chat settings</h5>
      <div>
        <button
          onClick={reqRename}
          disabled={rename.mediating}
          className={clsx(styles.renameChat, rename.mediating && styles.renameChatActive)}
          aria-label="Rename this chat"
        />
        <button
          aria-label="Delete this chat"
          onClick={() => deleteMutation.mutate()}
          id={styles.deleteChat}
        />
      </div>
      <Documents selected={selected}/>
    </section>
    <FileInput selected={selected}/>
  </>;
}
