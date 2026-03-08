import type { ReactNode } from 'react';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

// Fuentes optimizadas con subset reducido
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
});

// Root layout - provides base HTML structure
// Locale-specific content is handled in [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col antialiased scroll-smooth">
        {children}
      </body>
    </html>
  );
}
