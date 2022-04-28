import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GoesToCityButton } from "../../buttons/Button";
import { getVillains, loadings } from "../../../data/api";
import LoadingComponent from "../../loading/Loading";
import CardVillains from "../../cards/CardVillains";
import { useGetCity } from "../../../hooks/useGetCity";
import Layout from "../../../layout/Layout";

function Villains() {
  const [dataVillains, setDataVillains] = useState([]);
  const [loading, setLoading] = useState();

  const router = useRouter();
  const { idCharacter, hero } = router.query;

  //Get Villains Data
  useEffect(() => {
    getVillains()
      .then((response) => setDataVillains(response))
      .then(() => setLoading(false));
    setLoading(loadings);
  }, []);

  const { dataCity } = useGetCity();

  return (
    <Layout>
      <div className="container">
        <div className="header">
          <div className="desc-header">
            <h1>Villain List</h1>
            <h2>Choose your Villain !</h2>
          </div>
          <div className="control-button">
            <GoesToCityButton characterId={idCharacter} characterName={hero} />
          </div>
        </div>
        {loading ? <LoadingComponent /> : <div className="card-container">{dataVillains && <CardVillains dataVillains={dataVillains} dataCity={dataCity} />}</div>}
      </div>
    </Layout>
  );
}

export default Villains;
