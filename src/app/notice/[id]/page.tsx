// app/notice/[id]/page.tsx

// This page is for displaying a single notice
// This is fully SSR and cached for a certain amount of time
import { Box, Container, Stack, Typography, Link } from "@mui/material";
import { Metadata } from "next";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { cache } from "react";
import { formatDate } from "@/utils";

// Next caches the entire page
export const revalidate = 3600;
export const dynamic = "force-static";

type Notice = {
  title: string;
  date: string;
  desc: string;
  fileUrl: string | null;
  fileType: "IMAGE" | "PDF" | null;
};

type NoticeResult =
  | { status: "success"; data: Notice }
  | { status: "not_found" }
  | { status: "error"; message: string };

// Cached function to avoid multiple requests on Line 48 and 79
const getNoticeDetails = cache(async (id: string): Promise<NoticeResult> => {
  //Direct access to supabase
  const { data, error } = await supabase
    .from("Notice")
    .select("title, date, desc, fileUrl, fileType")
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

type PageProps = {
  params: Promise<{ id: string }>;
};

//Dynamic metadata for each notice
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const result = await getNoticeDetails((await params).id);

  // not necessary,still Returns not found metadata if anything goes wrong
  if (result.status !== "success") {
    return {
      title: "Notice Not Found",
      description: "The requested notice could not be found.",
    };
  }

  const { data } = result;

  return {
    title: data.title + " | SPSC - notice",
    description: data.desc.slice(0, 160),
    keywords: [
      "school notices",
      "school announcements",
      "latest updates",
      "events",
      "student portal",
      "spsc",
      "spsc notice",
      "spsc dinajpur",
      "dinajpur",
      "saint philip's high school and college",
      "st. philip's High school and college ",
      "saint philip's school",
      "about SPSC",
      "SPSC contact",
      "dinajpur school list",
    ],
    robots: {
      index: true,
    },
    openGraph: {
      title: data.title,
      description: data.desc,
      url: `${process.env.NEXT_PUBLIC_URL}/notice/${(await params).id}`,
      siteName: "Saint Philip's high School and College",
      type: "article",
      images: [
        {
          url: "/images/opengraph/notice.png",
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const result = await getNoticeDetails(id);

  // Error
  if (result.status === "error") {
    return (
      <Container sx={{ pt: 10 }}>
        <Typography color="error" fontStyle="italic">
          There was an error loading notice: {result.message}
        </Typography>
      </Container>
    );
  }

  // Not found
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
      sx={{ height: { xs: "max-content", md: "100vh" }, py: 10 }}
    >
      <Stack direction={{ md: "row" }} spacing={5}>
        <Stack direction="column" width={{ md: "50%" }}>
          <Box>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              {data.title}
            </Typography>
            <Typography sx={{ color: "grey", mb: 2 }} gutterBottom>
              {formatDate(data.date)}
            </Typography>
            <Typography sx={{ fontSize: "1.2rem" }}>{data.desc}</Typography>
          </Box>
          <Link href="/notice" color="#ffffff" pt={5}>
            &lt;Back to notices
          </Link>
        </Stack>
        <Box sx={{ width: { md: "50%" }, p: 1,mt:3}}>
          {(data.fileType == "IMAGE" && (
            <Image
              src={data.fileUrl || "undefined"}
              width={500}
              height={500}
              alt="Image of notice"
            />
          )) ||
            (data.fileType == "PDF" && (
              <Link
                href={data.fileUrl || "undefined"}
                target="_blank"
              >
                See attached file
              </Link>
            )) || <Typography>No attachment provided</Typography>}
        </Box>
      </Stack>
    </Container>
  );
}
