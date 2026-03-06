import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './src/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect root to default locale
  if (pathname === '/') {
    const locale = request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] || 'es';
    const targetLocale = routing.locales.includes(locale as 'es' | 'en') ? locale : 'es';
    return NextResponse.redirect(new URL(`/${targetLocale}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(es|en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
