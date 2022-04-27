import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCity, loadings } from "../../../data/api";
import CardCity from "../../cards/CardCity";
import LoadingComponent from "../../loading/Loading";

function City() {
  const [dataCity, setDataCity] = useState([]);
  const [loading, setLoading] = useState();

  const router = useRouter();
  const { hero, idCharacter } = router.query;

  //Get City Data
  useEffect(() => {
    getCity()
      .then((response) => setDataCity(response))
      .then(() => setLoading(false));
    setLoading(loadings);
  }, []);

  //Back to Home Handler
  const goesToHome = () => {
    router.push("/");
  };

  //Goes to Skill Character Page
  const goesToSkill = () => {
    router.push(`/skill/${idCharacter}?hero=${hero}`);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="desc-header">
          <h1>
            Welcome <span>{hero}</span>
          </h1>
          <h2>Choose your battle ground !</h2>
        </div>
        <div className="control-button">
          <button className="choose-btn" onClick={goesToSkill}>
            Hero Information
          </button>
          <button className="choose-btn" onClick={goesToHome}>
            Other Hero
          </button>
        </div>
      </div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="card-container">
          <CardCity dataCity={dataCity} />
        </div>
      )}
    </div>
  );
}

export default City;
