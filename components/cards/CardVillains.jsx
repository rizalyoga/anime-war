import React, { useState } from "react";
import Modal from "../modal/Modal";
import { useParams } from "react-router-dom";
import { ButtonLose, ButtonWin } from "../Button/Button";

function CardVillain({ dataVillains, dataCity }) {
  const [isOpen, setIsOpen] = useState(false);
  const [idVillain, setIdVillain] = useState("");

  const { nameCharacter } = useParams();
  const { nameCity } = useParams();

  // Choose villain Handler
  const choosingVillain = (id) => {
    setIsOpen(true);
    setIdVillain(id);
  };

  return (
    <>
      {dataCity?.map((el) =>
        el.name == nameCity
          ? el.villains.map((data) => (
              <div className="card" key={data.id}>
                <img className="image" src={data.imgSrc} alt="avatar" />
                <h1>{data.name}</h1>
                {JSON.parse(localStorage.getItem(`${nameCharacter}VS${data.name}`))?.villainHP == 0 ? (
                  <ButtonWin />
                ) : JSON.parse(localStorage.getItem(`${nameCharacter}VS${data.name}`))?.heroHP == 0 ? (
                  <ButtonLose />
                ) : (
                  <button className="choose-btn" onClick={() => choosingVillain(data.id)}>
                    Fight {data.name}
                  </button>
                )}
              </div>
            ))
          : null
      )}
      {isOpen && <Modal setIsOpen={setIsOpen} idVillain={idVillain} />}
    </>
  );
}

export default CardVillain;
