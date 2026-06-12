import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { return_id, order_id, photo_urls } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Get the original order status from the return row
    const { data: returnRow } = await supabase
      .from("returns")
      .select("original_order_status")
      .eq("id", return_id)
      .single();

    const originalStatus = returnRow?.original_order_status || "fulfilled";

    // 2. Delete photos from storage
    if (photo_urls && photo_urls.length > 0) {
      const filePaths = photo_urls
        .map((url: string) => url.split("return-photos/")[1])
        .filter(Boolean);

      if (filePaths.length > 0) {
        await supabase.storage.from("return-photos").remove(filePaths);
      }
    }

    // 3. Delete the return row
    await supabase.from("returns").delete().eq("id", return_id);

    // 4. Restore the order to its original status
    await supabase
      .from("orders")
      .update({
        status: originalStatus,   // ⭐ restore EXACT previous status
        refund_id: null,
        refund_status: null,
        refunded_at: null,
        refunded_amount: null,
      })
      .eq("id", order_id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete route error:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
