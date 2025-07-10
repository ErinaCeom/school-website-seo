// app/notice/page.tsx
import React from "react";
import { Metadata } from "next";
import {
  Container,
  Typography,
  Stack,
  Box,
  Link,
  Divider,
} from "@mui/material";
import { getNotices, getNoticeCount, formatDate } from "@/utils";
import ActionButtons from "@/components/notice/ActionButtons";
import PaginationWrapper from "@/components/notice/Pagination";

export const dynamic = "auto";
export const revalidate = 3600; // cached for 1 hour

export const metadata: Metadata = {
  title: "All Notices | SPSC",
  description:
    "Find all announcements and notices for different sections and dates.",
  keywords: [
    "school notices",
    "announcements",
    "all notices",
    "latest updates",
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
    url: "https://yoursite.com/notice", // Replace with your canonical URL
    siteName: "St.Philip's High School and College",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://yoursite.com/images/opengraph/Notice.png",
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
  searchParams?: Promise<{
    category?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const category = params?.category || "all";
  const sort = params?.sort || "newest";
  const page = parseInt(params?.page || "1", 10);

  // fetch notices
  const notices = await getNotices({ category, sort, page });
  const count = await getNoticeCount();

  const firstDate = notices?.[notices.length - 1]?.date;
  const lastDate = notices?.[0]?.date;
  const totalPages = Math.ceil((count || 0) / 10);

  return (
    <Container maxWidth="xl" sx={{ py: 10 }}>
      <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
        All announcements
      </Typography>
      <Typography sx={{ fontSize: "1.2rem", color: "grey", lineHeight: 1 }}>
        Find all the announcements for all section and dates
      </Typography>

      <Box sx={{ backgroundColor: "black", my: 2 }}>
        <ActionButtons />
      </Box>

      {/* Notice List */}
      <Stack spacing={3}>
        {notices.map((notice) => (
          <Stack key={notice.id}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}
            >
              <Typography color="grey">{formatDate(notice.date)}</Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  border: 3,
                  borderRadius: 8,
                  borderColor: "gray",
                  height: "1px",
                  alignSelf: "center",
                }}
              />
              <Typography color="grey">{notice.category}</Typography>
            </Stack>
            <Link
              href={`/notice/${notice.id}`}
              underline="always"
              color="inherit"
              sx={{
                fontSize: { md: "1.2rem" },
                fontFamily: "Josefin Sans",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                "&:active": {
                  color: "grey",
                },
                ":hover": {
                  color: "grey",
                },
              }}
            >
              {notice.title}
            </Link>
          </Stack>
        ))}
      </Stack>

      {/* Pagination */}
      {totalPages > 1 && (
        <Stack mt={6} alignItems="center">
          <Typography color="gray" fontSize="0.9rem" mb={2}>
            {formatDate(firstDate)} – {formatDate(lastDate)}
          </Typography>
          <PaginationWrapper page={page} totalPages={totalPages} />
        </Stack>
      )}
    </Container>
  );
}
