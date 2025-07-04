// All notices page
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
import { LoadMoreBtn } from "@/components/";
import ActionButtons from "@/components/notice/ActionButtons";

import { getNotice } from "@/utils";

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
    url: "https://1725c8f9-17ed-4275-a6b6-f1d9ce3f0f9a-00-tawpiv14ujl3.sisko.replit.dev/notices",
    siteName: "St.Philip's High School and College",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://1725c8f9-17ed-4275-a6b6-f1d9ce3f0f9a-00-tawpiv14ujl3.sisko.replit.dev/images/opengraph/Notice.png",
        width: 1200,
        height: 630,
        alt: "All Notices Banner",
      },
    ],
  },
};

export default async function Notice({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; limit?: string; sort?: string }>;
}) {
  const { category, sort, limit } = await searchParams;
  const limitNum = parseInt(limit || "10"); // default limit is 10
  const notices = await getNotice(category, sort);
  const renderedNotices = notices.slice(0, limitNum);
  const hasMore = notices.length > renderedNotices.length;

  return (
    <Container
      maxWidth="xl"
      sx={{ height: { xs: "max-content", md: "100vh" }, py: 10, border: 0 }}
    >
      <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
        All announcements
      </Typography>
      <Typography sx={{ fontSize: "1.2rem", color: "grey", lineHeight: 1 }}>
        Find all the announcements for all section and dates
      </Typography>

      {/* Action buttons */}
      <Box sx={{ backgroundColor: "black", my: 2 }}>
        <ActionButtons />
      </Box>

      {/* Notice list */}
      <Stack spacing={3}>
        {renderedNotices.map((notice, i) => {
          return (
            <Stack key={i}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}
              >
                <Typography color="grey">
                  {new Date(notice.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Typography>
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
                href="#"
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
                }}
              >
                {notice.title}
              </Link>
            </Stack>
          );
        })}
      </Stack>
      {hasMore && <LoadMoreBtn />}
    </Container>
  );
}
