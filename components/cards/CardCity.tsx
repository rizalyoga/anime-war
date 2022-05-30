import React from "react";
import styles from "./card-city.module.css";
import { useRouter } from "next/router";
// Interfaces 
import { CityData } from "../pages/city/City"

interface PropsCity {
  dataCity: CityData[];
}

interface Query {
  idCharacter?: string;
  hero?: string;
}

function CardCity({ dataCity }: PropsCity) {
  const router = useRouter();
  const { idCharacter, hero }: Query = router.query;

  // GOES TO VILAIN PAGE HANDLER
  const goesToVillain = (idCharacter:number, nameCharacter:string, cityName:string) => {
    // navigate(`/villains/${idCharacter}/${nameCharacter}/${cityName}`);
    router.push(`/villains/${idCharacter}?hero=${nameCharacter}&city=${cityName}`);
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
                  .filter((el) => el.id == Number(idCharacter))
                  .map((el) => (
                    <button key={el.id} className="choose-btn" 
                      onClick={() => goesToVillain(Number(idCharacter), hero as string, data.name)}>
                      Battle in {data.name}
                    </button>
                  ))
              : data.heroes.map((el) =>
                  el.id == Number(idCharacter) ? (
                    <button key={el.id} className="choose-btn" 
                      onClick={() => goesToVillain(Number(idCharacter), hero as string, data.name)}>
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
