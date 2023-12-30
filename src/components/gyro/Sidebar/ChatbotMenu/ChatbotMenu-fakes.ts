import { ConversationsDTO, UsedDocsDTO } from './ChatbotMenu-types';
import { fakeUUIDv4 } from '~/lib/prelude';

export const fakeConversations = (): ConversationsDTO => ({
  conversations: [
    {
      name: '*Intro music*',
      uuid: "10000000-1000-4000-8000-100000000000",
      last_used: formatDate(new Date()),
    },
    {
      name: '*More intro music*',
      uuid: "10000000-1000-4000-8000-100000000001",
      last_used: formatDate(new Date(Date.now() - 86400000)),
    },
    {
      name: 'Never gonna give you up',
      uuid: "10000000-1000-4000-8000-100000000002",
      last_used: formatDate(new Date(Date.now() - 86400000 * 2)),
    },
    {
      name: 'Never gonna let you down',
      uuid: "10000000-1000-4000-8000-100000000003",
      last_used: formatDate(new Date(Date.now() - 86400000 * 2)),
    },
    {
      name: 'Never gonna run around',
      uuid: "10000000-1000-4000-8000-100000000004",
      last_used: formatDate(new Date(Date.now() - 86400000 * 2)),
    },
    {
      name: 'and desert you!',
      uuid: "10000000-1000-4000-8000-100000000005",
      last_used: formatDate(new Date(Date.now() - 86400000 * 100)),
    },
    {
      name: '*Even more intro music for some reason*',
      uuid: "10000000-1000-4000-8000-100000000006",
      last_used: formatDate(new Date(Date.now() - 86400000 * 1000)),
    },
  ]
});

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const fakeDocuments = (): UsedDocsDTO => ({
  documents: [
    {
      source_name: 'why_python_sucks.pdf',
      file_size: 325190213,
      download_link: '',
    },
    {
      source_name: 'why_haskell_rules.docx',
      file_size: 1235,
      download_link: '',
    },
    {
      source_name: 'why_Im_about_2_get_fired.txt',
      file_size: 646236123,
      download_link: '',
    },
  ]
});
