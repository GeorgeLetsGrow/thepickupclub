import { Oswald, Inter } from 'next/font/google';
import { AuthGate } from '@/components/AuthGate';
import { PwaRegistrar } from '@/components/PwaRegistrar';
import './globals.css';

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata = {
  title: 'The PickUp Club',
  description: 'Find, host, and manage local pickup baseball games.',
  applicationName: 'The PickUp Club',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'PickUp Club',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: '/icons/icon.svg',
    apple: '/icons/apple-touch-icon.svg',
  },
};

export const viewport = {
  themeColor: '#111827',
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body>
        <PwaRegistrar />
        <AuthGate>{children}</AuthGate>
      </body>
    </html>
  );
}
