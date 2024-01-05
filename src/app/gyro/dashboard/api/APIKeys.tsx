'use client'

import styles from '~/app/gyro/dashboard/api/page.module.scss';
import { mono } from '~/app/fonts';
import { useHideState } from '~/lib/hooks/useHideState';
import clsx from 'clsx';

interface APIKey {
  name: string,
  uuid: string,
  prefix: string,
  scopes: string[],
  lastUsed?: Date,
  expiresAt: Date,
  createdAt: Date,
}

export const APIKeys = () => {
  return keys.map(key => <APIKey key={key.uuid} apikey={key}/>);
}

const APIKey = ({ apikey: key }: { apikey: APIKey }) =>
  <tr className={styles.tableRow}>
    <td>{key.name}</td>
    <Prefix prefix={key.prefix}/>
    <Scopes scopes={key.scopes}/>
    <td>{formatDate(key.createdAt)}</td>
    <td>{formatDate(key.lastUsed)}</td>
    <td>{formatDate(key.expiresAt)}</td>
    <td>
      <button className={styles.tableDeleteBtn} aria-label={`Revoke key ${key.name}`}>Revoke</button>
    </td>
  </tr>

const Scopes = ({ scopes }: { scopes: string[] }) =>
  <td>{
    (scopes.length > 1)
      ? <HiddenScopes scopes={scopes}/>
      : scopes[0]
  }</td>

const HiddenScopes = ({ scopes }: { scopes: string[] }) => {
  const { shown, toggleShown, action } = useHideState();

  return <div className={styles.hiddenScopes}>
    <button onClick={toggleShown} aria-label={`${action} all scopes`}>
      {action} all({scopes.length})
    </button>
    {shown &&
      <ul>
        {scopes.map(scope => <li key={scope}>{scope}</li>)}
      </ul>}
  </div>
}

const Prefix = ({ prefix }: { prefix: string }) => {
  const { shown, toggleShown, action } = useHideState();

  return <td className={clsx(styles.hiddenPrefix, shown && styles.showPrefix)}>
    <span className={mono.className}>{shown ? prefix : '•••••••••'}</span>
    <button onClick={toggleShown} aria-label={`${action} key prefix`}/>
  </td>;
}

const formatDate = (date?: Date) => {
  return date?.toDateString()?.substring(4) ?? '-';
}

const keys: APIKey[] = [
  {
    name: 'metrics-4-smth',
    uuid: '1',
    prefix: 'czx023nd7',
    scopes: ['inst.metrics'],
    expiresAt: new Date('2023-11-26 12:00:00.0 UTC'),
    createdAt: new Date('2021-11-26 12:00:00.0 UTC'),
  },
  {
    name: 'no-privacy-4-u',
    uuid: '2',
    prefix: '25c433x63',
    scopes: ['chat.history'],
    lastUsed: new Date('1970-1-1 12:00:00.0 UTC'),
    expiresAt: new Date('2023-11-26 12:00:00.0 UTC'),
    createdAt: new Date('2021-11-26 12:00:00.0 UTC'),
  },
  {
    name: 'god-key-time',
    uuid: '3',
    prefix: 'x34780nty',
    scopes: ['inst.metrics', 'chat.history'],
    lastUsed: new Date('3023-11-26 12:00:00.0 UTC'),
    expiresAt: new Date('2023-11-26 12:00:00.0 UTC'),
    createdAt: new Date('2021-11-26 12:00:00.0 UTC'),
  },
  {
    name: 'no-privacy-4-u',
    uuid: '4',
    prefix: '25c433x63',
    scopes: ['chat.history'],
    lastUsed: new Date('1970-1-1 12:00:00.0 UTC'),
    expiresAt: new Date('2023-11-26 12:00:00.0 UTC'),
    createdAt: new Date('2021-11-26 12:00:00.0 UTC'),
  },
]
