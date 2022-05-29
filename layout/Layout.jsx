import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NProgress from "nprogress";

const Layout = ({ children, title }) => {
  const router = useRouter();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    router.events.on("routeChangeStart", () => {
      NProgress.start();
    });

    router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });

    router.events.on("routeChangeError", () => {
      NProgress.done();
    });
    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Anime War {title}</title>
        <link rel="icon" href="/swords.png" type="image/x-icon" />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
