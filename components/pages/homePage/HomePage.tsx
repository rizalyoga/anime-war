import React, { useState, useEffect,FC } from "react";
import { getAllData, loadings } from "@/data/api";
import Card from "@/components/cards/Card";
import { GoesToCityButton } from "@/components/buttons/Button";
import { confirmationtAlert } from "@/components/alerts/alert";
import LoadingComponent from "@/components/loading/Loading";
import Layout from "@/layout/Layout";
import Private from "@/layout/PrivateLayout";
import getToken from "../../../utils/getCookies";

interface DataHeroCharacter {
  age: number;
  id: number;
  imgSrc: string;
  name: string;
  origin: string;
}

const HomePage: FC = () => {
  const [dataCharacter, setDataCharacter] = useState<DataHeroCharacter[]>([]);
  const [dataSkill] = useState<any>([]);
  const [chooseCharacter, setChooseCharacter] = useState<string>("");
  const [idCaracter, setIdCharacter] = useState<string>("");
  const [loading, setLoading] = useState<boolean | null>();
  

  // HANDLE CHOOSEN CHARACTER
  const chooseTheCharacter = (name: string, id: string): void => {
    setChooseCharacter(name);
    setIdCharacter(id);
  };

  //  GET ALL DATA HEROES
  useEffect(() => {
    const authUser = getToken();
    if (authUser) {
      getAllData()
        .then((response) => setDataCharacter(response))
        .then(() => setLoading(false));
      setLoading(loadings);
    }
  }, []);

  // RESET GAME HANDLER
  const resetGame = (): void => {
    confirmationtAlert();
  };

  return (
    <Layout title={"Hero-Character"}>
      <Private>
        <div className="container">
          <div className="header">
            <div className="desc-header">
              <h1 className="title-page">Choose Your Hero</h1>
            </div>
            <div className="button-control">
              <button className="choose-btn" onClick={resetGame}>
                Reset Game
              </button>
            </div>
          </div>
          {loading ? (
            <LoadingComponent />
          ) : (
            <div className="card-container">
              <Card dataCharacter={dataCharacter} background={idCaracter} updateChoosing={chooseTheCharacter} skill={dataSkill} />
            </div>
          )}

          <div className="button-wrap">
            <GoesToCityButton characterId={idCaracter} characterName={chooseCharacter} />
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default HomePage;
