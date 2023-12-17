import styles from './page.module.scss';

const job = {
  title: 'Natural Language Processing Engineer',
  place: 'Remote',
  hours: 'Full-time',
}

const Page = () => <>
  <div className={styles.bg}/>
  <main>
    <article id={styles.article}>
      <header>
        <h1>{job.title}</h1>
        <section>
          <span id={styles.place}>{job.place}</span>
          <span id={styles.hours}>{job.hours}</span>
        </section>
      </header>
      <h2>About our company:</h2>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      <h2>About this role:</h2>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      <h2>Responsibilities</h2>
      <ul>
        <li>Responsibility 1</li>
        <li>Responsibility 2</li>
        <li>Responsibility 3</li>
        <li>Responsibility 4</li>
      </ul><h2>Desired Qualifications</h2>
      <ul>
        <li>Qualification 1</li>
        <li>Qualification 2</li>
        <li>Qualification 3</li>
        <li>Qualification 4</li>
      </ul>
      <h2>Apply now by contacting <a href="mailto:careers@lindauerai.com">careers@lindauerai.com</a></h2>
      <p>If you think you match one the description above, please reach out to us with your resume and why you&apos;re interested in the position.</p>
    </article>
  </main>
</>;

export default Page;
