const notices = [
  {
    date: "2025-06-25",
    title:
      "Summer Vacation Announcement: School Closed from July 1st to August 15th",
    desc: "Dear students and parents, we are officially announcing the dates for the upcoming summer vacation. The school will be closed for the entire period from **July 1st to August 15th, 2025**. We encourage everyone to enjoy their break responsibly. Classes will **resume promptly on August 18th**, so please mark your calendars accordingly.",
    category: "all", // Affects all levels
  },
  {
    date: "2025-06-26",
    title: "Annual Sports Day: Registration Now Open for September 10th Event!",
    desc: "Get ready for our exciting Annual Sports Day! Registration is now officially open for this highly anticipated event, scheduled for **September 10th**. We invite all interested students to sign up at the front office by **July 15th**. Don't miss this chance to showcase your athletic talents and participate in a day of fun and competition!",
    category: "highschool",
  },
  {
    date: "2025-06-27",
    title: "Important Parent-Teacher Meeting Scheduled for July 20th",
    desc: "An important parent-teacher meeting for **all grades** will be held on **July 20th, from 9:00 AM to 3:00 PM**. This is a valuable opportunity to discuss your child's academic progress, address any concerns, and collaborate with their teachers. We strongly encourage all parents to attend and engage in this vital discussion about their child's education.",
    category: "all",
  },
  {
    date: "2025-06-28",
    title: "School Library Books: Final Return Date is June 30th",
    desc: "A friendly reminder to all students: please return all borrowed library books by **June 30th** before the summer break begins. To avoid any inconvenience, please ensure all books are returned on time, as fines will be imposed for late returns. Let's keep our library resources accessible for everyone!",
    category: "highschool",
  },
  {
    date: "2025-06-29",
    title:
      "Extra-Curricular Activities: Sign-ups Begin August 20th for New Academic Year",
    desc: "Prepare for a vibrant new academic year! Sign-ups for various extra-curricular activities will commence on **August 20th**. A comprehensive list of all available activities, including clubs, sports, and arts programs, will be prominently displayed on the main notice board. This is a great opportunity to explore new interests and develop new skills.",
    category: "college",
  },
  {
    date: "2025-06-30",
    title: "Annual School Cleanliness Drive: Join Us on June 29th!",
    desc: "Let's work together to maintain a clean and pleasant school environment! Our annual school cleanliness drive will take place on **June 29th**. We kindly request the active participation of all students to help ensure a hygienic and healthy space for everyone. Your contribution makes a significant difference!",
    category: "primary",
  },
  {
    date: "2025-07-01",
    title:
      "First Aid Training Workshop: Limited Seats for Grades 8-10 on September 5th",
    desc: "We are organizing a crucial first aid training workshop for students of **grades 8-10** on **September 5th**. This workshop will equip you with essential life-saving skills. Please note that seats are limited, so we encourage interested students to register early to secure their spot and gain valuable knowledge.",
    category: "highschool",
  },
  {
    date: "2025-07-02",
    title: "Lost and Found Items: Last Chance for Collection by July 10th",
    desc: "Attention all students and staff: please check the lost and found box for any missing belongings. All unclaimed items will be **donated after July 10th**. We encourage everyone to review the items before this deadline to retrieve anything you may have misplaced.",
    category: "all",
  },
  {
    date: "2025-07-03",
    title: "Orientation Day for New College Students: August 25th",
    desc: "Welcome, new college students! Our orientation day is scheduled for **August 25th, from 9:00 AM to 4:00 PM**. This event is essential for all incoming students to familiarize yourselves with the campus, meet faculty, and understand academic policies. We look forward to seeing you there!",
    category: "college",
  },
  {
    date: "2025-07-04",
    title:
      "Kindergarten Admission Applications Open for 2026-2027 Academic Year",
    desc: "Parents, please note that admission applications for kindergarten for the **2026-2027 academic year** are now open. Applications can be submitted online through our school website. The deadline for submission is **September 30th, 2025**. Early application is advised.",
    category: "pre-primary",
  },
  {
    date: "2025-07-05",
    title: "Primary School Field Trip to Science Museum: September 15th",
    desc: "Exciting news for primary school students! We are organizing a field trip to the **Science Museum on September 15th**. Permission slips and payment of **$15** are due by **August 30th**. This trip promises to be an educational and fun experience!",
    category: "primary",
  },
  {
    date: "2025-07-06",
    title: "High School Debate Club Tryouts: August 28th",
    desc: "Are you passionate about public speaking and critical thinking? The High School Debate Club will be holding tryouts on **August 28th, at 3:30 PM** in the school auditorium. All interested students are encouraged to attend and showcase their skills.",
    category: "highschool",
  },
  {
    date: "2025-07-07",
    title: "College Scholarship Application Deadline: October 1st",
    desc: "Attention college students! The deadline for submitting scholarship applications for the upcoming academic year is **October 1st**. Please visit the financial aid office or the college website for a list of available scholarships and application requirements.",
    category: "college",
  },
  {
    date: "2025-07-08",
    title: "Pre-Primary Storytelling Session with Special Guest: August 10th",
    desc: "Our pre-primary students are invited to a special storytelling session with a guest author on **August 10th, at 10:00 AM** in the library. This engaging session aims to foster a love for reading and imagination.",
    category: "pre-primary",
  },
  {
    date: "2025-07-09",
    title: "Annual School Play Auditions: September 1st-3rd",
    desc: "Calling all aspiring actors and actresses! Auditions for this year's annual school play will be held from **September 1st to September 3rd**. Please sign up for an audition slot on the drama club notice board. All grades are welcome to try out!",
    category: "all",
  },
  {
    date: "2025-07-10",
    title:
      "Math Olympiad Registration: Open for High School Students Until July 30th",
    desc: "Are you a math enthusiast? Registration for the annual Math Olympiad is now open for all high school students! Test your problem-solving skills and compete for exciting prizes. The deadline for registration is **July 30th**. Don't miss this intellectual challenge!",
    category: "highschool",
  },
  {
    date: "2025-07-11",
    title: "Primary School Art Competition: Theme 'My Community'",
    desc: "Primary school students, get your creative juices flowing! Our annual Art Competition is here, with the theme **'My Community'**. Submissions are due by **August 20th**. Let's see your artistic interpretations of our wonderful community!",
    category: "primary",
  },
  {
    date: "2025-07-12",
    title: "College Career Fair: Explore Your Future on October 15th",
    desc: "College students, prepare for your future! Our annual Career Fair will be held on **October 15th** in the campus gymnasium. Connect with various companies, explore internship opportunities, and discover potential career paths. Bring your resumes!",
    category: "college",
  },
  {
    date: "2025-07-13",
    title: "Pre-Primary Health Check-up Camp: August 5th",
    desc: "A free health check-up camp for all pre-primary students will be conducted on **August 5th**. We encourage all parents to bring their children for a general check-up. Please ensure your child has eaten a light breakfast before arriving.",
    category: "pre-primary",
  },
  {
    date: "2025-07-14",
    title: "School Photography Club Meeting: August 22nd",
    desc: "Calling all budding photographers! The School Photography Club will have its first meeting of the new academic year on **August 22nd, at 4:00 PM** in the art room. All new and returning members are welcome to discuss upcoming projects.",
    category: "highschool",
  },
  {
    date: "2025-07-15",
    title: "Academic Remedial Classes: Starting September 1st",
    desc: "For students requiring additional support in core subjects, academic remedial classes will begin on **September 1st**. Schedules and registration forms are available at the academic support office. We encourage students to take advantage of these resources.",
    category: "all",
  },
  {
    date: "2025-07-16",
    title: "College Internships: Information Session on September 10th",
    desc: "Thinking about internships? An information session on various internship opportunities will be held on **September 10th** in the lecture hall. Learn about application processes, available programs, and how to make the most of your internship experience.",
    category: "college",
  },
  {
    date: "2025-07-17",
    title:
      "Primary School Reading Challenge: Runs from August 1st to September 30th",
    desc: "Get ready to read, primary students! Our annual Reading Challenge kicks off on **August 1st** and runs until **September 30th**. Read as many books as you can and earn exciting rewards. Let's make reading a fun habit!",
    category: "primary",
  },
  {
    date: "2025-07-18",
    title: "High School Robotics Club: First Meeting on August 29th",
    desc: "Interested in robotics and engineering? The High School Robotics Club will have its inaugural meeting on **August 29th, at 3:00 PM** in the science lab. No prior experience is required, just a passion for innovation!",
    category: "highschool",
  },
  {
    date: "2025-07-19",
    title: "Pre-Primary Annual Concert Practice Schedule: Starting August 15th",
    desc: "Parents of pre-primary students, please note that practices for the Annual Concert will begin on **August 15th**. A detailed practice schedule will be sent home next week. We're excited to see our little stars shine!",
    category: "pre-primary",
  },
  {
    date: "2025-07-20",
    title: "Environmental Club Cleanup Drive: October 5th",
    desc: "Join the Environmental Club for our campus cleanup drive on **October 5th**. Let's work together to keep our school grounds green and clean. Volunteers are needed and appreciated!",
    category: "all",
  },
  {
    date: "2025-07-21",
    title: "College Exchange Programs: Application Deadline November 1st",
    desc: "Dreaming of studying abroad? Applications for college exchange programs for the next academic year are due by **November 1st**. Attend the information session on **September 25th** for details.",
    category: "college",
  },
  {
    date: "2025-07-22",
    title: "Primary School Science Fair: October 20th",
    desc: "Get ready for an exciting Primary School Science Fair on **October 20th**! Start thinking about your projects now. More details on registration and guidelines will be shared soon.",
    category: "primary",
  },
  {
    date: "2025-07-23",
    title: "High School Volunteer Opportunities: Sign-up by September 15th",
    desc: "Looking to make a difference? Various volunteer opportunities are available for high school students. Sign up at the student services office by **September 15th** to contribute to school and community events.",
    category: "highschool",
  },
  {
    date: "2025-07-24",
    title: "Pre-Primary Potty Training Workshop for Parents: September 8th",
    desc: "A helpful workshop on potty training will be offered to pre-primary parents on **September 8th, at 2:00 PM** in the multipurpose hall. Expert advice and tips will be shared to support this developmental milestone.",
    category: "pre-primary",
  },
  {
    date: "2025-07-25",
    title: "Annual School Blood Donation Drive: November 10th",
    desc: "Make a life-saving difference! Our annual blood donation drive will be held on **November 10th**. All eligible students, staff, and parents are encouraged to participate. Pre-registration is highly recommended.",
    category: "all",
  },
];

export default async function getNotice(category?: string, sort?: string) {
  let filtered = notices;

  if (category && category !== "all") {
    filtered = filtered.filter((n) => n.category === category);
  }

  if (sort === "oldest") {
    filtered = filtered.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  } else if (sort === "newest") {
    filtered = filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }

  return filtered;
}
