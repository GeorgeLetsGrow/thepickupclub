import { createClient } from '@/utils/supabase/middleware';

export async function middleware(request) {
  const { supabase, response } = createClient(request);
  if (supabase) {
    await supabase.auth.getUser().catch(() => null);
  }
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
