import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar/Navbar";
import token from "../utils/getCookies";

const PrivateLayout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const auth = token();
    if (!auth) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default PrivateLayout;
