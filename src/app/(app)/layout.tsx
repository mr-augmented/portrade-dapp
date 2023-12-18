import { METADATA } from '@/modules/app/constants/app';
import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import HomeLayout from '@/modules/app/layouts/home.layout';
import DappProvider from '@/modules/app/providers/dapp.provider';
import NotificationProvider from '@/modules/app/providers/notification.provider';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: METADATA.title,
  description: METADATA.description,
};

interface IRootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: IRootLayoutProps) {
  return (
    <html lang='en'>
      <Head>
        <link rel='preload' as='image' href='images/connect.png'></link>
        <link rel='preload' as='image' href='images/loading.png'></link>
        <link rel='preload' as='image' href='images/logo.png'></link>
        <link rel='preload' as='image' href='images/mint.png'></link>
        <link rel='preload' as='image' href='images/sad.png'></link>
        <link rel='preload' as='image' href='images/success.png'></link>
        <link rel='preload' as='image' href='images/logos/coinbase.png'></link>
        <link rel='preload' as='image' href='images/logos/metamask.png'></link>
      </Head>
      <body className={inter.className}>
        <NotificationProvider>
          <DappProvider>
            <HomeLayout>{children}</HomeLayout>
          </DappProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
