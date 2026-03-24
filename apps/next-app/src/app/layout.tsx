import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Footer from './components/Footer';

const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || 'LinkShortener';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: `${PROJECT_NAME} - Home`,
  description: 'Make your links shorter',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen grid grid-rows-[1fr_auto]`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
