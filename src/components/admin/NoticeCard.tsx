import React from "react";
import { formatDate } from "@/utils";
import {
  Stack,
  Typography,
  Divider,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";

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

type NoticeType = {
  id: string;
  date: string;
  category: string;
  title: string;
  selected?: boolean;
  selectMode?: boolean;
  onSelect?: (id: string) => void;
};

export default function NoticeCard({
  id,
  date,
  category,
  title,
  selected = false,
  selectMode = false,
  onSelect,
}: NoticeType) {
  return (
    <Card sx={{ bgcolor: selected ? "#383d54" : "#111014", my: 1 }}>
      <CardActionArea
        onClick={() => {
          if (selectMode && onSelect) onSelect(id);
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}
          >
            <Typography color="grey">{formatDate(date)}</Typography>
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
            <Typography color="grey">{category}</Typography>
          </Stack>
          <Typography
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
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
