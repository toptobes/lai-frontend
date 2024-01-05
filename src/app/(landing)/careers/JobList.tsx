'use client';

import styles from './page.module.scss';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { SiteAPI } from '~/generated';

export const JobsList = () => {
  const query = useQuery({
    queryKey: ['jobs'],
    queryFn: SiteAPI.getCareers,
  })

  if (!query.data) {
    return <div>loading...</div>
  }

  const jobs = query.data.jobs;

  return <ul id={styles.jobs}>{
    jobs.map((job, i) => <>
      <li key={job.id}>
        <span>{job.title_short}, {job.location}</span>
        <Link href={`/careers/${job.id}`}>apply</Link>
      </li>
      {i < jobs.length - 1 &&
        <div className={styles.hrGray}/>}
    </>)
  }</ul>;
}
