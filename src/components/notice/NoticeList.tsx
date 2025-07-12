"use client";

import {
  Stack,
  Typography,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { formatDate } from "@/utils";

// Animations
const noticeVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 2.3,
      ease: "easeOut" as const,
    },
  },
};

type Notice = {
  id: string;
  title: string;
  category: string;
  date: string;
};

type Props = {
  notices: Notice[];
};

const NoticeList = ({ notices }: Props) => {
  return (
    <Stack spacing={3}>
      <AnimatePresence mode="wait">
        {notices.map((notice, index) => (
          <motion.div
            key={notice.id}
            custom={index}
            variants={noticeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Stack>
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
              <MuiLink
                component={Link}
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
              </MuiLink>
            </Stack>
          </motion.div>
        ))}
      </AnimatePresence>
    </Stack>
  );
};

export default NoticeList;
