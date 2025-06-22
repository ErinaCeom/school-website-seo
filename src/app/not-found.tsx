// app/not-found.tsx
import { Button, Typography, Container } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        transition: "height 0.2s" // dvh makes layout shifts on mobile so adding this for smooth effect lol
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontFamily: "Forum, serif", lineHeight: 0.6 }}
      >
        404
      </Typography>
      <Typography>Page not found</Typography>
      <Button
        variant="outlined"
        component={Link}
        href="/"
        sx={{ borderColor: "white", color: "white",m:2 }}
      >
        Go Home
      </Button>
    </Container>
  );
}
