import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("photos") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ urls: [] });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const urls: string[] = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("return-photos")
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
          { error: "Upload failed", details: error.message },
          { status: 500 }
        );
      }

      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/return-photos/${fileName}`;
      urls.push(publicUrl);
    }

    return NextResponse.json({ urls });
  } catch (err) {
    console.error("Unexpected upload error:", err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
