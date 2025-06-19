import {
  Box,
  Container,
  Stack,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import { NavDrawer } from "@/components/";

export default function Home() {
  return (
    <>
      <NavDrawer titleName="SPSC" logoSrc="/logo.png" />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{
          backgroundImage:
            "linear-gradient(to top,rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1)), url(/images/spsc.jpg)",
          backgroundSize: "cover", //{ xl: "70%", lg: "80%", xs: "cover" },
          backgroundPosition: "50% 30%",
        }}
      >
        <Stack
          direction="column"
          alignSelf={"center"}
          textAlign={"center"}
          sx={{
            gap: { xs: 3, md: 5, lg: 5 },
            transform: { xs: "translateY(50%)", lg: "translateY(50%)" },
          }}
        >
          <Typography
            variant="h1"
            color="white"
            sx={{
              fontSize: { xs: "3rem", md: "6rem", lg: "7rem" },
              fontFamily: "Forum",
            }}
          >
            St.Philip's High School & College
          </Typography>
          <Typography
            variant="h4"
            color="white"
            sx={{
              fontSize: { xs: "1rem", md: "2rem", lg: "2rem" },
              fontFamily: "Forum",
            }}
          >
            'Educating heart and mind'{" "}
          </Typography>
        </Stack>
        <Divider
          orientation="vertical"
          sx={{
            height: { xs: "300px", lg: "300px" },
            backgroundColor: "#fff",
            width: "1px",
            my: 2,
            transform: {
              xs: "translateY(40%)",
              md: "translateY(60%)",
              lg: "translateY(60%)",
            },
          }}
        />
      </Box>
      <Container sx={{ bgcolor: "black", my: 5 }}>
        <Stack direction="column" sx={{ gap: 1, color: "white" }} >
          <Typography variant="h1" sx={{fontFamily: "Forum, serif", fontSize: { xs: "3rem",  }
          }}>About</Typography>
          <Typography sx={{fontFamily: "Forum, serif",fontSize: { xs: "1rem",  }}}>
            St. Philip’s High School and College is a renowned educational
            institution located in Dinajpur, Bangladesh. The school was founded
            in 1951. The institution has a long-standing reputation for
            providing quality education to students at both the high school and
            college levels. St. Philip’s offers a wide range of academic
            programs, extracurricular activities, and sports programs to enhance
            the overall development of its students.
          </Typography>
          <Link
            href="/about"
            underline="always"
            color="#ffff"
            sx={{ fontStyle: "italic",fontSize:"small" }}
          >
            Read More >
          </Link>
        </Stack>
      </Container>
    </>
  );
}
