import EmotionChart from "@/components/chart/emotion";
import SentimentChart from "@/components/chart/sentiment";
import Header from "@/components/header";
function Stats() {
  return (
    <>
      <Header message="To get statistics" route="Stats" />
      <div className="flex flex-col gap-8 w-full item-fit">
        <div className="p-1.5 m-2.5 w-[50%] flex flex-col gap-4">
          <SentimentChart />
          <EmotionChart />
        </div>
      </div>
    </>
  );
}

export default Stats;
