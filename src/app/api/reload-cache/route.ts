import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { supabaseServerClient } from "@/lib/supabaseServer";

export async function GET() {
  const supabase = await supabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  //revalidate cache
  revalidateTag("notices");

  return NextResponse.json(
    { success: true, message: `Cache reloaded successfilly` },
    { status: 200 },
  );
}
