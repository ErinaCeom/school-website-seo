// app/notice/page.tsx

// This page is for displaying all notices
// It has a hybrid setup with SSR and CSR
// SSR for page SEO and CSR for dynamic content
import React from "react";
import { Metadata } from "next";
import { Container, Typography } from "@mui/material";
import { getNoticeCount } from "@/utils";
import NoticePageMain from "@/components/notice/NoticePageMain";

export const metadata: Metadata = {
  title: "All Notices | Saint Philip's high School and College",
  description:
    "Find all announcements and notices for different sections and dates.",
  keywords: [
    "school notices",
    "announcements",
    "all notices",
    "latest updates",
    "Search notices",
    "spsc notices",
    "spsc announcements",
    "spsc updates",
    "dinajpur school notices",
    "dinajpur school list",
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
  // Only fetch count(cached) on server (for pagination)
  const count = await getNoticeCount(category);
  const totalPages = Math.ceil((count || 0) / 10);

  return (
    <Container maxWidth="xl" sx={{ py: 10 }}>
      {/* SSR Content for SEO */}
      <Typography component="h1" sx={{ fontSize: "2rem", fontWeight: "bold" }}>
        All announcements
      </Typography>
      <Typography component="h2" sx={{ fontSize: "1.2rem", color: "grey", lineHeight: 1 }}>
        Find all the announcements for all sections and dates
      </Typography>

      {/* Client-side components (notice lists,action buttons) */}
      <NoticePageMain totalPages={totalPages} />
    </Container>
  );
}
