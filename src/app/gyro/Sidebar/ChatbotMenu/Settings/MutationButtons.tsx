import clsx from 'clsx';
import s from '~/app/gyro/Sidebar/ChatbotMenu/Settings/styles/MutationButtons.module.scss';
import React from 'react';
import { Consumer, DUMMY_CREDENTIALS } from '~/lib/prelude';
import { HistoryAction } from '~/app/gyro/Sidebar/ChatbotMenu/ChatbotMenu.types';
import { Requester } from '~/lib/hooks/useMediator';
import { InitRenameArgs, MaybeRenamerDoneArgsWithCleanup } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/Renamer';
import { WithSelected } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/ChatSettings';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { UserAPI } from '~/generated';
import convoStyles from '~/app/gyro/Sidebar/ChatbotMenu/Conversations/styles/Group.module.scss';
import { ModalProps, useModalState } from '~/lib/hooks/useModalState';
import { BasicModal } from '~/lib/components/modals/BasicModal';

export interface MutationButtonProps extends WithSelected {
  dispatch: Consumer<HistoryAction>,
  renamer: Requester<InitRenameArgs, MaybeRenamerDoneArgsWithCleanup>,
}

export const MutationButtons = (props: MutationButtonProps) =>
  <div className={s.wrapper}>
    <RenameButton {...props}/>
    <DeleteMutation {...props}/>
  </div>

const RenameButton = ({ renamer, selected, dispatch }: MutationButtonProps) => {
  const renameMutation = useMutation(({
    mutationFn: (name: string) => UserAPI.putGyroConversations(DUMMY_CREDENTIALS, selected.uuid, { new_conversation_name: name }),
  }));

  renamer.onDone((args) => {
    if (!('newName' in args)) return args.cleanup();

    renameMutation.mutate(args.newName, {
      onSuccess: () => dispatch({ action: 'set-selected-name', name: args.newName }),
      onSettled: args.cleanup,
    });
  });

  const reqRename = () => renamer.request({
    selectedRef: document.querySelector<HTMLSpanElement>(`.${convoStyles.selected}`)!, // Temporary, I swear
  });

  const renaming = renamer.mediating;

  return <button
    onClick={reqRename}
    disabled={renaming}
    className={clsx(s.renameChat, renaming && s.renameChatActive)}
    aria-label="Rename this chat"
  />
}

interface DelModalArgs {
  onDelete: () => void,
}

const DeleteMutation = ({ selected, dispatch }: MutationButtonProps) => {
  const { showModal, modalProps, isModalOpen } = useModalState<DelModalArgs>({})
  const { push } = useRouter();

  const deleteMutation = useMutation({
    mutationFn: () => UserAPI.deleteGyroConversations(DUMMY_CREDENTIALS, selected.uuid),
    onSuccess: () => {
      dispatch({ action: 'del-selected-chat' });
      dispatch({ action: 'toggle-settings', conversation: selected });
      push('/gyro');
    },
  });

  const reqDeletion = () => showModal({
    onDelete: deleteMutation.mutate,
  });

  const deleting = isModalOpen || deleteMutation.isPending;

  const onClick = (e: React.MouseEvent) =>
    (e.shiftKey)
      ? deleteMutation.mutate()
      : reqDeletion();

  return <>
    <button
      aria-label="Delete this chat"
      onClick={onClick}
      className={clsx(s.deleteChat, deleting && s.deleteChatLoading)}
    />
    <DeletionConfirmation {...modalProps}/>
  </>
}

const DeletionConfirmation = ({ modalRef, modalState, hideModal }: ModalProps<DelModalArgs>) => {
  const onDelete = () => {
    modalState?.onDelete();
    hideModal();
  }

  return <BasicModal header="Sure you want to delete this chat?" modalRef={modalRef}>{
    modalState && <>
      <div className={s.deleteModal}>
        <button onClick={hideModal}>Cancel</button>
        <button onClick={onDelete}>Confirm</button>
      </div>
      <p>Hint: Press shift while deleting next time to avoid this confirmation.</p>
    </>
  }</BasicModal>;
}
