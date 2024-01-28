import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/modules/QueryProvider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Beautiful Todos',
  description: 'A dead simple todo app that helps you get things done.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="flex min-h-screen w-full flex-col items-center justify-between p-8 lg:p-24">
            {children}
            <Toaster />
          </main>
        </body>
      </html>
    </QueryProvider>
  );
}
