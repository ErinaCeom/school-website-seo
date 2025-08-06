"use client";

import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Container,
  Stack,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import DashboardActions from "@/components/admin/DashboardActions";
import NoticeCard from "@/components/admin/NoticeCard";
import DialogueBox from "@/components/admin/DialogueBox";
import SnackbarAlert from "@/components/admin/SnackbarAlert";
import useNotices, { Notice } from "@/lib/useNotice";

const INITIAL_OFFSET = 0;
const LIMIT = 10;
const NOTICE_VARIANTS = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Dashboard() {
  const router = useRouter();
  const {
    notices,
    selectedIds,
    selectMode,
    loading,
    deleting,
    fetchError,
    hasMore,
    toggleSelect,
    enterSelectMode,
    exitSelectMode,
    deleteNotices,
    fetchMoreNotices,
  } = useNotices(INITIAL_OFFSET, LIMIT);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const handleDelete = useCallback(() => {
    if (selectedIds.length > 0) openDialog();
  }, [selectedIds]);

  const confirmDelete = useCallback(async () => {
    try {
      await deleteNotices(selectedIds);
      setSnackbar({
        open: true,
        message: `${selectedIds.length} notice${selectedIds.length > 1 ? "s" : ""} deleted successfully`,
        severity: "success",
      });
      closeDialog();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : "Deletion failed",
        severity: "error",
      });
    }
  }, [selectedIds, deleteNotices]);

  const closeSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Header />

      {loading && notices.length === 0 && (
        <Stack alignItems="center" mt={3}>
          <CircularProgress size={30} />
        </Stack>
      )}

      <NoticeList
        notices={notices}
        selectedIds={selectedIds}
        selectMode={selectMode}
        loading={loading}
        hasMore={hasMore}
        fetchError={fetchError}
        onToggleSelect={toggleSelect}
        onFetchMore={fetchMoreNotices}
      />

      <DashboardActions
        selectMode={selectMode}
        selectedCount={selectedIds.length}
        onAdd={() => router.push("/admin/dashboard/create")}
        onSelect={enterSelectMode}
        onDelete={handleDelete}
        onCancel={exitSelectMode}
        deleting={deleting}
      />

      <DialogueBox
        open={dialogOpen}
        title="Confirm Delete"
        content={`Are you sure you want to delete ${selectedIds.length} notice${selectedIds.length > 1 ? "s" : ""}?`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
        onClose={closeDialog}
        onConfirm={confirmDelete}
        confirmDisabled={deleting}
        confirmProgress={deleting}
      />

      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </Container>
  );
}

// Extracted Components
const Header = () => (
  <Stack spacing={1} mb={2}>
    <Typography variant="h4">Dashboard</Typography>
    <Typography variant="body1">View and manage all notices here.</Typography>
  </Stack>
);

interface NoticeListProps {
  notices: Notice[];
  selectedIds: string[];
  selectMode: boolean;
  loading: boolean;
  hasMore: boolean;
  fetchError: string | null;
  onToggleSelect: (id: string) => void;
  onFetchMore: () => void;
}

const NoticeList = React.memo(
  ({
    notices,
    selectedIds,
    selectMode,
    loading,
    hasMore,
    fetchError,
    onToggleSelect,
    onFetchMore,
  }: NoticeListProps) => (
    <InfiniteScroll
      dataLength={notices.length}
      next={onFetchMore}
      hasMore={hasMore}
      loader={loading && <Loader />}
      endMessage={<EndMessage noticeCount={notices.length} />}
      scrollThreshold="100px"
      style={{ overflow: "visible" }}
    >
      <AnimatePresence>
        {notices.map((item, index) => (
          <motion.div
            key={item.id}
            custom={index}
            variants={NOTICE_VARIANTS}
            initial="hidden"
            animate="visible"
            layout
          >
            <NoticeCard
              {...item}
              selected={selectedIds.includes(item.id)}
              selectMode={selectMode}
              onSelect={onToggleSelect}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {fetchError && <ErrorDisplay error={fetchError} onRetry={onFetchMore} />}
    </InfiniteScroll>
  ),
);

NoticeList.displayName = "NoticeList";

const Loader = () => (
  <Stack alignItems="center" mt={2}>
    <CircularProgress size={24} />
  </Stack>
);

const EndMessage = ({ noticeCount }: { noticeCount: number }) => (
  <Typography color="grey" align="center" mt={2}>
    {noticeCount === 0 ? "No notices found" : "No more to show"}
  </Typography>
);

const ErrorDisplay = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => (
  <Stack alignItems="center" mt={2}>
    <Typography color="error">{error}</Typography>
    <Button variant="outlined" onClick={onRetry} sx={{ mt: 1 }}>
      Retry
    </Button>
  </Stack>
);
