import { Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      pb={3}
    >
      <Image src="/logo.png" alt="Logo" width={50} height={50} />
      <Typography>
        Copyright © 2023 <br /> St. Philip&apos;s High School &amp; College
      </Typography>
    </Stack>
  );
}
