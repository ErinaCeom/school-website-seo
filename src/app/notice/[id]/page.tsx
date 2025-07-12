// app/notice/[id]/page.tsx
import { Box, Container, Stack, Typography, Link } from "@mui/material";
import { Metadata } from "next";
import { supabase } from "@/lib/supabaseClient";
import { cache } from "react";

export const revalidate = 300; // cached for 5 minutes
export const dynamic = "force-static";

// -------------------
// Types
// -------------------
type Notice = {
  title: string;
  date: string;
  desc: string;
  fileUrl: string | null;
};

type NoticeResult =
  | { status: "success"; data: Notice }
  | { status: "not_found" }
  | { status: "error"; message: string };

// -------------------
// Cached function
// -------------------
const getNoticeDetails = cache(async (id: string): Promise<NoticeResult> => {
  const { data, error } = await supabase
    .from("Notice")
    .select("title, date, desc, fileUrl")
    .eq("id", parseInt(id))
    .maybeSingle();

  if (error) {
    return { status: "error", message: error.message };
  }

  if (!data) {
    return { status: "not_found" };
  }

  return { status: "success", data };
});

// -------------------
// Dynamic Metadata
// -------------------
type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const result = await getNoticeDetails((await params).id);

  if (result.status !== "success") {
    return {
      title: "Notice Not Found",
      description: "The requested notice could not be found.",
    };
  }

  const { data } = result;

  return {
    title: "Notice: " + data.title,
    description: data.desc.slice(0, 160),
    openGraph: {
      title: data.title,
      description: data.desc,
      type: "article",
      images: "/images/opengraph/notice.png",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.desc,
    },
  };
}

// -------------------
// Page Component
// -------------------
export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const result = await getNoticeDetails(id);

  if (result.status === "error") {
    return (
      <Container sx={{ pt: 10 }}>
        <Typography color="error" fontStyle="italic">
          There was an error loading notice: {result.message}
        </Typography>
      </Container>
    );
  }

  if (result.status === "not_found") {
    return (
      <Container sx={{ pt: 10 }}>
        <Typography>No notice found with ID {id}.</Typography>
      </Container>
    );
  }

  const data = result.data;

  return (
    <Container
      maxWidth="xl"
      sx={{ height: { xs: "max-content", md: "100vh" }, py: 10, border: 0.5 }}
    >
      <Stack direction={{ md: "row" }} spacing={5}>
        <Stack direction="column" width={{ md: "50%" }}>
          <Box>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              {data.title}
            </Typography>
            <Typography sx={{ color: "grey", mb: 2 }} gutterBottom>
              {new Date(data.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Typography>
            <Typography sx={{ fontSize: "1.2rem" }}>{data.desc}</Typography>

            {data.fileUrl ? (
              <Link
                href={data.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                See attached file
              </Link>
            ) : (
              <Typography>*No files provided</Typography>
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
