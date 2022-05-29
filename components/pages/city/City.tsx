import React, { FC,useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCity, loadings } from "@/data/api";
import CardCity from "@/components/cards/CardCity";
import LoadingComponent from "@/components/loading/Loading";
import Layout from "@/layout/Layout";
import Private from "@/layout/PrivateLayout";
import getToken from "../../../utils/getCookies";

interface ChoosenHero {
  hero?: string;
  idCharacter?: string;
}

interface HeroesData {
  id: number;
  name: string;
}

interface villainsData {
  cityId: number;
  id: number;
  imgSrc: string;
  name: string;
}

interface CityData {
  heroes: HeroesData[];
  id: number;
  imgSrc: string;
  name: string;
  villains: villainsData[];
}

const City: FC = () => {
  const [dataCity, setDataCity] = useState<CityData[]>([]);
  const [loading, setLoading] = useState<boolean | null>();

  const router = useRouter();
  const { hero, idCharacter }: ChoosenHero = router.query;

  //Get City Data
  useEffect(() => {
    const authUser = getToken();
    if (authUser) {
      getCity()
        .then((response) => setDataCity(response))
        .then(() => setLoading(false));
      setLoading(loadings);
    }
  }, []);

  //Back to Home Handler
  const goesToHome = (): void => {
    router.push("/home");
  };

  //Goes to Skill Character Page
  const goesToSkill = (): void => {
    router.push(`/skill/${idCharacter}?hero=${hero}`);
  };

  return (
    <Layout title={"City"}>
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
