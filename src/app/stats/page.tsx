"use client";
import EmotionChart from "@/components/chart/emotion";
import SentimentChart from "@/components/chart/sentiment";
import Header from "@/components/header";
import { getFromLocalStorage } from "@/lib/store";

type Data = {
  day: string;
  sentiment: number;
  emotion: number;
  other: number;
};

const data: Data[] = getFromLocalStorage("emotion_sentiment")!;
const mode = data[data.length - 1].sentiment > 0 ? true : false;

const dbs = [
  getFromLocalStorage("emotion_sentiment")!,
  getFromLocalStorage("highlights")!,
  getFromLocalStorage("fromAI")!,
  getFromLocalStorage("tasks")!,
  getFromLocalStorage("finances")!,
]
function Stats() {
  if (dbs.some((db) => db === null)) {
    throw new Error("No data to show");
  }

  return (
    <>
      <Header message="To get statistics" route="Stats" />
      <div className="flex flex-col gap-8 w-full item-fit ">
        <div className="flex flex-col gap-4 m-2.5 w-[50%] bg-[#151414] rounded-2xl bg-blend-lighten p-2.5">
          <h2 className="text-2xl font-bold ">
            Feelings Stats
            {/* To Add emoji of sentiment */}
            <span className="size-5xl my-auto">
              {mode ? (
                <span className="text-green-500 text-3xl align-middle">😀</span>
              ) : (
                <span className="text-red-500 text-3xl align-middle">😔</span>
              )}
            </span>
          </h2>
          <div className="w-full flex flex-col gap-4 ">
            <SentimentChart />
            <EmotionChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default Stats;
