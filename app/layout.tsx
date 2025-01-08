import './globals.css';
import type { Metadata } from 'next';
import { mono } from './fonts';

export const metadata: Metadata = {
  title: 'AI Avatar Creator',
  description: 'Create stunning AI-powered avatars',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${mono.variable} font-mono antialiased`}>{children}</body>
    </html>
  );
}