import {
  Action,
  ConversationGroup,
  ConversationsDTO,
  State,
  UsedDoc,
  UsedDocsDTO
} from './ChatbotMenu-types';
import { snd } from '~/lib/prelude';

export const defaultState: State = {
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

export const reducer = (state: State, action: Action): State => {
  switch (action.action) {
    case 'toggle':
      if (state.selected !== undefined) {
        return defaultState;
      }

      const selectedOrd = action.selected.ord;
      const groups = action.conversations.map(snd);

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

export const processConvosDTO = (convoDTOs: ConversationsDTO): ConversationGroup[] => {
  const convos = convoDTOs.conversations.map((c, i) => ({
    uuid: c.uuid!,
    name: c.name!,
    date: dateToTimePeriod(c.last_used!),
    ord: i,
  }));

  return convos.alistGroupBy(c => c.date);
}

export const processDocsDTO = (docsDTO: UsedDocsDTO): UsedDoc[] => {
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
  const date = new Date(dateStr + 'UTC');
  const days = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 3600 * 24));
  return daysToTimePeriod(days, date);
}

// TODO: make this more robust (e.g. handle leap years)
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
