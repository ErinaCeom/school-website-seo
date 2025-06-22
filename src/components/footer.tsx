import { Stack, Box, Grid, Typography, Link } from "@mui/material";
import Image from "next/image";

const links: string[] = [
  "http://www.educationboardresults.gov.bd/",
  "https://moedu.portal.gov.bd/",
  "https://dinajpureducationboard.gov.bd/",
  "https://banbeis.gov.bd/",
];

export default function Footer() {
  return (
    <Stack
      direction={{ xs: "column", md: "row", lg: "row" }}
      alignItems="center"
      gap={2}
      py={3}
    >
      <Box sx={{ width: { xs: "100%", md: "50%", xl: "50%" } }}>
        <Stack direction="row" justifyContent="space-around">
          {/* Quick Links */}
          <Grid container>
            <Grid size={{ xs: "auto", md: 12 }}>
              <Typography
                variant="h5"
                sx={{ fontFamily: "Forum", fontSize: { md: "3rem" }, mb: 2 }}
              >
                Quick links
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={0}>
                    {["About", "Faculty", "Notices", "Contact"].map((text) => (
                      <Link
                        key={text}
                        href={text}
                        underline="always"
                        color="inherit"
                        sx={{
                          fontSize: { md: "1.2rem" },
                          fontFamily: "Josefin Sans",
                        }}
                      >
                        {text}
                      </Link>
                    ))}
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={0}>
                    {["Section", "Facilities", "Events", "Alumni"].map(
                      (text) => (
                        <Link
                          key={text}
                          href={text}
                          underline="always"
                          color="inherit"
                          sx={{
                            fontSize: { md: "1.2rem" },
                            fontFamily: "Josefin Sans",
                          }}
                        >
                          {text}
                        </Link>
                      ),
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/*Useful links*/}
          <Grid container>
            <Grid size={{ xs: "auto", md: 12 }}>
              <Typography
                variant="h5"
                sx={{ fontFamily: "Forum", fontSize: { md: "3rem" }, mb: 2 }}
              >
                Useful links
              </Typography>
              <Stack spacing={0}>
                {[
                  "Education board",
                  "Ministry of education",
                  "Dinajpur education board",
                  "Banbeis",
                ].map((text, index) => (
                  <Link
                    key={text}
                    href={links[index]}
                    target="_blank"
                    underline="always"
                    color="inherit"
                    sx={{
                      fontSize: { md: "1.2rem" },
                      fontFamily: "Josefin Sans",
                    }}
                  >
                    {text}
                  </Link>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
      <Box sx={{ flexGrow: 1, alignSelf: "center" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Box
            sx={{
              position: "relative",
              width: {
                xs: 80,
                md: 100,
              },
              height: {
                xs: 80,
                md: 100,
              },
            }}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: {
                md: "1.5rem",
              },
              mt: 1,
            }}
          >
            St. Philip&apos;s High School &amp; College
          </Typography>
          <Typography
            sx={{
              color: "grey",
            }}
          >
          Copyright © 2023 All rights reserved
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
