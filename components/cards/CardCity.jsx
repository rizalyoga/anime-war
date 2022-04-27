import React from "react";
import styles from "./card-city.module.css";
import { useRouter } from "next/router";

function CardCity({ dataCity }) {
  const router = useRouter();
  const { idCharacter, hero } = router.query;

  // GOES TO VILAIN PAGE HANDLER
  const goesToVillain = (idCharacter, nameCharacter, cityName) => {
    // navigate(`/villains/${idCharacter}/${nameCharacter}/${cityName}`);
    console.log(id, hero);
  };

  return (
    <>
      {dataCity?.map((data) => (
        <div className={styles["card-wraper"]} key={data.id}>
          <div className={styles["city-image"]}>
            <img src={data.imgSrc} alt="arena-image" />
          </div>
          <div className={styles["button-title-city"]}>
            {data.heroes.length > 1
              ? data.heroes
                  .filter((el) => el.id == idCharacter)
                  .map((el) => (
                    <button key={el.id} className="choose-btn" onClick={() => goesToVillain(idCharacter, nameCharacter, data.name)}>
                      Battle in {data.name}
                    </button>
                  ))
              : data.heroes.map((el) =>
                  el.id == idCharacter ? (
                    <button key={el.id} className="choose-btn" onClick={() => goesToVillain(idCharacter, nameCharacter, data.name)}>
                      Battle in {data.name}
                    </button>
                  ) : (
                    <button key={el.id} disabled={true} className="disable-btn">
                      Battle in {data.name}
                    </button>
                  )
                )}
          </div>
        </div>
      ))}
    </>
  );
}

export default CardCity;
