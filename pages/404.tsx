import React, {FC, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/layout/Layout";

const  PageNotFound:FC = () => {
  const router = useRouter();

  //Send user back to Home page in 2 second
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }, []);

  return (
    <Layout title={"PAGE NOT FOUND"}>
      <div className="container" style={{ marginTop: "45vh" }}>
        <h1 className="title-page">Oops, Page not Found !!!</h1>
      </div>
    </Layout>
  );
}

export default PageNotFound;
