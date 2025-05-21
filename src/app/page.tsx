import { Box, Container, Button} from "@mui/material";
import NavDrawer from "@/components/NavDrawer";

export default function Home() {
  return (
    <Box>
      <NavDrawer />
      <Container>
        <Button>Open</Button>
      </Container>
    </Box>
  );
}
