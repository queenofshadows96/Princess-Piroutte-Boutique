import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("products")
    .select("id, name, weight_oz, length_in, width_in, height_in");

  if (error) return NextResponse.json([]);

  const missing = data.filter(
    p =>
      !p.weight_oz ||
      !p.length_in ||
      !p.width_in ||
      !p.height_in
  );

  return NextResponse.json(missing);
}
