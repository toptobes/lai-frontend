import { Metadata } from 'next'
import Providers from '~/app/providers';
import { openSans } from '~/app/fonts';
import '~/styles/main.scss';
import { Kids } from '~/lib/prelude';

export const metadata: Metadata = {
  title: 'LindauerAI',
}

const Root = ({ children }: Kids) =>
  <html lang="en" suppressHydrationWarning>
  <body className={openSans.className}>
    <Providers>{children}</Providers>
  </body>
  </html>

export default Root;
