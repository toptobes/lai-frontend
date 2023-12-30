'use client';

import styles from './ChatbotMenu.module.scss';
import clsx from 'clsx';
import { Dispatch, MouseEventHandler, Suspense, useReducer, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Action, State, UsedDoc } from './ChatbotMenu-types';
import { defaultState, processConvosDTO, processDocsDTO, reducer } from './ChatbotMenu-logic';
import { fakeConversations, fakeDocuments } from './ChatbotMenu-fakes';
import { useQuery } from '@tanstack/react-query';
import { after } from '~/lib/prelude';
import { WithContainerRef } from '~/components/gyro/Sidebar';
import { nunito } from '~/app/fonts';

export const ChatbotMenu = ({ containerRef }: WithContainerRef) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return <>
    <Suspense>
      <Conversations state={state} dispatch={dispatch} containerRef={containerRef}/>
    </Suspense>
    <ChatSettings state={state}/>
  </>
}

interface ConversationsProps extends WithContainerRef {
  dispatch: Dispatch<Action>,
  state: State,
}

const useCurrentChat = () => {
  return useSearchParams().get("c") || undefined;
}

const Conversations = ({ state, dispatch, containerRef }: ConversationsProps) => {
  const savedScrollTop = useRef(0);

  const conversations = useQuery({
    queryKey: ['conversations'],
    queryFn: after(0, fakeConversations),
  });

  const { push } = useRouter();
  const currentChatID = useCurrentChat();

  if (!conversations.data) return null;
  const groups = processConvosDTO(conversations.data);

  return groups.map(([date, conversations], si) => (
    <div key={date} style={state.sectionStyle(si)} className={styles.dateGroup}>
      <h5>{date}</h5>
      <ul>{
        conversations.map((conversation, li) => {
          const isSelected = conversation.ord === state.selected?.ord;

          const className = clsx(
            styles.dateGroupContent,
            conversation.uuid == currentChatID && styles.menuUlCurrent,
            isSelected && styles.selected,
          );

          const toggleMenuMode = () => dispatch({ action: 'toggle', selected: conversation, conversations: groups });

          const onSettingsClick: MouseEventHandler<HTMLButtonElement> = (e) => {
            e.stopPropagation();
            savedScrollTop.current = containerRef.current!.scrollTop;
            containerRef.current!.scrollTop = 0;
            toggleMenuMode();
          }

          const onListClick = isSelected
            ? () => {
              containerRef.current!.scrollTop = savedScrollTop.current;
              toggleMenuMode();
            }
            : () => push(`/gyro?c=${conversation.uuid}`, { scroll: false });

          return <li key={conversation.name}>
            <div tabIndex={0} style={state.listElemStyle(si, li)} onClick={onListClick} onKeyDown={onListClick}
                 className={className} role="button">
              <span>{conversation.name}</span>
              <button onClick={onSettingsClick} className={styles.dateGroupSettingsButton}/>
            </div>
          </li>
        })
      }</ul>
    </div>
  ));
}

const ChatSettings = ({ state }: { state: State }) => {
  if (!state.selected) return null;

  return <>
    <section className={styles.chatSettings}>
      <h5>Chat settings</h5>
      <div>
        <button id={styles.renameChat} aria-label="Rename this chat"></button>
        <button id={styles.deleteChat} aria-label="Delete this chat"></button>
      </div>
      <Documents id={state.selected.uuid}/>
    </section>
    <section className={styles.uploadDoc}>
      <button id={styles.uploadDocButton}/>
      <div>
        <label htmlFor={styles.uploadDocButton}>upload, drag, or paste<br/>any text or document here<br/><span>(.txt, .pdf, .docx, etc.)</span></label>
      </div>
    </section>
  </>
}

const Documents = ({ id }: { id: string }) => {
  const query = useQuery({
    queryKey: ['documents', id],
    queryFn: after(0, fakeDocuments),
  });

  const numUploaded = query.data?.documents?.length ?? '...';
  const documents = processDocsDTO(query.data ?? {});

  return <>
    <h5>{numUploaded} documents uploaded</h5>
    <ul>{
      documents.map(doc => <Document doc={doc} key={doc.name}/>)
    }</ul>
  </>
}

const Document = ({ doc }: { doc: UsedDoc }) =>
  <li className={styles.chatSettingsDocument}>
    <span>{doc.name}</span>
    <i id={styles.placeholderDots} aria-hidden/>
    <button id={styles.downloadDoc} aria-label="Download the document if plan allows" disabled/>
    <button id={styles.infoDoc} aria-label="See more info about the document"/>
    <button id={styles.deleteDoc} aria-label="Delete the document"/>
  </li>
