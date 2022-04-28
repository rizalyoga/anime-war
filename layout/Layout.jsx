import React from "react";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Anime War</title>
        <link rel="icon" href="/swords.png" type="image/x-icon" />
      </Head>
      {children}
    </>
  );
};

export default Layout;
