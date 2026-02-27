import dynamic from "next/dynamic";

const QuestPortfolio = dynamic(() => import("@/components/game/QuestPortfolio"), {
  ssr: false,
});

export default function HomePage() {
  return <QuestPortfolio />;
}
