import React from "react";
import SharePage from "@/components/pages/sharePage/SharePage";

const SharesPage = ({ propsDataShare, seos }) => {
  console.log(propsDataShare);
  return (
    <>
      <SharePage data={propsDataShare} seos={seos} />
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

  if (res.status !== 200) {
    return { notFound: true };
  }

  const data = await res.json();

  const seos = {
    title: `${data.gametag?.name || null} - ${data.hero} VS ${data.villain}`,
    description: `Player ${data.gametag?.name || null} berhasil mengalahkan Villain ${data.villain} menggunakan hero ${data.hero}`,
    author: data.gametag?.name || null,
    keywords: [data.gametag?.name || null, data.villain, data.hero],
    canonicalUrl: `https://anime-war-rizalyoga.vercel.app/share/${params.idLeaderboard}`,
    ogTitle: `${data.gametag?.name || null} - ${data.hero} VS ${data.villain}`,
    ogDescription: `Player ${data.gametag?.name || null} berhasil mengalahkan Villain ${data.villain} menggunakan hero ${data.hero}`,
    ogImageUrl: `https://anime-war-rizalyoga.vercel.app/_next/image?url=%2Fswords.png&w=384&q=100`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogType: "information",
    ogUrl: `https://anime-war-rizalyoga.vercel.app/share/${params.idLeaderboard}`,
    twitterCard: "summary",
    twitterTitle: `${data.gametag?.name || null} - ${data.hero} VS ${data.villain}`,
    twitterDescription: `Player ${data.gametag?.name || null} berhasil mengalahkan Villain ${data.villain} menggunakan hero ${data.hero}`,
    twitterUrl: `https://anime-war-rizalyoga.vercel.app/share/${params.idLeaderboard}`,
  };

  return {
    props: {
      propsDataShare: data,
      seos,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 1, // In seconds
  };
}

export default SharesPage;
