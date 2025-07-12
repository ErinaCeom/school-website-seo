/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
//had to do this because of type error on line 31

import { supabase } from "@/lib/supabaseClient";
import { unstable_cache } from "next/cache";

const PAGE_SIZE = 10;

type NoticeFetchResult =
  | { status: "success"; data: Notice[] }
  | { status: "empty" }
  | { status: "error"; error: string };

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

  if (error) {
    return { status: "error", error: error.message } as const;
  }

  if (!data || data.length === 0) {
    return { status: "empty" } as const;
  }

  return { status: "success", data } as const;
}

const cacheNotices = unstable_cache(
  _getNotices,
  (category: string, sort: string, page: number) => [
    "notices",
    category,
    sort,
    String(page),
  ],
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
  ([category = "all"]) => ["notice-count", category],
  {
    revalidate: 3600,
    tags: ["notices"],
  },
);

export type { NoticeFetchResult };