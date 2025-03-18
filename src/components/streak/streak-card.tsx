import { FC } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Adjust imports as per your structure
import { getFromLocalStorage } from "@/lib/store";

const dayData: { day: string; emotion: number; sentiment: number }[] =
  getFromLocalStorage("emotion_sentiment") ?? [];
const highlightData: string[][] = getFromLocalStorage("highlights") ?? [];
const aiMessages: string[] = getFromLocalStorage("fromAI") ?? [];

//* Card Component to show Day, Highlights, and AI Message
const HighlightWithAIMessageCard: FC<{
  day: string;
  highlight: string[];
  aiMessage: string;
}> = ({ day, highlight, aiMessage }) => (
  <Card className="w-full p-6 shadow-lg rounded-lg mb-4 bg-[#100f0f] text-white dark:bg-[#100f0f]">
    <CardHeader>
      <CardTitle className="text-xl font-bold text-lime-300 dark:text-lime-300">
        Day: {day}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <h3 className="font-sans text-lg text-gray-100 dark:text-white underline">
          Highlights
        </h3>
        <ul className="space-y-1 text-gray-300 dark:text-gray-200">
          {highlight.map((text, index) => (
            <li key={index} className="text-sm my-4 mx-2">
              <span className="font-medium bg-zinc-700 dark:bg-gray-600 p-1 rounded">
                {text}
              </span>
            </li>
          ))}
        </ul>
        <h3 className="font-sans text-lg text-gray-100 dark:text-white mt-4 underline">
          AI Message
        </h3>
        <p className="text-sm text-gray-300 dark:text-gray-200 font-sans border rounded p-2">
          {aiMessage}
        </p>
      </div>
    </CardContent>
    <CardFooter>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        End of highlights and AI message.
      </p>
    </CardFooter>
  </Card>
);

//* Main Page Component to render Days with Highlights and AI Messages
function StreakCard() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 font-mono text-gray-900 dark:text-white">
        Today&apos;s Highlights & AI Messages
      </h2>
      <div className="space-y-4">
        {dayData
          .map((data, index) => (
            <HighlightWithAIMessageCard
              key={data.day}
              day={data.day}
              highlight={highlightData[index] ?? []}
              aiMessage={aiMessages[index] ?? ""}
            />
          ))
          .reverse()}
      </div>
    </div>
  );
}

export default StreakCard;
