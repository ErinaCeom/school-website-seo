// components/PaginationWrapper.tsx
"use client";

import { Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationWrapper({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(value));
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={handleChange}
      variant="outlined"
      shape="rounded"
      color="primary"
      size="large"
    />
  );
}
