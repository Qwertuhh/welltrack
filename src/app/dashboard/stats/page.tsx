"use client";

import EmotionChart from "@/components/chart/emotion";
import ExpensesInvesmentChart from "@/components/chart/expenses-invesment/chart";
import PieChart from "@/components/chart/expenses-invesment/piechart";
import SentimentChart from "@/components/chart/sentiment";
import Header from "@/components/header";
import { getFromLocalStorage } from "@/lib/store";
import { AlarmCheck, Wallet } from "lucide-react";
import TaskPieChart from "@/components/chart/tasks/piechart";
import TaskBarChart from "@/components/chart/tasks/barchart";
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
];
function Stats() {
  if (dbs.some((db) => db === null)) {
    throw new Error("No data to show");
  }

  return (
    <>
      <Header message="To get statistics" route="Stats" />
      <div className="flex flex-row gap-1 w-full item-fit ">
        <div className="flex flex-col gap-4 w-[50%] bg-[#151414] rounded-2xl bg-blend-lighten p-2.5 items-stretch">
          <h2 className="text-2xl font-bold gap-0.5 items-center mx-auto">
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
        <div className="flex flex-col gap-4 w-[50%] bg-[#151414] rounded-2xl bg-blend-lighten p-2.5">
          <h2 className="text-2xl font-bold flex gap-1 items-center justify-center">
            Finances
            <Wallet />
          </h2>
          <div className="w-full flex flex-col gap-4 ">
            <ExpensesInvesmentChart />
            <PieChart />
          </div>
        </div>
      </div>
      {/* Task */}
      <div className="flex flex-col gap-2 w-full item-fit p-2.5 bg-[#151414] rounded-2xl bg-blend-lighten">
        <h2 className="text-2xl font-bold flex gap-1 items-center justify-center">
          Finances
          <AlarmCheck/>
        </h2>
        <div className="w-full flex flex-col gap-4 ">
          <TaskPieChart />
          <TaskBarChart />
        </div>
      </div>
    </>
  );
}

export default Stats;
