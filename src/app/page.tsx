import { Box, Container, Typography } from "@mui/material";
import NavDrawer from "@/components/NavDrawer";

export default function Home() {
  return (
    <>
      <NavDrawer titleName="SPSC" logoSrc="/logo.png"/>
      <Container>
        <Box p={3}>
          <Typography variant="h3" color="white">
            Home
          </Typography>
        </Box>
      </Container>
    </>
  );
}
