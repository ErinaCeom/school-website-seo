import { Box, Container, Typography } from "@mui/material";
import NavDrawer from "@/components/NavDrawer";

export default function Home() {
  return (
    <>
      <NavDrawer titleName="SPSC" logoSrc="/logo.png"/>
      <Box>
        <Container>
          <Typography variant="h3" color="white">
            St.Philip's High School and College
          </Typography>
        </Container>
      </Box>
    </>
  );
}
