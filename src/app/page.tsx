import {
  Box,
  Container,
  Stack,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import { Announcements, MapCard } from "@/components";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
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
            transform: { xs: "translateY(50%)", lg: "translateY(60%)" },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "3rem", md: "6rem", lg: "7rem" },
              fontFamily: "Forum",
            }}
          >
            St.Philip's High School & College
          </Typography>
          <Typography
            variant="h4"
            component="h2"
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

      {/* Other sections */}
      <Container maxWidth="xl" sx={{ my: 5 }}>
        {/*For spacing netween sections */}
        <Stack direction="column" spacing={{ md: 15 }} mb={10}>
          {/* About and Quote Section */}
          <Stack
            sx={{
              flexDirection: { xs: "column", md: "row" },
              gap: { md: 0 },
            }}
          >
            {/*About*/}
            <Stack
              direction="column"
              sx={{
                width: { md: "50%" },
                pr: 3,
                gap: 1,
                color: "white",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Forum, serif",
                  fontSize: { xs: "3rem", sm: "4rem", md: "6rem" },
                }}
              >
                About
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Forum, serif",
                  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                }}
              >
                St. Philip’s High School and College is a renowned educational
                institution located in Dinajpur, Bangladesh. The school was
                founded in 1951. The institution has a long-standing reputation
                for providing quality education to students at both the high
                school and college levels. St. Philip’s offers a wide range of
                academic programs, extracurricular activities, and sports
                programs to enhance the overall development of its students.
              </Typography>
              <Link
                href="/about"
                underline="always"
                color="#ffff"
                sx={{
                  fontStyle: "italic",
                  fontSize: { xs: "1rem", md: "1.2rem" },
                }}
              >
                Read More &gt;
              </Link>
            </Stack>

            {/*Quote*/}
            <Typography
              variant="h5"
              sx={{
                flexShrink: 0,
                flexGrow: 1,
                alignSelf: "center",
                fontFamily: "Forum, serif",
                fontSize: { sm: "2.5rem", md: "3rem" },
                textAlign: "center",
                pl: 2,
                my: 8,
              }}
            >
              "discipline is not just a rule,
              <br /> it's a culture of excellence"
            </Typography>
          </Stack>
          {/* Announcements */}
          <Announcements />
          {/* Contacts */}
          <Stack spacing={2} sx={{ flexDirection: { sm: "row" } }}>
            <Stack sx={{ flexGrow: 1, width: { sm: "10%", md: "50%" } }}>
              <Typography
                sx={{
                  fontFamily: "Forum, serif",
                  fontSize: { xs: "3rem", md: "4rem" },
                }}
              >
                Contact
              </Typography>
              <Typography
                component="a"
                href="mailto:spscdnj1951@gmail.com"
                sx={{ mt: { md: 1 }, fontSize: { xs: "1rem", md: "1.2rem" } }}
              >
                <EmailIcon fontSize="small" /> spscdnj1951@gmail.com
              </Typography>
              <Typography
                component="a"
                href="tel:0531-65460"
                sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
              >
                <PhoneIcon fontSize="small" /> 0531-65460
              </Typography>
            </Stack>
            <Stack
              sx={{
                flexGrow: 1,
                width: { sm: "auto", md: "50%" },
                pl: { md: 5,lg:15 },
              }}
            >
              <MapCard />
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
