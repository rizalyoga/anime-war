import React from "react";
import Head from "next/head";

const SharepageLayout = ({ children, seos }) => {
  const { title, description, author, keywords, canonicalUrl, ogTitle, ogDescription, ogImageUrl, ogImageWidth, ogImageHeight, ogType, ogUrl, twitterCard, twitterTitle, twitterDescription, twitterUrl } = seos;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta title={title} />
        <meta name="description" title={description} />
        <meta name="author" title={author} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:url" content={twitterUrl} />
        <meta name="twitter:title" content={twitterTitle} />
        <meta name="twitter:description" content={twitterDescription} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:image:width" content={ogImageWidth} />
        <meta property="og:image:height" content={ogImageHeight} />
        <meta property="og:type" content={ogType} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
      </Head>
      {children}
    </>
  );
};

export default SharepageLayout;
