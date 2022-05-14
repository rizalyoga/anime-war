import React, { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import { useRouter } from "next/router";
import { ButtonLose, ButtonWin } from "../buttons/Button";

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
    const tagname = localStorage.getItem("nickname");
    const dataBattleSave = JSON.parse(localStorage.getItem(tagname));

    if (!dataBattleSave) return fightButton(villainName, dataId);

    dataBattleSave.forEach((data) => {
      if (data.versus == value) {
        if (data.villainHP == 0) {
          console.log("win versus villain :", villainName);
          return <ButtonWin heroName={heroName} villainName={villainName} />;
        } else if (data.heroHP == 0) {
          console.log("lose versus villain :", villainName);
          return <ButtonLose />;
        }
      }
    });
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

              {/* {JSON.parse(localStorage.getItem(`${hero}VS${data.name}`))?.villainHP == 0 ? (
                <ButtonWin heroName={hero} villainName={data.name} />
              ) : JSON.parse(localStorage.getItem(`${hero}VS${data.name}`))?.heroHP == 0 ? (
                <ButtonLose />
              ) : (
                <button className="choose-btn" onClick={() => choosingVillain(data.id)}>
                  Fight {data.name}
                </button>
              )} */}
            </div>
          ))
      )}
      {isOpen && <Modal setIsOpen={setIsOpen} idVillain={idVillain} />}
    </>
  );
};

export default CardVillain;
