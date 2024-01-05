import { Fira_Sans, JetBrains_Mono, Nunito, Open_Sans } from 'next/font/google';

export const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

export const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
});
