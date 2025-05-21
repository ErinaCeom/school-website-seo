import { Box, Container, Button} from "@mui/material";
import { ProductCard, NavDrawer } from "../components";

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
