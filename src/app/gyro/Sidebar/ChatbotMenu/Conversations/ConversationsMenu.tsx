import { Conversation, HistoryProps, } from '~/app/gyro/Sidebar/ChatbotMenu/ChatbotMenu.types';
import { processConvosDTO, slideOffLeft } from '~/app/gyro/Sidebar/ChatbotMenu/ChatbotMenu.logic';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Requester } from '~/lib/hooks/useMediator';
import { InitRenameArgs, MaybeRenamerDoneArgsWithCleanup } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/Renamer';
import { AllGroups } from '~/app/gyro/Sidebar/ChatbotMenu/Conversations/AllGroups';
import s from './styles/ConversationsMenu.module.scss';
import { useCurrentConvo } from '~/lib/gyro/hooks/useCurrentConvo';
import { useQuery } from '@tanstack/react-query';
import { UserAPI } from '~/generated';
import { DUMMY_CREDENTIALS } from '~/lib/prelude';
import { useConvoFocuser } from '~/lib/gyro/contexts/ChatInputRefCtx';
import { useSidebarLock } from '~/lib/gyro/contexts/SidebarLockCtx';

export interface ConversationsProps extends HistoryProps {
  renamer: Requester<InitRenameArgs, MaybeRenamerDoneArgsWithCleanup>
}

export const ConversationsMenu = ({ state, dispatch, ...props }: ConversationsProps) => {
  const currentID = useCurrentConvo();

  const { data: groups } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => UserAPI.getGyroConversations(DUMMY_CREDENTIALS).then(processConvosDTO),
  });

  useEffect(() => {
    groups && dispatch({ action: 'set-msgs', groups })
  }, [dispatch, groups]);

  const { setNoOpen } = useSidebarLock();
  setNoOpen(state.groups === undefined || state.groups.length === 0);

  if (!state.groups) {
    return <Loading/>
  }

  if (state.groups.length === 0) {
    return <NoConvosFound/>
  }

  return <>
    <AllGroups state={state} dispatch={dispatch} currentID={currentID} {...props}/>
    <NewChat selected={state.selected}/>
  </>;
}

const NewChat = ({ selected }: { selected?: Conversation }) => {
  const { push } = useRouter();

  return <button
    className={s.newChatBtn}
    onClick={() => push('/gyro')}
    style={selected && slideOffLeft}
    aria-label="Create a new chat"
  />;
}

const Loading = () =>
  <div className={s.loadingWrapper}>
    <h4>loading...</h4>
  </div>

const NoConvosFound = () => {
  const { focusInput, focusing } = useConvoFocuser();

  return <div className={s.noConvoWrapper}>
    <h4>No conversations found.</h4>
    <button onClick={focusInput} disabled={focusing}>Let&apos;s start one?</button>
  </div>;
}
