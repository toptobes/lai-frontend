import styles from './page.module.scss';
import Link from 'next/link';
import { mono } from '~/app/fonts';
import { APIKeys } from './APIKeys';

const Page = () =>
  <article>
    <header className={styles.header}>
      <h1>API Keys</h1>
      <button/>
    </header>
    <section className={styles.about}>
      <p>This is a list of API keys which allow you to integrate Gyro into your own applications. You can see all the available endpoints and their required scopes at <Link href={'./endpoints'}>Endpoints</Link>.</p>
      <p>Be sure to keep your keys secret and delete any which you do not recognize.</p>
    </section>
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeaderRow}>
            <th scope="col">Key</th>
            <th scope="col">Prefix</th>
            <th scope="col">Scopes</th>
            <th scope="col">Created at</th>
            <th scope="col">Last used</th>
            <th scope="col">Expires at</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className={mono.className}>
          <APIKeys/>
        </tbody>
      </table>
    </div>
  </article>

export default Page;
