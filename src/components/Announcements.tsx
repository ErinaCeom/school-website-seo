import { Stack, Box, Grid, Typography, Link } from "@mui/material";

//dummy data
const notices = [
  {
    date: "2025-06-25",
    title: "Summer Vacation Announcement",
    desc: "Dear students and parents, please note that the school will be closed for summer vacation from July 1st to August 15th, 2025. Classes will resume on August 18th.",
  },
  {
    date: "2025-06-26",
    title: "Annual Sports Day Registration",
    desc: "Registration for the Annual Sports Day, to be held on September 10th, is now open. Interested students can sign up at the front office by July 15th.",
  },
  {
    date: "2025-06-27",
    title: "Parent-Teacher Meeting",
    desc: "A parent-teacher meeting for all grades will be held on July 20th from 9:00 AM to 3:00 PM. We encourage all parents to attend to discuss their child's progress.",
  },
  {
    date: "2025-06-28",
    title: "School Library Books Return",
    desc: "All library books borrowed must be returned by June 30th before the summer break. Fines will be imposed for late returns.",
  },
  {
    date: "2025-06-29",
    title: "Extra-Curricular Activities Sign-ups",
    desc: "Sign-ups for various extra-curricular activities for the upcoming academic year will begin on August 20th. A list of available activities will be displayed on the notice board.",
  },
  {
    date: "2025-06-30",
    title: "Cleanliness Drive",
    desc: "Our annual school cleanliness drive will take place on June 29th. All students are requested to participate to ensure a clean and healthy environment.",
  },
  {
    date: "2025-07-01",
    title: "First Aid Training Workshop",
    desc: "A first aid training workshop for students of grades 8-10 will be conducted on September 5th. Limited seats are available; register early to secure your spot.",
  },
  {
    date: "2025-07-02",
    title: "Lost and Found Item Collection",
    desc: "All unclaimed items from the lost and found box will be donated by July 10th. Please check for any missing belongings before this date.",
  },
  {
    date: "2025-07-03",
    title: "School Uniform Policy Reminder",
    desc: "This is a reminder to all students to adhere to the school's uniform policy. Please ensure you are in proper uniform at all times.",
  },
  {
    date: "2025-07-04",
    title: "Inter-School Debate Competition",
    desc: "Our school will be hosting the annual inter-school debate competition on October 1st. Students interested in participating can contact the English department for details.",
  },
];

export default function Announcements() {
  return (
    <Box gap={2} py={3}>
      <Grid container sx={{ border: 1 }}>
        <Grid size={{ xs: "auto", md: 12 }}>
          <Typography
            sx={{
              fontFamily: "Forum, serif",
              fontSize: { xs: "3rem", md: "4rem" },
            }}
          >
            Notices
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Stack spacing={0}>
                {[notices.map((text,index) => (
                  <Link
                    key={index}
                    href={text.title}
                    underline="always"
                    color="inherit"
                    sx={{
                      fontSize: { md: "1.2rem" },
                      fontFamily: "Josefin Sans",
                    }}
                  >
                    {text.title}
                  </Link>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Stack spacing={0}>
                {notices.map((text,index) => (
                  <Link
                    key={index}
                    href={text.title}
                    underline="always"
                    color="inherit"
                    sx={{
                      fontSize: { md: "1.2rem" },
                      fontFamily: "Josefin Sans",
                    }}
                  >
                    {text.title}
                  </Link>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
