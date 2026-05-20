import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

/**
 * Root page handler that acts as a fallback redirect.
 * If the middleware is bypassed or doesn't run for the root path,
 * this component will detect the preferred language from the 'accept-language'
 * header and redirect to either /es or /en accordingly.
 */
export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';

  // If Spanish is the preferred language, redirect to /es
  if (acceptLanguage.toLowerCase().includes('es')) {
    redirect('/es');
  }

  // Otherwise, default to English (/en)
  redirect('/en');
}
