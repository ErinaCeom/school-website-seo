// RecentNotices.tsx

// This component show the most recent 8 notices in a 4x4 grid

import { Stack, Box, Grid, Typography, Link } from "@mui/material";
import NextLink from "next/link";
import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 18000; //cache for 5 hours
export const dynamic = "force-static";

interface Notice {
  id: string;
  title: string;
  date: string;
}

// Cached data on memory, revalidate with tags if necessary
const getRecentNotices = unstable_cache(
  async () => {
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
  },
  [],
  {
    revalidate: 18000, // revalidate after 5 hours
    tags: ["notices"],
  },
);

export default async function RecentNotices() {
  const notice = await getRecentNotices();

  // No notices means there was an error
  if (!notice || notice.length === 0) {
    return (
      <Box py={3}>
        <Typography color="error" fontStyle="italic">
          There was a problem loading notices :(
        </Typography>
      </Box>
    );
  }

  return (
    <Box gap={2} py={3}>
      <Grid container>
        <Grid size={12}>
          <Grid container spacing={2} columnSpacing={{ xs: 4, md: 15, lg: 25 }}>
            {notice?.map((notice, index) => (
              <Grid size={6} key={notice.id}>
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
                    component={NextLink}
                    key={index}
                    href={`/notice/${notice.id}`}
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
