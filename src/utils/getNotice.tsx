// utils/getNotices.ts
import { supabase } from "@/lib/supabaseClient";

const PAGE_SIZE = 10;

export default async function getNotices({
  category = "all",
  sort = "newest",
  page = 1,
}: {
  category?: string;
  sort?: string;
  page?: number;
}) {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("Notice")
    .select("id, title, date, category")
    .order("date", { ascending: !(sort === "newest") })
    .range(from, to);

  if (category !== "all") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getNoticeCount(category = "all") {
  let query = supabase
    .from("Notice")
    .select("*", { count: "exact", head: true });

  if (category !== "all") {
    query = query.eq("category", category);
  }

  const { count, error } = await query;
  if (error) throw error;
  return count || 0;
}
