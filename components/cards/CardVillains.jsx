import React, { useState } from "react";
import Modal from "../modal/Modal";
import { useRouter } from "next/router";
import { ButtonLose, ButtonWin } from "../buttons/Button";

function CardVillain({ dataVillains, dataCity }) {
  const [isOpen, setIsOpen] = useState(false);
  const [idVillain, setIdVillain] = useState("");

  const router = useRouter();
  const { hero, city } = router.query;

  // Choose villain Handler
  const choosingVillain = (id) => {
    setIsOpen(true);
    setIdVillain(id);
  };

  return (
    <>
      {dataCity?.map((el) =>
        el.name == city
          ? el.villains.map((data) => (
              <div className="card" key={data.id}>
                <img className="image" src={data.imgSrc} alt="avatar" />
                <h1>{data.name}</h1>
                {JSON.parse(localStorage.getItem(`${hero}VS${data.name}`))?.villainHP == 0 ? (
                  <ButtonWin />
                ) : JSON.parse(localStorage.getItem(`${hero}VS${data.name}`))?.heroHP == 0 ? (
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
