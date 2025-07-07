import { Stack, Box, Grid, Typography, Link } from "@mui/material";

//TODO: fetch data from database, SEO optimization

//dummy data
const notices = [
  {
    date: "2025-06-25",
    title:
      "Summer Vacation Announcement: School Closed from July 1st to August 15th",
    desc: "Dear students and parents, we are officially announcing the dates for the upcoming summer vacation. The school will be closed for the entire period from **July 1st to August 15th, 2025**. We encourage everyone to enjoy their break responsibly. Classes will **resume promptly on August 18th**, so please mark your calendars accordingly.",
  },
  {
    date: "2025-06-26",
    title: "Annual Sports Day: Registration Now Open for September 10th Event!",
    desc: "Get ready for our exciting Annual Sports Day! Registration is now officially open for this highly anticipated event, scheduled for **September 10th**. We invite all interested students to sign up at the front office by **July 15th**. Don't miss this chance to showcase your athletic talents and participate in a day of fun and competition!",
  },
  {
    date: "2025-06-27",
    title: "Important Parent-Teacher Meeting Scheduled for July 20th",
    desc: "An important parent-teacher meeting for **all grades** will be held on **July 20th, from 9:00 AM to 3:00 PM**. This is a valuable opportunity to discuss your child's academic progress, address any concerns, and collaborate with their teachers. We strongly encourage all parents to attend and engage in this vital discussion about their child's education.",
  },
  {
    date: "2025-06-28",
    title: "School Library Books: Final Return Date is June 30th",
    desc: "A friendly reminder to all students: please return all borrowed library books by **June 30th** before the summer break begins. To avoid any inconvenience, please ensure all books are returned on time, as fines will be imposed for late returns. Let's keep our library resources accessible for everyone!",
  },
  {
    date: "2025-06-29",
    title:
      "Extra-Curricular Activities: Sign-ups Begin August 20th for New Academic Year",
    desc: "Prepare for a vibrant new academic year! Sign-ups for various extra-curricular activities will commence on **August 20th**. A comprehensive list of all available activities, including clubs, sports, and arts programs, will be prominently displayed on the main notice board. This is a great opportunity to explore new interests and develop new skills.",
  },
  {
    date: "2025-06-30",
    title: "Annual School Cleanliness Drive: Join Us on June 29th!",
    desc: "Let's work together to maintain a clean and pleasant school environment! Our annual school cleanliness drive will take place on **June 29th**. We kindly request the active participation of all students to help ensure a hygienic and healthy space for everyone. Your contribution makes a significant difference!",
  },
  {
    date: "2025-07-01",
    title:
      "First Aid Training Workshop: Limited Seats for Grades 8-10 on September 5th",
    desc: "We are organizing a crucial first aid training workshop for students of **grades 8-10** on **September 5th**. This workshop will equip you with essential life-saving skills. Please note that seats are limited, so we encourage interested students to register early to secure their spot and gain valuable knowledge.",
  },
  {
    date: "2025-07-02",
    title: "Lost and Found Items: Last Chance for Collection by July 10th",
    desc: "Attention all students and staff: please check the lost and found box for any missing belongings. All unclaimed items will be **donated after July 10th**. We encourage everyone to review the items before this deadline to retrieve anything you may have misplaced.",
  },
];

export default function RecentNotices() {
  return (
    <Box gap={2} py={3}>
      <Grid container>
        <Grid size={12}>
          <Grid container spacing={2} columnSpacing={{ xs: 4, md: 15, lg: 25 }}>
            {notices.map((notice, index) => (
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
