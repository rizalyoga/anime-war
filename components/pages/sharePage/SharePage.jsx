import React, { useState, useEffect } from "react";
import Layout from "@/layout/Layout";
import styles from "./sharepage.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import SharepageLayout from "@/layout/SharepageLayout";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon } from "react-share";

const SharePage = ({ data, seos }) => {
  const [curentLink, setCurentLink] = useState("");

  // Funtion for get curent link page
  const router = useRouter();
  useEffect(() => {
    const link = window.location.href;
    if (link) {
      setCurentLink(link);
    }
  }, []);

  // Function for direct page
  const goToLeaderboard = () => {
    router.push("/leaderboard");
  };

  const goToHome = () => {
    router.push("/home");
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
    <Layout title={"Sharepage"}>
      <SharepageLayout seos={seos}>
        <div className="container">
          <div className={styles["sharepage-container"]}>
            <div className={styles["main-content"]}>
              <div className={styles.images}>
                <Image src={"/swords.png"} width={170} height={150} alt="villain-image" />
              </div>
              <div className={styles["desc-content"]}>
                <h3>
                  Player <span>{data?.gametag?.name.toUpperCase()}</span> berhasil mengalahkan Villain <span>{data?.villain.toUpperCase()}</span> menggunakan hero <span>{data?.hero.toUpperCase()}</span>
                </h3>
                <h2>
                  Score : <span>{data?.score}</span>
                </h2>
                <input type="text" placeholder={curentLink} value={curentLink} onBlur={() => setCurentLink(window.location.href)} onChange={(e) => setCurentLink(e.target.value)} />
              </div>
              <div className={styles["share-medsos"]}>
                <FacebookShareButton style={{ marginLeft: "5px" }} url={curentLink}>
                  <FacebookIcon size={36} round />
                </FacebookShareButton>

                <TwitterShareButton style={{ marginLeft: "5px" }} url={curentLink}>
                  <TwitterIcon size={36} round />
                </TwitterShareButton>

                <WhatsappShareButton style={{ marginLeft: "5px" }} separator=":: " url={curentLink}>
                  <WhatsappIcon size={36} round />
                </WhatsappShareButton>

                <TelegramShareButton style={{ marginLeft: "5px" }} url={curentLink}>
                  <TelegramIcon size={36} round />
                </TelegramShareButton>
              </div>
              <div className={styles.buttons}>
                <button onClick={goToHome}>Home</button>
                <button onClick={copyLink}>Copy Link</button>
                <button onClick={goToLeaderboard}>Leaderboard</button>
              </div>
            </div>
          </div>
        </div>
      </SharepageLayout>
    </Layout>
  );
};

export default SharePage;
