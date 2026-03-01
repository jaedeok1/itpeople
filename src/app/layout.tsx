import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { Navbar } from '@/components/layout/navbar';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'IT인들의 놀이터',
  description: 'IT 전문가들을 위한 네트워킹, 지식 공유, 사이드 프로젝트 매칭 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="ko">
      <body className={`${geistSans.variable} antialiased bg-gray-50 dark:bg-gray-900`}>
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
