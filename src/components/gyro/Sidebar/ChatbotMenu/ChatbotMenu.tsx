'use client';

import styles from './ChatbotMenu.module.scss';
import { flip, listedGroupBy, snd } from '~/prelude';
import clsx from 'clsx';
import { CSSProperties, Dispatch, MouseEventHandler, Suspense, useContext, useReducer } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface ChatHistory {
  name: string,
  date: string,
  ord: number,
}

interface Document {
  name: string,
}

type FullChatHistory = [string, ChatHistory[]][];

type Action =
  | { action: 'toggle', selected: ChatHistory, history: FullChatHistory }

interface State {
  selected: ChatHistory | undefined,
  listElemStyle: (si: number, li: number) => (CSSProperties | undefined),
  sectionStyle: (si: number) => (CSSProperties | undefined),
}

const defaultState: State = {
  selected: undefined,
  listElemStyle: () => undefined,
  sectionStyle: () => undefined,
}

const slideOffLeft = ({
  transform: `translateX(-40rem)`,
});

const slideOffTopLeft = (y: number) => ({
  transform: `translate(-40rem, -${y}rem)`,
});

const slideOffTop = (y: number) => ({
  transform: `translateY(-${y}rem)`,
});

const reducer = (state: State, action: Action): State => {
  switch (action.action) {
    case 'toggle':
      if (state.selected !== undefined) {
        return defaultState;
      }

      const selectedOrd = action.selected.ord;
      const groups = action.history.map(snd);

      const selectedGroupIdx = groups.findIndex(h => h[0].ord <= selectedOrd && selectedOrd <= h.at(-1)!.ord);
      const selectedGroup = groups[selectedGroupIdx];

      const beforeGroupTop = (selectedGroupIdx * 1.75) + (selectedGroup[0].ord * 3.6);
      const inGroupTop = (selectedOrd === selectedGroup[0].ord)
        ? 0
        : 1.75 + (selectedOrd - selectedGroup[0].ord) * 3.6;

      const sectionStyle = (si: number) =>
        (si > selectedGroupIdx)
          ? slideOffTopLeft(beforeGroupTop) :
        (si === selectedGroupIdx)
          ? slideOffTop(beforeGroupTop)
          : slideOffTop(beforeGroupTop + inGroupTop);

      const listElemStyles = selectedGroup
        .span(c => c.ord < selectedOrd)
        .flatMap((group, i) => {
          const isBefore = (i === 0);

          return group.map((_, isNotSelected) =>
            isBefore
              ? slideOffTop(inGroupTop) :
            isNotSelected
              ? slideOffLeft
              : slideOffTop(inGroupTop - 1.75)
          );
        });

      const listElemStyle = (si: number, li: number) => (si === selectedGroupIdx)
        ? listElemStyles[li]
        : undefined;

      return {
        selected: action.selected,
        listElemStyle,
        sectionStyle,
      };
  }
}

export const ChatbotMenu = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return <>
    <Suspense>
      <ChatHistory state={state} dispatch={dispatch}/>
    </Suspense>
    <ChatSettings state={state}/>
  </>
}

interface ChatHistoryProps {
  dispatch: Dispatch<Action>,
  state: State,
}

const useCurrentChat = () => {
  const params = useSearchParams().get("c");
  const toNum = Number(params);

  return (isNaN(toNum))
    ? undefined
    : toNum;
}

const ChatHistory = ({ state, dispatch }: ChatHistoryProps) => {
  const chatHistory = useChatHistory();
  const { push } = useRouter();
  const currentChatID = useCurrentChat();

  return chatHistory.map(([date, chats], si) => (
    <div key={date} style={state.sectionStyle(si)} className={styles.dateGroup}>
      <h5>{date}</h5>
      <ul>{
        chats.map((chat, li) => {
          const isSelected = chat.ord === state.selected?.ord;

          const className = clsx(
            styles.dateGroupContent,
            chat.ord == currentChatID && styles.current,
            isSelected && styles.selected,
          );

          const toggleMenuMode = () => dispatch({ action: 'toggle', selected: chat, history: chatHistory });

          const onSettingsClick: MouseEventHandler<HTMLButtonElement> = (e) => {
            e.stopPropagation();
            toggleMenuMode();
          }

          const onListClick = isSelected
            ? toggleMenuMode
            : () => push(`/gyro?c=${chat.ord}`, { scroll: false });

          return <li key={chat.name}>
            <div tabIndex={0} style={state.listElemStyle(si, li)} onClick={onListClick} onKeyDown={onListClick} className={className} role="button">
              <span>{chat.name}</span>
              <button onClick={onSettingsClick} className={styles.dateGroupSettingsButton}/>
            </div>
          </li>
        })
      }</ul>
    </div>
  ));
}

const ChatSettings = ({ state }: { state: State }) => {
  const documents = useDocuments();

  return <section className={clsx(state.selected && styles.chatSettings, !state.selected && styles.chatSettingsHidden)}>
    <h5>Chat settings</h5>
    <div>
      <button id={styles.renameChat} aria-label="Rename this chat"></button>
      <button id={styles.deleteChat} aria-label="Delete this chat"></button>
    </div>
    <h5>{documents.length} documents uploaded</h5>
    <ul>{
      documents.map(doc =>
        <li key={doc.name} className={styles.chatSettingsDocument}>
          <span>{doc.name}</span>
          <i id={styles.placeholderDots} aria-hidden/>
          <button id={styles.downloadDoc} aria-label="Download the document if plan allows" disabled/>
          <button id={styles.infoDoc} aria-label="See more info about the document"/>
          <button id={styles.deleteDoc} aria-label="Delete the document"/>
        </li>
      )
    }</ul>
  </section>
}

const useChatHistory = (): FullChatHistory => flip(listedGroupBy)(c => c.date, [
  {
    name: '*Intro music*',
    date: 'overmorrow',
  },
  {
    name: '*More intro music*',
    date: 'tomorrow',
  },
  {
    name: 'Never gonna give you up',
    date: 'today',
  },
  {
    name: 'Never gonna let you down',
    date: 'today',
  },
  {
    name: 'Never gonna run around',
    date: 'today',
  },
  {
    name: 'and desert you!',
    date: 'yesterday',
  },
  {
    name: 'and desert you!',
    date: 'jan 1970',
  },
].map((o, i) => ({ ...o, ord: i })));

const useDocuments = (): Document[] => [
  {
    name: 'why_python_sucks.pdf',
  },
  {
    name: 'why_haskell_rules.docx',
  },
  {
    name: 'why_Im_about_2_get_fired.txt',
  },
];
