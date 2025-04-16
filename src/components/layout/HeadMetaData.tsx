import React from "react";
import Head from "next/head";
import { env } from "~/env";

export const HeadMetaData: React.FC<{
  title?: string;
  metaDescription?: string;
  // ogImageUrl?: string;
  pathname?: string;
}> = ({
  title = "Konten kamu berharga",
  metaDescription,
  // ogImageUrl = env.NEXT_PUBLIC_OG_IMAGE_URL,
  pathname = "",
}) => {
  const defaultTitle = "Nazal Prastya";

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : env.NEXT_PUBLIC_BASE_URL;

  const pageUrl = new URL(pathname, baseUrl).toString();

  return (
    <Head>
      <title>{title + " | " + defaultTitle}</title>
      <link rel="icon" href="/favicon.png" />
      <link rel="shortcut icon" href="/favicon.png" />

      {/* metadata */}
      <meta
        name="keywords"
        content="Nazal Prastya, Nazal Gusti Prastya, Portofolio, Web Developer, UI Designer, Frontend Developer, React Developer, Desain UI, Developer Indonesia"
      />
      <meta name="author" content="Nazal Gusti Prastya" />
      <meta name="creator" content="Nazal Gusti Prastya" />
      <meta name="title" content={defaultTitle + " | " + title} />
      <meta name="description" content={metaDescription} />
      {/* <meta name="og:image" itemProp="image" content={ogImageUrl} /> */}
      <meta property="og:url" content={pageUrl} />

      <meta property="og:type" content="website" />
      {/* <meta property="og:image" itemProp="image" content={ogImageUrl} /> */}
      <meta property="og:url" content="https://nazalprastya.vercel.app" />
      <meta property="og:title" content={title + " | " + defaultTitle} />
      <meta property="og:description" content={metaDescription} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={title + " | " + defaultTitle} />
      <meta property="twitter:description" content={metaDescription} />

      <meta property="og:site_name" content="Nazal Prastya Portofolio" />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:type" content="website" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
      />
    </Head>
  );
};
