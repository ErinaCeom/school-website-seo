# School Website SEO Practice Project

I built this project to practice SEO strategies using static content, semantic HTML, and structured routing with Next.js. The goal is to create a fast, discoverable, and content-rich school website.

I used [SPSC](https://spscdnj.edu.bd) as an inspiration for structure and content. All resources (logos, images, and content) belong to SPSC and are used strictly for educational purposes.

---

## Technologies Used

- **Next.js 15**
- **Material UI 7**
- **Framer Motion**
- **Supabase**

---

## Performance Optimization

To reduce server workload and ensure fast load times:

- **Next.js Caching**: Pages are statically generated or cached using Next.js’s route-level caching and revalidation (`revalidate`, `dynamic = "force-static"`) to limit repeated server calls e.g. `/notice/[id]` page.
Next's `unstable_cache` is also used to cache data in memory see `getNotice.ts`
- **React Cache API**: Heavy or frequently reused data-fetching functions are wrapped with React’s `cache()` utility to ensure they're only called once per request cycle.

---

## Page Structure & SEO Targets

- `/` → **Home Page**  
  - **SEO Focus**: Introduction about the school and display of 8 recent notices

- `/notice` → **Notices List**  
  - **SEO Focus**: Descriptive page indicating it contains all school notices

- `/notice/[id]` → **Notice Details**  
  - **SEO Focus**: Fully static pages to maximize visibility of individual notices

---

## UI Design Approach

The design is loosely inspired by the Harvard University website. While I'm not a professional designer, I focused on creating a clean, mobile-first layout.  
The mobile view is quite solid, but the desktop view still needs major improvements.

---

## Contributions Welcome

If you're a developer or designer interested in improving this project, feel free to open a pull request!

---

## License

This project is for **educational** use only. All third-party content belongs to their respective owners.
