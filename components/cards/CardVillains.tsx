import React, { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import { useRouter } from "next/router";
import { ButtonLose, ButtonWin } from "../buttons/Button";
import getTagname from "../../utils/getTagname";

//Interfaces
import {CityData} from "../pages/city/City"
import {VillainsData} from "../pages/villain/Villains"

interface PropsVillains {
  dataVillains: VillainsData[];
  dataCity: CityData[];
}

export interface DataBattleMemory {
  heroHP: number;
  villainHP: number;
  versus: string;
}

interface Query {
  hero?: string;
  city?: string;
}

const CardVillain = ({ dataVillains, dataCity }: PropsVillains) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [idVillain, setIdVillain] = useState<string>("");

  const router = useRouter();
  const { hero, city }: Query = router.query;

  // Choose villain Handler
  const choosingVillain = (id: number) => {
    setIsOpen(true);
    setIdVillain(id.toString());
  };

  // Button Component
  const winButtonResult = (heroName: string, villainName: string) => {
    return <ButtonWin heroName={heroName} villainName={villainName} />;
  };

  const loseButtonResult = () => {
    return <ButtonLose />;
  };

  const fightButton = (villainName: string, dataId: number) => {
    return (
      <button className="choose-btn" onClick={() => choosingVillain(dataId)}>
        Fight {villainName}
      </button>
    );
  };

  // Check battle data in localStorage
  const checkDataReusltBattle = (value: string, heroName: string, villainName: string, dataId: number) => {
    
    const tagname: string | undefined = getTagname();

    const dataBattleSaved: DataBattleMemory[] = JSON.parse(localStorage.getItem(tagname as string) || '{}');
    let RESULT: string = "";

    if (!dataBattleSaved) return fightButton(villainName, dataId);

    dataBattleSaved.map((data) => {
      if (data.versus == value) {
        if (data.villainHP == 0) {
          RESULT = "WIN";
        } else if (data.heroHP == 0) {
          RESULT = "LOSE";
        }
      }
    });

    return RESULT == "LOSE" ? 
              loseButtonResult() :
           RESULT == "WIN" ? 
              winButtonResult(heroName, villainName) : fightButton(villainName, dataId);
  };

  return (
    <>
      {dataCity?.map(
        (el) =>
          el.name == city &&
          el.villains.map((data) => (
            <div className="card" key={data.id}>
              <img className="image" src={data.imgSrc} alt="avatar" />
              <h1>{data.name}</h1>

              {checkDataReusltBattle(`${hero}VS${data.name}`, hero as string, data.name, data.id)}
              
            </div>
          ))
      )}
      {isOpen && <Modal setIsOpen={setIsOpen} idVillain={idVillain} />}
    </>
  );
};

export default CardVillain;
