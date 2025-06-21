import { Box, Stack, Card, Typography, IconButton } from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import Link from "next/link";

export default function MapCard() {
  return (
    <Card
      sx={{
        width: { xs: "auto", md: "auto" },
        height: { xs: 250, md: 250 },
        position: "relative",
        borderRadius: { xs: 4, md: 8 },
        overflow: "hidden",
      }}
    >
      {/* Map Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("/images/location.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.95)",
          zIndex: 0,
        }}
      />

      {/* Bottom Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "40%",
          background: `linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)`,
          backdropFilter: "blur(0px)",
          zIndex: 1,
          px: 2,
          py: 2,
          display: "flex",
          flexDirection: "rows",
        }}
      >
        <Stack direction="column" alignSelf="center" spacing={1}>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            Our campus location
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, lineHeight: 1 }}
          >
            Visit our campus for a tour
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <MyLocationIcon fontSize="small" />
            <Typography variant="subtitle2">Kasba, Dinajpur</Typography>
          </Stack>
        </Stack>
        {/* Share Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexGrow: 1,
            alignSelf: "center",
            mt: 3,
          }}
        >
          <IconButton
            component={Link}
            href="https://maps.app.goo.gl/eNvdyqkNLMrBnFBo9?g_st=ac"
            target="_blank"
            sx={{
              color: "black",
              backgroundColor: "white",
              borderRadius: 3,
              boxShadow: 2,
              zIndex: 2,
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
              "&:active": {
                boxShadow: 0,
                transform: "scale(0.95)",
              },
            }}
          >
            <DirectionsIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
