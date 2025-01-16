import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const forwardedHost = req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
  const origin = req.headers.get('origin') || 'https://animated-eureka-x595r7xx7rg6hpg7p-3000.app.github.dev/';

  // Normalizar os valores dos cabeçalhos
  const normalizedForwardedHost = forwardedHost.replace(/^https?:\/\//, '');
  const normalizedOrigin = origin.replace(/^https?:\/\//, '');

  console.log('normalizedForwardedHost:', normalizedForwardedHost);
  console.log('normalizedOrigin:', normalizedOrigin);

  if (normalizedForwardedHost !== normalizedOrigin) {
    res.headers.set('X-Forwarded-Host', normalizedOrigin);
  }

  return res;
}
