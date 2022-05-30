import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GoesToCityButton } from "@/components/buttons/Button";
import { getVillains, loadings } from "@/data/api";
import LoadingComponent from "@/components/loading/Loading";
import CardVillains from "@/components/cards/CardVillains";
import { useGetCity } from "@/hooks/useGetCity";
import Layout from "@/layout/Layout";
import Private from "@/layout/PrivateLayout";
import getToken from "../../../utils/getCookies";

export interface VillainsData {
  id: number;
  imgSrc: string;
  name: string;
}

interface Query {
  idCharacter? :string;
  hero? :string;
  city? :string;
}

const Villains= () => {
  const [dataVillains, setDataVillains] = useState<VillainsData[]>([]);
  const [loading, setLoading] = useState<boolean | null>();

  const router = useRouter();
  const { idCharacter, hero, city }: Query = router.query;

  //Get Villains Data
  useEffect(() => {
    const authUser = getToken();
    if (authUser) {
      getVillains()
        .then((response) => setDataVillains(response))
        .then(() => setLoading(false));
      setLoading(loadings);
    }
  }, []);

  const { dataCity } = useGetCity();

  return (
    <Layout title={"Villains"}>
      <Private>
        <div className="container">
          <div className="header">
            <div className="desc-header">
              <h1>
                Villain List in <span>{city}</span>
              </h1>
              <h2>Choose your Villain !</h2>
            </div>
            <div className="control-button">
              <GoesToCityButton characterId={idCharacter} characterName={hero} />
            </div>
          </div>
            {loading ? 
              <LoadingComponent /> 
              : 
              <div 
                className="card-container">
                  {dataVillains && <CardVillains dataVillains={dataVillains} dataCity={dataCity} />}
              </div>
            }
        </div>
      </Private>
    </Layout>
  );
}

export default Villains;
