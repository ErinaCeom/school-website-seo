import { Stack, Box, Grid, Typography, Link } from "@mui/material";
import { supabase } from "@/lib/supabaseClient";
import { cache } from "react";

export const revalidate = 300; //cache for 5 minutes
export const dynamic = "force-static";

interface Notice {
  id: string;
  title: string;
  date: string;
}

const getRecentNotices = cache(async () => {
  const { data, error } = await supabase
    .from("Notice")
    .select("id,title,date")
    .order("date", { ascending: false })
    .limit(8);

  if (error) {
    console.error(`\nError fething recent notices: ${error} \n`);
    return null;
  }

  return data as Notice[];
});

export default async function RecentNotices() {
  const notice = await getRecentNotices();

  return (
    <Box gap={2} py={3}>
      <Grid container>
        <Grid size={12}>
          <Grid container spacing={2} columnSpacing={{ xs: 4, md: 15, lg: 25 }}>
            {notice?.map((notice, index) => (
              <Grid size={6} key={index}>
                <Stack spacing={0}>
                  <Typography
                    color="grey"
                    sx={{
                      lineHeight: 0.8,
                    }}
                  >
                    {new Date(notice.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Typography>
                  <Link
                    key={index}
                    href={notice.title}
                    underline="always"
                    color="inherit"
                    sx={{
                      fontSize: { md: "1.2rem" },
                      fontFamily: "Josefin Sans",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      "&:active": {
                        color: "grey",
                      },
                    }}
                  >
                    {notice.title}
                  </Link>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
