import styles from './page.module.scss';
import Link from 'next/link';

interface APIKey {
  name: string;
  prefix: string;
  scopes: string[];
  lastUsed?: Date;
  expiresAt: Date;
}

const keys = [
  {
    name: 'metrics-4-smth',
    prefix: 'czx023nd7',
    scopes: ['inst.metrics'],
    expiresAt: new Date('2023-11-26 12:00:00.0 UTC'),
  },
  {
    name: 'no-privacy-4-u',
    prefix: '25c433x63',
    scopes: ['chat.history'],
    lastUsed: new Date('1970-1-1 12:00:00.0 UTC'),
    expiresAt: new Date('2023-11-26 12:00:00.0 UTC'),
  },
  {
    name: 'god-key-time',
    prefix: 'x34780nty',
    scopes: ['inst.metrics', 'chat.history'],
    lastUsed: new Date('3023-11-26 12:00:00.0 UTC'),
    expiresAt: new Date('2023-11-26 12:00:00.0 UTC'),
  },
]

const Page = () =>
  <article>
    <header className={styles.header}>
      <h1>API Keys</h1>
      <button/>
    </header>
    <section className={styles.about}>
      <p>This is a list of API keys which allow you to integrate Gyro into your own applications. You can see all the available endpoints and their required scopes at <Link href={'../endpoints'}>Endpoints</Link>.</p>
      <p>Be sure to keep your keys secret and delete any which you do not recognize.</p>
    </section>
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
        <tr className={styles.tableHeaderRow}>
          <th scope="col">Key</th>
          <th scope="col">Prefix</th>
          <th scope="col">Scopes</th>
          <th scope="col">Last used</th>
          <th scope="col">Expires at</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <APIKeys/>
        </tbody>
      </table>
    </div>
  </article>

const APIKeys = () => {
  return keys.map(key => <APIKey key={key.name} apikey={key}/>);
}

const APIKey = ({ apikey: key }: { apikey: APIKey }) => {
  const scopes = (key.scopes.length > 1)
    ? <button className={styles.tableScopeBtn}>view all ({key.scopes.length})</button>
    : key.scopes[0];

  return <tr className={styles.tableRow}>
    <td>{key.name}</td>
    <td>{key.prefix}</td>
    <td>{scopes}</td>
    <td>{formatDate(key.lastUsed)}</td>
    <td>{formatDate(key.expiresAt)}</td>
    <td>
      <button className={styles.tableDeleteBtn}>Revoke</button>
    </td>
  </tr>;
}

const formatDate = (date?: Date) => {
  return date?.toDateString()?.substring(4) ?? '-';
}

export default Page;
