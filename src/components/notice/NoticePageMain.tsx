"use client";
import { useSearchParams } from "next/navigation";
import { Box, Stack, Typography, Skeleton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import type { NoticeFetchResult } from "@/utils/getNotice";

// Dynamic imports
const ActionButton = dynamic(() => import("./ActionButtons"));
const NoticeList = dynamic(() => import("./NoticeList"));
const PaginationWrapper = dynamic(() => import("./actionButtons/Pagination"));

// Animation variants
const skeletonVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: "easeOut" as const,
    },
  }),
};

export default function NoticePageMain({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const [notices, setNotices] = useState<NoticeFetchResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Get current state directly from URL
  const page = parseInt(searchParams.get("page") || "1", 10);
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "newest";

  // fetch notices
  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          category,
          sort,
          page: page.toString(),
        });
        const response = await fetch(`/api/notice?${params.toString()}`);

        if (!response.ok) {
          console.log(`HTTP error! status: ${response.status}`);
        }

        const data: NoticeFetchResult = await response.json();
        setNotices(data);
      } catch (error) {
        setNotices({
          status: "error",
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [page, category, sort]);

  const firstDate =
    notices?.status === "success"
      ? String(notices.data[notices.data.length - 1]?.date)
      : "";
  const lastDate =
    notices?.status === "success" ? String(notices.data[0]?.date) : "";

  return (
    <>
      <Box sx={{ my: 2 }}>
        <ActionButton />
      </Box>

      {/* Loading state */}
      {loading && (
        <Stack spacing={3}>
          <AnimatePresence mode="wait">
            {Array.from({ length: 10 }).map((_, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={skeletonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Skeleton variant="text" width={80} height={24} />
                    <Skeleton variant="text" width={60} height={24} />
                  </Stack>
                  <Skeleton width="100%" height={32} />
                  <Skeleton variant="text" width="70%" height={32} />
                </Stack>
              </motion.div>
            ))}
          </AnimatePresence>
        </Stack>
      )}

      {/* Notice list */}
      {!loading && notices && (
        <Stack>
          {notices.status === "error" && (
            <Typography color="error">{notices.error}</Typography>
          )}
          {notices.status === "empty" && (
            <Typography>No notices found.</Typography>
          )}
          {notices.status === "success" && (
            <NoticeList notices={notices.data} />
          )}
        </Stack>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Stack mt={6} alignItems="center">
          <PaginationWrapper
            totalPages={totalPages}
            firstDate={firstDate}
            lastDate={lastDate}
            page={page}
          />
        </Stack>
      )}
    </>
  );
}
