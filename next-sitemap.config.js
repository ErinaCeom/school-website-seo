/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_URL,
  generateRobotsTxt: true,
  exclude: ["/admin", "/api", "/_next"],
  additionalPaths: async () => {
    const { createClient } = require("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    const { data, error } = await supabase.from("Notice").select("id");
    if (error || !data) return [];

    const dynamicPaths =
      data?.map((notice) => ({
        loc: `/notice/${notice.id}`,
        lastmod: new Date().toISOString(),
      })) || [];

    return [
      { loc: "/notice", lastmod: new Date().toISOString() },
      ...dynamicPaths,
    ];
  },
};

module.exports = config;
