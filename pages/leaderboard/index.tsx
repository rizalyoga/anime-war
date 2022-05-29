import React, { FC } from "react";
import LeaderBoards from "@/components/pages/leaderBoards/LeaderBoards";

export interface DataHistoryBattle {
  created_at: string;
  gametag: number;
  hero: string;
  id: number;
  published_at: string;
  score: number;
  updated_at: string;
  villain: string;
}

export interface DataLeaderboards {
  created_at: string;
  id : number;
  leaderboards?: DataHistoryBattle[];
  name: string;
  published_at: string;
  updated_at: string;
}

interface PropsLeaderboard {
  propsLeaderboard: DataLeaderboards[];
}

const Leaderboard: FC <PropsLeaderboard>= ({ propsLeaderboard }) => {
  
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
