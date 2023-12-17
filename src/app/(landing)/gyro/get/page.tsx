import styles from './page.module.scss';
import { nunito, openSans } from '~/app/fonts';
import clsx from 'clsx';
import Link from 'next/link';

interface Plan {
  title: string,
  price: string,
  per: string,
  action: string,
  disclaimer?: string,
  href: string,
  perks: {
    desc: string,
    title?: string,
  }[],
}

const plans: Plan[] = [
  {
    title: 'Basic',
    price: '0.99',
    per: 'mo',
    action: 'Get started',
    href: '',
    perks: [
      {
        desc: 'Access to Gyro',
      },
      {
        desc: '5GB document storage',
      },
      {
        desc: 'LindauerAI support',
      },
      {
        desc: 'Python haunts your nightmares',
      },
    ],
  },
  {
    title: 'Professional',
    price: '9.99',
    per: 'mo',
    action: 'Get started',
    disclaimer: '*only files uploaded during a professional subscription can be downloaded',
    href: '',
    perks: [
      {
        desc: 'Access to Gyro',
      },
      {
        desc: '20GB document storage',
      },
      {
        desc: 'Ability to download your\ndocuments*',
      },
      {
        desc: 'Priority support',
      },
      {
        desc: 'LindauerAI CEO stops stealing\nyour socks',
      },
    ]
  },
  {
    title: 'Institutional',
    price: '200',
    per: 'mo + per-user fee',
    action: 'Let\'s talk.',
    href: '/gyro/get/institutional',
    perks: [
      {
        desc: 'All pro features for\ndemonstration purposes',
        title: 'Institutional admins and teachers will have access to Pro features for demonstration purposes. Per-student features depends on plan.',
      },
      {
        desc: 'Access to institutional\nmetrics and rankings',
        title: 'Includes various metrics and rankings for the institution, including honesty rate, subject interest, and more.',
      },
      {
        desc: 'Access to public Gyro API',
        title: 'Includes Gyro history for all students, as well as the ability to access metrics, rankings, and more.'
      },
      {
        desc: 'Discounted bulk user pricing',
      },
    ]
  }
];

const Page = () => <>
  <div className={styles.bg}>
    <div className={styles.bgSpot1}/>
    <div className={styles.bgSpot2}/>
  </div>
  <main id={styles.main}>
    <header className={styles.slogan}>
      <h2>
        <mark>Accelerate</mark> your learning<br/>with <mark>Gyro</mark> by your side.
      </h2>
    </header>
    <section className={styles.cards}>{
      plans.map((plan, i) => <Card key={plan.title} plan={plan} idx={i}/>)
    }</section>
  </main>
</>;

const Card = ({ plan, idx }: { plan: Plan, idx: number }) =>
  <article className={clsx(styles['card__' + idx], nunito.className)}>
    <header>
      <h1 className={openSans.className}>{plan.title}</h1>
      <h2><span>$</span><span>{plan.price}</span><span>/{plan.per}</span></h2>
    </header>
    <ul>{
      plan.perks.map(perk => <li key={perk.desc}>
        {perk.desc}
        {perk.title && <i title={perk.title}/>}
      </li>)
    }</ul>
    <footer>
      <Link href={plan.href}>{plan.action}</Link>
      <p>{plan.disclaimer}</p>
    </footer>
  </article>

export default Page;
