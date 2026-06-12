import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("broadcast_drafts")
    .select("subject, content")
    .eq("id", 1)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({
      subject: "",
      contentHtml: "",
    });
  }

  return NextResponse.json({
    subject: data.subject || "",
    contentHtml: data.content || "",
  });
}
