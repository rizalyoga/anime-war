import React, { useState, useEffect } from "react";
import styles from "./modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { getSelectedVillain, postFight, loadings } from "@/data/api";
import { useRouter } from "next/router";
import { useGetCity } from "../../hooks/useGetCity";
import { resultAlert } from "../alerts/alert";
import getTagname from "utils/getTagname";

const Modal = ({ setIsOpen, idVillain }) => {
  const [dataVillain, setDataVillain] = useState([]);
  const [heroHP, setHeroHP] = useState();
  const [villainHP, setVillainHP] = useState();
  const [loading, setLoading] = useState();
  const [loadingButton, setLoadingButton] = useState(false);
  const [statusBattle, setStatusBattle] = useState("READY");
  const [imageSource, setImageSource] = useState("");

  const router = useRouter();

  const { hero, city } = router.query;

  const { dataCity } = useGetCity();

  // Get Data Villain Function
  useEffect(() => {
    getSelectedVillain(idVillain)
      .then((response) => setDataVillain(response))
      .then(() => setLoading(false));
    setLoading(loadings);
  }, []);

  // Set imageSource and HP bar (villain, hero) state
  useEffect(() => {
    if (dataVillain[0]?.name && dataCity) {
      // Check and set HP bar when there is fight data in local storage

      const tagname = getTagname();
      const checkDataBattle = JSON.parse(localStorage.getItem(tagname));

      const syncData = () => {
        if (checkDataBattle) {
          let dataFinded = false;
          checkDataBattle.forEach((data, i) => {
            if (data.versus == `${hero}VS${dataVillain[0]?.name}`) {
              dataFinded = true;
              setVillainHP(checkDataBattle[i].villainHP);
              setHeroHP(checkDataBattle[i].heroHP);
            }

            if (!dataFinded) {
              setVillainHP(dataVillain[0]?.maxHP);
              setHeroHP(100);
            }
          });
        } else {
          setVillainHP(dataVillain[0]?.maxHP);
          setHeroHP(100);
        }
      };

      syncData();

      // Filter background Modal that match with city name and set to imageSource state
      dataCity.forEach((el) => (el.name == city ? setImageSource(el.imgSrc) : null));
    }
  }, [dataVillain, dataCity]);

  // Close Modal Handler
  const closeModal = () => {
    setIsOpen(false);
  };

  // Even Handler when fight is ended
  const fightEndhandler = (villainHP, heroHP) => {
    heroHP == 0 ? setStatusBattle("YOU LOSE") : villainHP == 0 ? setStatusBattle("YOU WIN") : null;
    setTimeout(() => {
      heroHP == 0 ? resultAlert("Sorry You LOSE 😭") : villainHP == 0 ? resultAlert("Congratulations, You WIN 🎉") : null;
      closeModal();
    }, 650);
  };

  // Battle Handler
  const startBattle = (HPHero, HPVillain) => {
    if (HPHero === 0 || HPVillain === 0) {
      villainHP == 0 ? setStatusBattle("YOU WIN") : heroHP == 0 ? setStatusBattle("YOU LOSE") : setStatusBattle("THE FIGHT IS ON");
      villainHP == 0 ? alert("YOU WIN") : heroHP == 0 ? alert("YOU LOSE") : null;
    } else {
      // setStatusBattle("THE FIGHT IS ON");
      const payload = {
        heroHP: HPHero,
        villainHP: HPVillain,
      };

      setLoadingButton(true);

      postFight(payload)
        .then((response) => {
          //set hit status battle, WIN or LOSE from response
          response.heroHP < heroHP ? setStatusBattle("YOU LOSE, YOUR HP -10%") : response.villainHP < villainHP ? setStatusBattle("YOU WIN, VILLAIN HP -10%") : null;

          //set bar hero and villain HP from response
          setVillainHP(response.villainHP), setHeroHP(response.heroHP);

          //close modal and show alert when the fight is end
          response.heroHP == 0 || response.villainHP == 0 ? fightEndhandler(response.villainHP, response.heroHP) : null;

          //set final status battle, WIN or LOSE from response
          // response.heroHP == 0 ? setStatusBattle("YOU LOSE") : response.villainHP == 0 ? setStatusBattle("YOU WIN") : null;

          //save data battle in local storage

          const tagname = getTagname();
          const initialName = localStorage.getItem(tagname);

          let dataSaveBattle = [];

          if (initialName) {
            dataSaveBattle = JSON.parse(localStorage.getItem(tagname));
          }

          const checkData = (newData) => {
            if (dataSaveBattle.length == 0) {
              dataSaveBattle.push(newData);
            } else {
              let finded = false;
              dataSaveBattle.forEach((data, i) => {
                if (data.versus == newData.versus) {
                  dataSaveBattle[i].versus = newData.versus;
                  dataSaveBattle[i].villainHP = newData.villainHP;
                  dataSaveBattle[i].heroHP = newData.heroHP;
                  finded = true;
                }
              });

              if (finded == false) {
                dataSaveBattle.push(newData);
              }
            }
          };

          checkData({ versus: `${hero}VS${dataVillain[0]?.name}`, villainHP: response.villainHP, heroHP: response.heroHP });
          window.localStorage.setItem(tagname, JSON.stringify(dataSaveBattle));
        })
        .then(() =>
          setTimeout(() => {
            setLoadingButton(false);
          }, 500)
        );
    }
  };

  return (
    <>
      <div className={styles.darkBG} onClick={closeModal} />
      <div className={styles.centered}>
        <div className={styles.modal} style={{ backgroundImage: `linear-gradient(#b3b3b3b2, #ffffffb1),url(${imageSource})`, backgroundSize: "cover" }}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>- BATTLE WITH {dataVillain[0]?.name.toUpperCase()} -</h5>
          </div>
          <button className={styles.closeBtn} onClick={closeModal}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>

          <div className={styles.modalContent}>
            {loading ? (
              <h3 className={styles.loadingModal}>PLEASE WAIT . . .</h3>
            ) : (
              <>
                {/*  ------------------------------ Description Villain ------------------------------  */}
                <div className={styles.villainAvatar}>
                  <img src={dataVillain[0]?.imgSrc} alt="villain-avatar" />
                </div>
                <h3>- {dataVillain[0]?.name.toUpperCase()} -</h3>

                {/*  ----------------------------- HP Bar Villain -----------------------------  */}
                <div className={styles.progress} style={{ maxWidth: `${villainHP}%` }}>
                  <p className={styles.statusHP}>{villainHP} %</p>
                  <div
                    className={(styles.villainHP, styles.progressBar)}
                    style={
                      villainHP >= 70
                        ? { width: `${villainHP}%`, background: "repeating-linear-gradient(135deg, #fa68a2, #fa68a2 20px, #19baeb 20px, #19baeb 40px)" }
                        : villainHP >= 40
                        ? { width: `${villainHP}%`, background: "repeating-linear-gradient(135deg, #fab668, #fab668 20px, #ebc519 20px, #ebc519 40px)" }
                        : { width: `${villainHP}%`, background: "repeating-linear-gradient(135deg, #a80226, #a80226 20px, #ff3f39 20px, #ff3f39 40px)" }
                    }
                  ></div>
                </div>

                {/* ------------------------------ Battle Status -----------------------------  */}
                <div className={styles.boxStatus}>
                  <h2>{statusBattle}</h2>
                </div>

                {/*  ----------------------------- HP Bar Player -----------------------------  */}
                <div className={styles.progress}>
                  <p className={styles.statusHP}>{heroHP} %</p>
                  <div
                    className={(styles.playerHP, styles.progressBar)}
                    style={
                      heroHP >= 70
                        ? { width: `${heroHP}%`, background: "repeating-linear-gradient(135deg, #fa68a2, #fa68a2 20px, #19baeb 20px, #19baeb 40px)" }
                        : heroHP >= 40
                        ? { width: `${heroHP}%`, background: "repeating-linear-gradient(135deg, #fab668, #fab668 20px, #ebc519 20px, #ebc519 40px)" }
                        : { width: `${heroHP}%`, background: "repeating-linear-gradient(135deg, #a80226, #a80226 20px, #ff3f39 20px, #ff3f39 40px)" }
                    }
                  ></div>
                </div>
                <h3>- {hero?.toUpperCase()} -</h3>

                {/*  ----------------------------- Action Control -----------------------------  */}
                <div className={styles.modalActions}>
                  <div className={styles.actionsContainer}>
                    <button className={loadingButton ? styles.disableBtn : styles.fightBtn} disabled={loadingButton ? true : false} onClick={() => startBattle(heroHP, villainHP ? villainHP : villainHP == 0 ? 0 : dataVillain[0].maxHP)}>
                      {loadingButton ? "Wait" : "Fight"}
                    </button>
                    {/* <button className="cancelBtn" onClick={closeModal}>
                      Cancel
                    </button> */}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
