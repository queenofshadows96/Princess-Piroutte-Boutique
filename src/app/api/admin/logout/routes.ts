import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req: Request) {
  const res = NextResponse.json({ success: true });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.headers.get("cookie") ?? "";
        },
        set(name, value, options) {
          res.cookies.set(name, value, options);
        },
        remove(name, options) {
          res.cookies.delete(name, options);
        },
      },
    }
  );

  await supabase.auth.signOut();

  return res;
}
