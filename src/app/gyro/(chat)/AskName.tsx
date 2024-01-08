import { BasicModal } from '~/lib/components/modals/BasicModal';
import { ModalProps } from '~/lib/hooks/useModalState';
import { useChatCreationMediator } from '~/lib/gyro/contexts/CreateNewChatCtx';
import { useForm } from 'react-hook-form';
import s from './styles/AskName.module.scss';
import { useMutation } from '@tanstack/react-query';
import { UserAPI } from '~/generated';
import { DUMMY_CREDENTIALS } from '~/lib/prelude';
import { useRouter } from 'next/navigation';

export const AskName = ({ modalRef, hideModal }: ModalProps) => {
  const { requestNewChat } = useChatCreationMediator();
  const { register, handleSubmit } = useForm<{ name: string }>();
  const { push } = useRouter();

  const mutation = useMutation({
    mutationFn: (name: string) => UserAPI.postGyroConversationsNew(DUMMY_CREDENTIALS, { conversation_name: name }),
    onSuccess: (data, name) => {
      requestNewChat({ name, uuid: data.conversation_id });
      push(`/gyro?c=${data.conversation_id}`);
    },
  });

  const onSubmit = handleSubmit(({ name }) => {
    mutation.mutate(name);
    hideModal();
  });

  return <BasicModal header="New conversation name" modalRef={modalRef} className={s.newChatModal}>
    <form onSubmit={onSubmit} autoComplete="off">
      <input type="text" id={s.newChatModalName} {...register('name', { required: true })} aria-label="Choose a name for the new conversation" autoComplete="one-time-code"/>
      <button>Let&apos;s go!</button>
    </form>
  </BasicModal>
}
