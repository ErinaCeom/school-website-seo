// components/Pagination.tsx
"use client";

import { Pagination, Typography, Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDate } from "@/utils";

export default function PaginationWrapper({
  page,
  totalPages,
  firstDate,
  lastDate,
}: {
  page: number;
  totalPages: number;
  firstDate: string;
  lastDate: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(value));
    router.push(`?${params.toString()}`);
  };

  return (
    <Stack spacing={1} sx={{ justifyContent: "center", alignItems: "center", }}>
      <Typography color="gray" fontSize="0.9rem" mb={2}>
        {formatDate(firstDate)} – {formatDate(lastDate)}
      </Typography>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        color="primary"
        size="large"
      />
    </Stack>
  );
}
