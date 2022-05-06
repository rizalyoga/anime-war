import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSkill, loadings } from "@/data/api";
import CardSkill from "@/components/cards/Card";
import { GoesToCityButton } from "@/components/buttons/Button";
import LoadingComponent from "@/components/loading/Loading";
import Layout from "@/layout/Layout";
import Private from "@/layout/PrivateLayout";

function Skill() {
  const [dataSkill, setDataSkill] = useState({});
  const [loading, setLoading] = useState();

  const router = useRouter();
  const { idCharacter, hero } = router.query;

  //Get Skills Data
  useEffect(() => {
    const authUser = localStorage.getItem("userAuth");
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
    <Layout>
      <Private>
        <div className="container">
          <h1 className="title-page">
            <span>{hero?.toUpperCase()} </span> skills
          </h1>
          {loading ? <LoadingComponent /> : <div className="card-container">{dataSkill && <CardSkill skill={dataSkill} />}</div>}
          <div className="button-wrap">
            <GoesToCityButton characterId={dataSkill.id} characterName={dataSkill.name} />
          </div>
        </div>
      </Private>
    </Layout>
  );
}

export default Skill;
