import {
  Conversation,
  ConversationGroup,
  GroupConvos,
  GroupName,
  HistoryAction,
  HistoryState,
  UsedDoc
} from './ChatbotMenu.types';
import { Action, io, snd } from '~/lib/prelude';
import { WithContainerRef } from '~/app/gyro/Sidebar';
import styles from './ChatbotMenu.module.scss';
import type { FetchConvos } from '~/generated/models/FetchConvos';
import type { FetchDocs } from '~/generated/models/FetchDocs';

export const defaultState = (ref: WithContainerRef['containerRef']): HistoryState => ({
  ...defaultSelection,
  containerRef: ref,
  savedScrollTop: 0,
  ioActions: io.pure,
});

const defaultSelection = {
  selected: undefined,
  listElemStyle: () => ({ animation: 'none' }),
  sectionStyle: () => ({ animation: 'none' }),
}

export const reducer = (state: HistoryState, action: HistoryAction): HistoryState => {
  switch (action.action) {
    case 'toggle-settings': {
      return (state.selected === undefined)
        ? enableSettings(action.conversation, state)
        : disableSettings(state);
    }

    case 'set-msgs': {
      return {
        ...state,
        groups: action.groups,
      };
    }

    case 'new-chat': {
      if (!state.groups) {
        return state;
      }

      const groups = mkNewGroups(action, state.groups);

      const ioActions = io.once((dispatch) => {
        state.containerRef.current?.scrollTo({ top: -state.containerRef.current!.scrollTop, behavior: 'smooth' })

        setTimeout(() => {
          dispatch({ action: 'reset-msg-animations' });
        }, 500);
      });

      return {
        ...state,
        ...calcShiftStyles(state),
        ioActions,
        groups,
      };
    }

    case 'reset-msg-animations': {
      return {
        ...state,
        ...defaultSelection,
      };
    }

    case 'set-name': {
      const groups = state.groups!.map<ConversationGroup>(([date, convos]) => (
        [date, convos.map(c => c.uuid === action.on.uuid ? { ...c, name: action.newName } : c)]
      ));

      const selected = (state.selected?.uuid === action.on.uuid)
        ? { ...state.selected, name: action.newName }
        : state.selected;

      return {
        ...state,
        selected,
        groups,
      };
    }
  }
}

const enableSettings = (convo: Conversation, state: HistoryState) => {
  const savedScrollTop = state.containerRef.current!.scrollTop;

  const ioActions = io.once(() => {
    state.containerRef.current!.scrollTop = 0;
  });

  return {
    ...state,
    ...calcHideStyles(convo, state.groups!),
    selected: convo,
    savedScrollTop,
    ioActions,
  };
}

const disableSettings = (state: HistoryState) => {
  const savedScrollTop = 0;

  const ioActions = io.once(() => {
    state.containerRef.current!.scrollTop = state.savedScrollTop;
  });

  return {
    ...state,
    ...defaultSelection,
    savedScrollTop,
    ioActions,
  };
}

export const slideOffLeft = ({
  transform: `translateX(-40rem)`,
});

const slideOffTopLeft = (y: number) => ({
  transform: `translate(-40rem, -${y}rem)`,
});

const slideOffTop = (y: number) => ({
  transform: `translateY(-${y}rem)`,
});

const calcHideStyles = (selected: Conversation, groups: ConversationGroup[]) => {
  const selectedOrd = selected.ord;
  const groupConvos = groups.map(snd);

  const selectedGroupIdx = groupConvos.findIndex(h => h[0].ord <= selectedOrd && selectedOrd <= h.at(-1)!.ord);
  const selectedGroup = groupConvos[selectedGroupIdx];

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

  return { sectionStyle, listElemStyle };
}

const mkNewGroups = (action: Action<HistoryAction, 'new-chat'>, groups: ConversationGroup[]) => {
  const incedGroups: ConversationGroup[] = groups.map(([date, convos]) => (
    [date, convos.map(c => ({ ...c, ord: c.ord + 1 }))]
  ));

  const isToday = incedGroups[0]?.[GroupName] === 'Today';

  const newConvo = {
    name: action.name,
    uuid: action.name,
    date: 'Today',
    ord: 0,
  }

  const today = (isToday)
    ? [newConvo, ...incedGroups[0][GroupConvos]]
    : [newConvo];

  return [
    ['Today', today] as ConversationGroup,
    ...incedGroups.slice(isToday ? 1 : 0)
  ];
}

const fadeIn = ({
  animation: `${styles.conversationAppear} 1s forwards`,
});

const slideFromUp = (y: number) => ({
  '--height': `-${y}rem`,
  animation: `${styles.slideFromUp} 0.5s ease-in-out forwards`,
});

const calcShiftStyles = (state: HistoryState) => {
  const isToday = state.groups?.[0]?.[GroupName] === 'Today'

  const sectionStyle = (si: number) =>
    (isToday && si === 0)
      ? undefined :
    (isToday)
      ? slideFromUp(3.60) :
    (!isToday && si === 0)
      ? fadeIn
      : slideFromUp(5.35);

  const listElemStyle = (si: number, li: number) =>
    (isToday && si === 0 && li === 0)
      ? fadeIn :
    (isToday && si === 0)
      ? slideFromUp(3.60)
      : undefined;

  return { sectionStyle, listElemStyle };
}

export const processConvosDTO = (convoDTOs: FetchConvos): ConversationGroup[] => {
  const convos = convoDTOs.conversations.map((c, i) => ({
    uuid: c.conversation_id,
    name: c.name,
    date: dateToTimePeriod(c.last_used),
    ord: i,
  }));

  return convos.alistGroupBy(c => c.date);
}

export const processDocsDTO = (docsDTO: FetchDocs): UsedDoc[] => {
  if (docsDTO.documents === undefined) {
    return [];
  }

  return docsDTO.documents.map(d => ({
    name: d.source_name,
    size: formatBytes(d.file_size),
    link: d.download_link || undefined,
  }));
}

const dateToTimePeriod = (dateStr: string): string => {
  const date = new Date(dateStr);
  const days = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 3600 * 24));
  return daysToTimePeriod(days, date);
}

const daysToTimePeriod = (days: number, date: Date): string =>
  (days === 0)
    ? 'Today' :
  (days === 1)
    ? 'Yesterday' :
  (days < 7)
    ? 'Past 7 days' :
  (days < 31)
    ? 'Past 30 days' :
  (days < 365)
    ? 'Last ' + date.toLocaleString('default', { month: 'long' })
    : date.toLocaleString('default', { year: 'numeric' });

const formatBytes = (bytes: number, precision = 2) => {
  if (bytes === 0) {
    return '0B';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const unitIdx = ~~(Math.log(bytes) / Math.log(1024));

  const scaledBytes = bytes / (1024 ** unitIdx);
  return scaledBytes.toFixed(precision) + units[unitIdx];
}
