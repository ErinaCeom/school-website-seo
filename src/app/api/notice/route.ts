import { NextResponse } from "next/server";
import { getNotices } from "@/utils";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Getting query parameters
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "newest";
  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : 1;

  // Validating page parameter
  if (isNaN(page) || page < 1) {
    return NextResponse.json(
      { status: "error", error: "Invalid page number" },
      { status: 400 },
    );
  }

  try {
    // Using existing cached function
    const result = await getNotices({ category, sort, page });

    // Mapping utility function's return types to HTTP responses
    if (result.status === "error") {
      return NextResponse.json(
        { status: "error", error: result.error },
        { status: 500 },
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error(`Error fetching cached notices: ${err}`)
    return NextResponse.json(
      { status: "error", error: "Internal server error" },
      { status: 500 },
    );
  }
}

export type { NoticeFetchResult as NoticesAPIResponse } from "@/utils/getNotice";