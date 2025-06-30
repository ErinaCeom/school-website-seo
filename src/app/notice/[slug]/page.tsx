import { Box, Container, Stack, Typography, Link } from "@mui/material";

const notice = {
  title:
    "Summer Vacation Announcement: School Closed from July 1st to August 15th",
  desc: "Dear Students,Reminder: The final exams for the academic year will commence on 1st June.Please ensure that you are well-prepared and make necessary arrangements to attend the exams on the scheduled date. Check with your school administration for any further details regarding exam schedules, timings, and other important instructions.Key Dates to Remember:Exam commencement: 1st June[Insert date] - Exam duration and schedule will be announced separately by the school administration.\nMake sure to stay updated with the latest information and plan accordingly to achieve academic success.",
  date: "2025-06-25",
  image: "/images/spsc.jpg",
};

export default function Notice() {
  return (
    <Container
      maxWidth="xl"
      sx={{ height: { xs: "max-content", md: "100vh" }, py: 10, border: 1 }}
    >
      <Stack direction={{ md: "row" }} spacing={5}>
        <Stack direction="column" width={{ md: "50%" }}>
          <Box>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              {notice.title}
            </Typography>
            <Typography sx={{ color: "grey", mb: 2 }} gutterBottom>
              {new Date(notice.date).toLocaleDateString("en-GB")}
            </Typography>
            <Typography sx={{ fontSize: "1.2rem" }}>{notice.desc}</Typography>

            {notice.image ? (
              <Link href="#">see image</Link>
            ) : (
              <Typography>*No images provided</Typography>
            )}
          </Box>
          <Link href="/notice" color="#ffffff" pt={5}>
            &lt;Back to notices
          </Link>
        </Stack>
        <Box sx={{ width: { md: "50%" } }}>
          space for announcements list/image
        </Box>
      </Stack>
    </Container>
  );
}
