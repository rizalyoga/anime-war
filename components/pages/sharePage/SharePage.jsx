import React, { useState, useEffect } from "react";
import Layout from "@/layout/Layout";
import styles from "./sharepage.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const SharePage = () => {
  const [curentLink, setCurentLink] = useState("");

  // Funtion for get curent link page
  const router = useRouter();
  useEffect(() => {
    const link = window.location.href;
    if (link) {
      setCurentLink(link);
    }
  }, []);

  // Function for direct to leaderboard page
  const goToLeaderboard = () => {
    router.push("/leaderboard");
  };

  // Funtion for copied curent link to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(curentLink);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      title: "Link Success Copied",
    });
  };

  return (
    <Layout>
      <div className="container">
        <div className={styles["sharepage-container"]}>
          <div className={styles.header}>
            <h1>SharePage</h1>
          </div>
          <div className={styles["main-content"]}>
            <div className={styles.images}>
              <Image src={"/swords.png"} width={200} height={150} alt="villain-image" />
            </div>
            <div className={styles["desc-content"]}>
              <h3>Game-player berhasil mengalahkan Villain name menggunakan hero-name</h3>
              <h2>Score : 80</h2>
              <input type="text" value={curentLink} />
            </div>
            <div className={styles.buttons}>
              <button onClick={copyLink} className="choose-btn">
                Share Result
              </button>
              <button onClick={goToLeaderboard} className="choose-btn">
                Show Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SharePage;
