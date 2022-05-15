import React, { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import { useRouter } from "next/router";
import { ButtonLose, ButtonWin } from "../buttons/Button";
import getTagname from "../../utils/getTagname";

const CardVillain = ({ dataVillains, dataCity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [idVillain, setIdVillain] = useState("");

  const router = useRouter();
  const { hero, city } = router.query;

  // Choose villain Handler
  const choosingVillain = (id) => {
    setIsOpen(true);
    setIdVillain(id);
  };

  // Button Component
  const winButtonResult = (heroName, villainName) => {
    return <ButtonWin heroName={heroName} villainName={villainName} />;
  };

  const loseButtonResult = () => {
    return <ButtonLose />;
  };

  const fightButton = (villainName, dataId) => {
    return (
      <button className="choose-btn" onClick={() => choosingVillain(dataId)}>
        Fight {villainName}
      </button>
    );
  };

  // Check battle data in localStorage
  const checkDataReusltBattle = (value, heroName, villainName, dataId) => {
    const tagname = getTagname();
    const dataBattleSaved = JSON.parse(localStorage.getItem(tagname));
    const RESULT = "";

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

    return RESULT == "LOSE" ? loseButtonResult() : RESULT == "WIN" ? winButtonResult(heroName, villainName) : fightButton(villainName, dataId);
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

              {checkDataReusltBattle(`${hero}VS${data.name}`, hero, data.name, data.id)}
            </div>
          ))
      )}
      {isOpen && <Modal setIsOpen={setIsOpen} idVillain={idVillain} />}
    </>
  );
};

export default CardVillain;
