import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    heading: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    heading?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    heading: true;
  }
}

const baseTheme = createTheme();

const theme = createTheme({
  typography: {
    fontFamily: "Josefin Sans, sans-serif", // default
    heading: { ...baseTheme.typography.h5, fontFamily: "Forum, serif" },
  },
});

export default theme;
