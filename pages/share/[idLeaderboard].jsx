import React from "react";
import SharePage from "@/components/pages/sharePage/SharePage";

const SharesPage = ({ data }) => {
  return (
    <>
      <SharePage data={data} />
    </>
  );
};

export async function getStaticPaths(context) {
  const res = await fetch(`https://thrive-project-be.herokuapp.com/leaderboards`);
  const data = await res.json();

  const allPathId = data.map((leaderboard) => ({ params: { idLeaderboard: `${leaderboard.id}` } }));
  // console.log(allPathId);

  return {
    paths: allPathId,
    fallback: false, // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const id = context.params.idLeaderboard;

  const res = await fetch(`https://thrive-project-be.herokuapp.com/leaderboards/${id}`);
  const data = await res.json();

  return {
    props: {
      data: data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 5, // In seconds
  };
}

export default SharesPage;
