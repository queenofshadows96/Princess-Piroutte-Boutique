import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
      .from("orders")
      .update({
        status: "fulfilled",
        fulfilled_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (error) {
      console.error("Fulfill error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fulfill order" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Fulfill route error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
