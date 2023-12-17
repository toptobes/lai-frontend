import styles from './page.module.scss';
import { JobsList } from '~/app/(landing)/careers/JobList';

const Page = () => {
  return <>
    <div className={styles.bg}>
      <div className={styles.bgSpot1}/>
    </div>
    <main id={styles.main}>
      <article>
        <header>
          <h1 className={styles.slogan}>Be a part of our future<br/>Be a part of <em>the</em> future</h1>
        </header>
        <h2>Why us?</h2>
        <p>Because who the hell else is hiring rn lol</p>
      </article>
      <section>
        <h2>Positions:</h2>
        <div className={styles.hrPurple}/>
        <JobsList/>
      </section>
    </main>
  </>;
};

export default Page;
