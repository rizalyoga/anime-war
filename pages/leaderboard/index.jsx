import React from "react";
import LeaderBoards from "@/components/pages/leaderBoards/LeaderBoards";

const Leaderboard = ({ data }) => {
  return (
    <>
      <LeaderBoards data={data} />
    </>
  );
};
export async function getServerSideProps(context) {
  const { req } = context;
  const query = context.query;
  // const token = req.cookies.userAuth;

  if (!query.filter) {
    const response = await fetch(`https://thrive-project-be.herokuapp.com/gametags`);

    const data = await response.json();
    return { props: { data } };
  }

  // Pass data to the page via props
  return { props: {} };
}

export default Leaderboard;
