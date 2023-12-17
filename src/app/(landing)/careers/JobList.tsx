'use client';

import styles from './page.module.scss';
import Link from 'next/link';

export const JobsList = () =>
  <ul id={styles.jobs}>{jobs.map((job, i) => <>
      <li key={job.id}>
        <span>{job.title}, {job.location}</span>
        <Link href={`/careers/${job.id}`}>apply</Link>
      </li>
      {i < jobs.length - 1 && <div className={styles.hrGray}/>}
  </>)}</ul>

const jobs = [
  {
    title: 'NLP Engineer',
    location: 'Remote',
    id: 0,
  },
  {
    title: '~~Sock Stealer~~ nvm taken',
    location: 'CEO\'s house',
    id: 1,
  },
  {
    title: 'Idk insert something here',
    location: 'Idk-ville',
    id: 2,
  },
]
