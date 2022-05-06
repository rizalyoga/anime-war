import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCity, loadings } from "@/data/api";
import CardCity from "@/components/cards/CardCity";
import LoadingComponent from "@/components/loading/Loading";
import Layout from "@/layout/Layout";
import Private from "@/layout/PrivateLayout";

function City() {
  const [dataCity, setDataCity] = useState([]);
  const [loading, setLoading] = useState();

  const router = useRouter();
  const { hero, idCharacter } = router.query;

  //Get City Data
  useEffect(() => {
    const authUser = localStorage.getItem("userAuth");
    if (authUser) {
      getCity()
        .then((response) => setDataCity(response))
        .then(() => setLoading(false));
      setLoading(loadings);
    }
  }, []);

  //Back to Home Handler
  const goesToHome = () => {
    router.push("/home");
  };

  //Goes to Skill Character Page
  const goesToSkill = () => {
    router.push(`/skill/${idCharacter}?hero=${hero}`);
  };

  return (
    <Layout>
      <Private>
        <div className="container">
          <div className="header">
            <div className="desc-header">
              <h1>
                Welcome <span>{hero?.toUpperCase()}</span>
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
      </Private>
    </Layout>
  );
}

export default City;
