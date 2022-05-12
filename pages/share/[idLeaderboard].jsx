import React from "react";
import SharePage from "@/components/pages/sharePage/SharePage";

const SharesPage = ({ data, seos }) => {
  return (
    <>
      <SharePage data={data} seos={seos} />
    </>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`https://thrive-project-be.herokuapp.com/leaderboards`);
  const data = await res.json();

  const allPathId = data.map((leaderboard) => ({ params: { idLeaderboard: `${leaderboard.id}` } }));

  return {
    paths: allPathId,
    // Type of fallback : true, false or 'blocking'
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const id = params.idLeaderboard;

  const res = await fetch(`https://thrive-project-be.herokuapp.com/leaderboards/${id}`);
  const data = await res.json();

  const seos = {
    title: `${data.gametag.name} - ${data.hero} VS ${data.villain}`,
    description: `Player ${data.gametag.name} berhasil mengalahkan Villain ${data.villain} menggunakan hero ${data.hero}`,
    author: data.gametag.name,
    keywords: [data.gametag.name, data.villain, data.hero],
    canonicalUrl: `https://anime-war-rizalyoga.vercel.app/share/${params.idLeaderboard}`,
    ogTitle: `${data.gametag.name} - ${data.hero} VS ${data.villain}`,
    ogDescription: `Player ${data.gametag.name} berhasil mengalahkan Villain ${data.villain} menggunakan hero ${data.hero}`,
    ogImageUrl: `https://anime-war-rizalyoga.vercel.app/_next/image?url=%2Fswords.png&w=384&q=100`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogType: "information",
    ogUrl: `https://anime-war-rizalyoga.vercel.app/share/${params.idLeaderboard}`,
    twitterCard: "summary",
    twitterTitle: `${data.gametag.name} - ${data.hero} VS ${data.villain}`,
    twitterDescription: `Player ${data.gametag.name} berhasil mengalahkan Villain ${data.villain} menggunakan hero ${data.hero}`,
    twitterUrl: `https://anime-war-rizalyoga.vercel.app/share/${params.idLeaderboard}`,
  };

  return {
    props: {
      data: data,
      seos,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 1, // In seconds
  };
}

export default SharesPage;
