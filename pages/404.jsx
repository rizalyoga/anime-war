import React, { useEffect } from "react";
import { useRouter } from "next/router";

function PageNotFound() {
  const router = useRouter();

  //Send user back to Home page in 2 second
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }, []);

  return (
    <div className="container" style={{ marginTop: "45vh" }}>
      <h1 className="title-page">Oops, Page not Found !!!</h1>
    </div>
  );
}

export default PageNotFound;
