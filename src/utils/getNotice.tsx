import { supabase } from "@/lib/supabaseClient";
import { unstable_cache } from "next/cache";

const PAGE_SIZE = 10;

// Internal function for fetching (not cached directly)
async function _getNotices(category: string, sort: string, page: number) {
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

// Cached data
const cacheNotices = unstable_cache(
  async (
    category: string = "all",
    sort: string = "newest",
    page: number = 1,
  ) => {
    console.log("Fetching and caching notices from DB");
    return _getNotices(category, sort, page);
  },
  (
    category: string = "all",
    sort: string = "newest",
    page: number = 1,
  ): string[] => {
    return ["notices", category, sort, page.toString()];
  },
  {
    revalidate: 3600,
    tags: ["notices"],
  },
);

type NoticeParams = {
  category?: string;
  sort?: string;
  page?: number;
};

export default function getNotices({
  category = "all",
  sort = "newest",
  page = 1,
}: NoticeParams) {
  return cacheNotices(category, sort, page);
}

// Internal count fetch
async function _getNoticeCount(category: string) {
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

// Cached wrapper
export const getNoticeCount = unstable_cache(
  async (category = "all") => {
    return _getNoticeCount(category);
  },
  // Cache key
  ([category = "all"]) => ["notice-count", category],
  {
    revalidate: 3600,
    tags: ["notices"],
  },
);
