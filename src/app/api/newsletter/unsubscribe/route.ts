import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Missing unsubscribe token." },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Find subscriber by token
    const { data: subscriber, error: findError } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("unsubscribe_token", token)
      .single();

    if (findError || !subscriber) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired unsubscribe link." },
        { status: 404 }
      );
    }

    // Mark as unsubscribed
    const { error: updateError } = await supabase
      .from("newsletter_subscribers")
      .update({ unsubscribed: true })
      .eq("unsubscribe_token", token);

    if (updateError) {
      return NextResponse.json(
        { success: false, message: "Failed to unsubscribe." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "You have been unsubscribed.",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Unexpected server error." },
      { status: 500 }
    );
  }
}
