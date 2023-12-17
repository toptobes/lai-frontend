import { Metadata } from 'next'
import React from 'react';
import Providers from '~/app/providers';
import { openSans } from '~/app/fonts';
import '~/styles/main.scss';

export const metadata: Metadata = {
  title: 'LindauerAI',
}

const Root = ({ children }: { children: React.ReactNode }) =>
  <html lang="en" suppressHydrationWarning>
  <body className={openSans.className}>
    <Providers>{children}</Providers>
  </body>
  </html>

export default Root;
