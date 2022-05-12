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
      // console.log("start page move");
    });

    router.events.on("routeChangeComplete", () => {
      NProgress.done();
      // console.log("complete page move");
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
        {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" /> */}
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
