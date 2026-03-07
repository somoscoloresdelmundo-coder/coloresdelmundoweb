import type { ReactNode } from 'react';
import { Inter, Poppins } from 'next/font/google';
import { SmoothScroll } from '@/components/providers';
import './globals.css';

// Fuentes optimizadas
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

// Root layout - provides base HTML structure
// Locale-specific content is handled in [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
