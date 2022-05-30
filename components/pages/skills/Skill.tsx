import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSkill, loadings } from "@/data/api";
import CardSkill from "@/components/cards/Card";
import { GoesToCityButton } from "@/components/buttons/Button";
import LoadingComponent from "@/components/loading/Loading";
import Layout from "@/layout/Layout";
import Private from "@/layout/PrivateLayout";
import getToken from "../../../utils/getCookies";

interface QueryHero {
  idCharacter?:  string;
  hero?: string;
}

interface HerosSkills {
  id: number;
  imgSrc: string;
  name: string;
}

interface HerosInformationData {
  age?: number;
  id?: number;
  imgSrc?: string;
  name?: string;
  origin?: string;
  skills?: HerosSkills[];
}

const Skill = () => {
  const [dataSkill, setDataSkill] = useState<HerosInformationData | null>();
  const [loading, setLoading] = useState<boolean | null>();

  const router = useRouter();
  const { idCharacter, hero }: QueryHero = router.query;
  
  //Get Skills Data
  useEffect(() => {
    const authUser = getToken();
    if (authUser) {
      if (idCharacter) {
        getSkill(idCharacter)
          .then((response) => setDataSkill(response))
          .then(() => setLoading(false));
      }
      setLoading(loadings);
    }
  }, [idCharacter]);

  return (
    <Layout title={`Skills ${hero}`}>
      <Private>
        <div className="container">
          <h1 className="title-page">
            <span>{hero?.toUpperCase()} </span> skills
          </h1>
            {loading ? 
              <LoadingComponent /> 
              : 
              <div className="card-container">{dataSkill && <CardSkill skill={dataSkill} />}</div>
            }
          <div className="button-wrap">
            <GoesToCityButton characterId={dataSkill?.id?.toString()} characterName={dataSkill?.name} />
          </div>
        </div>
      </Private>
    </Layout>
  );
}

export default Skill;
