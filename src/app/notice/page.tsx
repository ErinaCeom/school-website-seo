// app/notice/page.tsx

import React from "react";
import { Metadata } from "next";
import { Container, Typography } from "@mui/material";
import { getNoticeCount } from "@/utils";
import NoticePageMain from "@/components/notice/NoticePageMain";

export const metadata: Metadata = {
  title: "All Notices | SPSC",
  description:
    "Find all announcements and notices for different sections and dates.",
  keywords: [
    "school notices",
    "announcements",
    "all notices",
    "latest updates",
    "Search notices",
  ],
  authors: [{ name: "St.Philip's High school and College" }],
  creator: "St.Philip's High School and College",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "All Notices | St.Philip's High School and College",
    description: "Stay updated with the latest announcements and notices.",
    url: `${process.env.NEXT_PUBLIC_URL}/notice`,
    siteName: "St.Philip's High School and College",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/opengraph/notice.png",
        width: 1200,
        height: 630,
        alt: "All Notices Banner",
      },
    ],
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params?.category || "all";
  // Only fetch count on server (for pagination)
  const count = await getNoticeCount(category);
  const totalPages = Math.ceil((count || 0) / 10);

  return (
    <Container maxWidth="xl" sx={{ py: 10 }}>
      {/* SSR Content for SEO */}
      <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
        All announcements
      </Typography>
      <Typography sx={{ fontSize: "1.2rem", color: "grey", lineHeight: 1 }}>
        Find all the announcements for all sections and dates
      </Typography>

      {/* Client-side components */}
      <NoticePageMain totalPages={totalPages} />
    </Container>
  );
}