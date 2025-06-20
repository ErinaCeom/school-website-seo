import { Stack, Box, Grid, Typography, Link } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  return (
    <Stack
      direction={{ xs: "column", lg: "row", xl:"row" }}
      gap={2}
    >
      <Box sx={{ flexGrow: 0 }}>
        <Stack direction="row" justifyContent="space-around">
          {/* Quick Links */}
          <Grid container>
            <Grid size={{ xs: "auto", sm: 6, md: 6 }}>
              <Typography variant="h5" sx={{ fontFamily: "Forum", mb: 2 }}>
                Quick links
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={0}>
                    {["About", "Faculty", "Notices", "Contact"].map((text) => (
                      <Link
                        key={text}
                        href="#"
                        underline="always"
                        color="inherit"
                        sx={{ fontSize: "small", fontFamily: "Josefin Sans" }}
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
                          href="#"
                          underline="always"
                          color="inherit"
                          sx={{ fontSize: "small", fontFamily: "Josefin Sans" }}
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
            <Grid size={{ xs: "auto", sm: 6, md: 6 }}>
              <Typography variant="h5" sx={{ fontFamily: "Forum", mb: 2 }}>
                Useful links
              </Typography>
              <Stack spacing={0}>
                {[
                  "Education board",
                  "Ministry of education",
                  "Dinajpur education board",
                  "Banbeis",
                ].map((text) => (
                  <Link
                    key={text}
                    href="#"
                    underline="always"
                    color="inherit"
                    sx={{ fontSize: "small", fontFamily: "Josefin Sans" }}
                  >
                    {text}
                  </Link>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
      <Box sx={{ flexGrow: 0 }}>
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
      </Box>
    </Stack>
  );
}
