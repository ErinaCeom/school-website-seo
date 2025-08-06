import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { supabaseServerClient } from "@/lib/supabaseServer";

export async function DELETE(request: NextRequest) {
  //validating authentication
  const supabase = await supabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  //check queries
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing required parameter: id" },
      { status: 400 },
    );
  }

  //perform deletion
  const { data: deletedRows, error: deleteError } = await supabase
    .from("Notice")
    .delete()
    .eq("id", id)
    .select();

  if (deleteError) {
    return NextResponse.json(
      { error: "Deletion failed", details: deleteError.message },
      { status: 500 },
    );
  }

  if (!deletedRows || deletedRows.length === 0) {
    return NextResponse.json(
      { error: `Notice #${id} not found` },
      { status: 404 },
    );
  }

  //revalidate cache
  revalidateTag("notices");
  revalidatePath(`/notice/${id}`);

  return NextResponse.json(
    { success: true, message: `Notice #${id} deleted successfully` },
    { status: 200 },
  );
}
