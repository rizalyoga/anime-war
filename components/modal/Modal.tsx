import React, { useState, useEffect } from "react";
import styles from "./modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { getSelectedVillain, postFight, loadings } from "@/data/api";
import { useRouter } from "next/router";
import { useGetCity } from "../../hooks/useGetCity";
import { resultAlert } from "../alerts/alert";
import getTagname from "utils/getTagname";
import { expVillainCheck, expHeroCheck } from "../../utils/expBattleCheck";

//Interfaces 
import { DataBattleMemory } from "../cards/CardVillains"
import { CityData } from "../pages/city/City"

interface PropsVillainSelected {
  setIsOpen: (e: boolean) => void;
  idVillain: string;
}

interface Query {
  hero?: string;
  city?: string;
}

interface VillainData {
  cityID: number;
  id: number;
  imgSrc: string;
  maxHP: number;
  name: string;
}

const Modal = ({ setIsOpen, idVillain }: PropsVillainSelected) => {
  const [dataVillain, setDataVillain] = useState<VillainData[]>([]);
  const [heroHP, setHeroHP] = useState<number | null | undefined>();
  const [villainHP, setVillainHP] = useState<number | null>();
  const [loading, setLoading] = useState<boolean | null>();
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [statusBattle, setStatusBattle] = useState<string>("READY");
  const [imageSource, setImageSource] = useState<string>("");

  const router = useRouter();

  const { hero, city }: Query = router.query;

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

      const tagname: string | undefined = getTagname();
      const checkDataBattle: DataBattleMemory[]= JSON.parse(localStorage.getItem(tagname as string) || "[]");
      
      const syncData = (): void => {        
        if (checkDataBattle.length > 0) {
          let dataFinded: boolean = false;

          checkDataBattle.length > 0 && checkDataBattle.forEach((data: any, i: number) => {
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
      dataCity.forEach((el: CityData) => (el.name == city ? setImageSource(el.imgSrc) : null));
    }
  }, [dataVillain, dataCity]);

  // Close Modal Handler
  const closeModal = (): void => {
    setIsOpen(false);
  };

  // Even Handler when fight is ended
  const fightEndhandler = (villainHP: number, heroHP: number): void => {
    heroHP == 0 ? setStatusBattle("YOU LOSE") : villainHP == 0 ? setStatusBattle("YOU WIN") : null;
    setTimeout(() => {
      heroHP == 0 ? resultAlert("Sorry You LOSE 😭") : villainHP == 0 ? resultAlert("Congratulations, You WIN 🎉") : null;
      closeModal();
    }, 650);
  };

  // Battle Handler
  const startBattle = (HPHero: number, HPVillain: number): void => {
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
          response.heroHP < heroHP! ? 
            setStatusBattle("YOU LOSE, YOUR HP -10%") 
            : 
          response.villainHP < villainHP! ? 
            setStatusBattle("YOU WIN, VILLAIN HP -10%") 
            : null;

          //set bar hero and villain HP from response
          setVillainHP(response.villainHP), setHeroHP(response.heroHP);

          //close modal and show alert when the fight is end
          response.heroHP == 0 || response.villainHP == 0 ? 
            fightEndhandler(response.villainHP, response.heroHP) 
            : 
            null;

          //set final status battle, WIN or LOSE from response
          // response.heroHP == 0 ? setStatusBattle("YOU LOSE") : response.villainHP == 0 ? setStatusBattle("YOU WIN") : null;

          //save data battle in local storage

          const tagname: string | undefined = getTagname();
          const initialName = localStorage.getItem(tagname as string);

          let dataSaveBattle: DataBattleMemory[] = [];

          if (initialName) {
            dataSaveBattle = JSON.parse(localStorage.getItem(tagname as string) || "{}");
          }

          const checkData = (newData: DataBattleMemory): void => {
            if (dataSaveBattle.length == 0) {
              dataSaveBattle.push(newData);
            } else {
              let finded: boolean = false;
              dataSaveBattle.length > 0 && dataSaveBattle.forEach((data: DataBattleMemory, i:number) => {
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

          checkData(
            { versus: `${hero}VS${dataVillain[0]?.name}`, 
              villainHP: response.villainHP, 
              heroHP: response.heroHP
            });
            
          window.localStorage.setItem(tagname as string, JSON.stringify(dataSaveBattle));
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
        <div className={styles.modal} 
          style={
            { backgroundImage: `linear-gradient(#b3b3b3b2, #ffffffb1),url(${imageSource})`, backgroundSize: "cover" }}
        >
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
                    className={styles.progressBar} 
                    style={{ width: `${villainHP}%`, background: `${expVillainCheck(villainHP!)}` }}>
                  </div>
                </div>

                {/* ------------------------------ Battle Status -----------------------------  */}
                <div className={styles.boxStatus}>
                  <h2>{statusBattle}</h2>
                </div>

                {/*  ----------------------------- HP Bar Player -----------------------------  */}
                <div className={styles.progress}>
                  <p className={styles.statusHP}>{heroHP} %</p>
                  <div 
                    className={styles.progressBar} 
                    style={{ width: `${heroHP}%`, background: `${expHeroCheck(heroHP!)}` }}>

                </div>
                </div>
                <h3>- {hero?.toUpperCase()} -</h3>

                {/*  ----------------------------- Action Control -----------------------------  */}
                <div className={styles.modalActions}>
                  <div className={styles.actionsContainer}>

                    <button 
                      className={loadingButton ? styles.disableBtn : styles.fightBtn} 
                      disabled={loadingButton ? true : false} 
                      onClick={() => 
                        startBattle(heroHP!, villainHP ? villainHP : villainHP == 0 ? 0 : dataVillain[0].maxHP)}>
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
