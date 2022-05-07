import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar/Navbar";

const PrivateLayout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userAuth");
    if (!token) {
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
