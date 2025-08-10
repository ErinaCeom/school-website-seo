// middleware.ts
//from supabase ssr documentation
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/updateSession";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/admin/:path+"], // applies only to subdirectories of /admin
};
