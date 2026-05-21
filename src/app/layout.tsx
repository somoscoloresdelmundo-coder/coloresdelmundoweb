import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { SITE } from '@/config/constants';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.URL),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
