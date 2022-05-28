import React from "react";
import LeaderBoards from "@/components/pages/leaderBoards/LeaderBoards";
import {DataLeaderboards} from "./interfacesLeaderboard"

interface PropsLeaderboard {
  propsLeaderboard: DataLeaderboards[];
}

const Leaderboard = ({ propsLeaderboard }:PropsLeaderboard) => {
  
  return (
    <>
      <LeaderBoards data={propsLeaderboard} />
    </>
  );
};

export async function getServerSideProps (context:any) {
  const query = context.query;
  // const token = req.cookies.userAuth;

  if (!query.filter) {
    const response = await fetch(`https://thrive-project-be.herokuapp.com/gametags`);

    const propsLeaderboard = await response.json();
    return { props: { propsLeaderboard } };
  }

  // Pass data to the page via props
  return { props: {} };
}

export default Leaderboard;