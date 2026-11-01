import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/set-password";
  if (!code) return NextResponse.redirect(new URL("/login?error=missing_code", url.origin));
  // The SSR client exchanges the PKCE code and stores the session in cookies.
  const { cookies } = await import("next/headers");
  const jar = await cookies();
  const { createServerClient } = await import("@supabase/ssr");
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => jar.getAll(),
      setAll: (items: any) => items.forEach(({ name, value, options }: any) => jar.set(name, value, options))
    }
  });
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL("/login?error=invite_failed", url.origin));
  return NextResponse.redirect(new URL(next, url.origin));
}
