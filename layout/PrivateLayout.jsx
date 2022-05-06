import React, { useEffect } from "react";
import { useRouter } from "next/router";

const PrivateLayout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userAuth");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
};

export default PrivateLayout;
