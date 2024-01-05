import { BasicModal } from '~/lib/components/modals/BasicModal';
import { WithModalRef } from '~/lib/hooks/useModalState';
import { useChatCreationMediator } from '~/lib/gyro/contexts/CreateNewChatCtx';
import { useForm } from 'react-hook-form';
import styles from './Chat.module.scss';
import { useMutation } from '@tanstack/react-query';
import { UserAPI } from '~/generated';
import { DUMMY_CREDENTIALS } from '~/lib/prelude';

interface AskNameProps extends WithModalRef {
  hideModal: () => void,
}

export const AskName = ({ modalRef, hideModal }: AskNameProps) => {
  const { requestNewChat } = useChatCreationMediator();
  const { register, handleSubmit } = useForm<{ name: string }>();

  const mutation = useMutation({
    mutationFn: (name: string) => UserAPI.postGyroConversationsNew(DUMMY_CREDENTIALS, { conversation_name: name }),
    onSuccess: (data, name) => requestNewChat({ name, uuid: data.uuid }),
  });

  const onSubmit = handleSubmit(({ name }) => {
    mutation.mutate(name);
    hideModal();
  });

  return <BasicModal header="New conversation name" modalRef={modalRef} className={styles.newChatModal}>
    <form onSubmit={onSubmit}>
      <input type="text" id={styles.newChatModalName} {...register('name', { required: true })} aria-label="Choose a name for the new conversation"/>
      <button>Let&apos;s go!</button>
    </form>
  </BasicModal>
}
