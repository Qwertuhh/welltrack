import { FC } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getFromLocalStorage } from "@/lib/store";
import { CalendarDays, Sparkles, MessageSquare } from "lucide-react";

const dayData: { day: string; emotion: number; sentiment: number }[] =
  getFromLocalStorage("emotion_sentiment") ?? [];
const highlightData: string[][] = getFromLocalStorage("highlights") ?? [];
const aiMessages: string[] = getFromLocalStorage("fromAI") ?? [];

const HighlightWithAIMessageCard: FC<{
  day: string;
  highlight: string[];
  aiMessage: string;
  emotion: number;
  sentiment: number;
}> = ({ day, highlight, aiMessage, emotion, sentiment }) => {
  // Get mood emoji based on emotion and sentiment
  const getMoodEmoji = (emotion: number) => {
    const average = (emotion);
    if (average >= 0.7) return "😄";
    if (average >= 0.4) return "🙂";
    if (average >= 0) return "😐";
    if (average >= -0.4) return "🙁";
    return "😞";
  };

  return (
    <Card className="w-full overflow-hidden border border-border transition-all duration-300 hover:shadow-md dark:bg-zinc-900 bg-white">
      <CardHeader className="bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl font-medium">
              {day} {getMoodEmoji(emotion)}
            </CardTitle>
          </div>
          <Badge
            variant="outline"
            className={
              sentiment > 0.3
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                : sentiment < -0.3
                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
            }
          >
            Sentiment: {(sentiment * 100).toFixed(0)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <h3 className="font-medium text-foreground">Highlights</h3>
            </div>
            <ScrollArea className="h-24 rounded-md border bg-muted/40 p-2">
              <ul className="space-y-2">
                {highlight.length > 0 ? (
                  highlight.map((text, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-foreground">{text}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-muted-foreground italic">
                    No highlights recorded
                  </li>
                )}
              </ul>
            </ScrollArea>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-indigo-500" />
              <h3 className="font-medium text-foreground">AI Insights</h3>
            </div>
            <div className="rounded-md border bg-muted/40 p-3">
              {aiMessage ? (
                <p className="text-sm text-foreground">{aiMessage}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No AI message available
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 px-4 py-2">
        <p className="text-xs text-muted-foreground">
          Recorded on{" "}
          {new Date(day).toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </p>
      </CardFooter>
    </Card>
  );
};

function StreakCard() {

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      <div className="flex flex-col space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Your Highlights & Insights
        </h2>
        <p className="text-muted-foreground text-sm">
          Review your daily highlights and AI-generated insights
        </p>
      </div>

      {dayData.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {dayData
            .map((data, index) => (
              <HighlightWithAIMessageCard
                key={data.day}
                day={data.day}
                highlight={highlightData[index] ?? []}
                aiMessage={aiMessages[index] ?? ""}
                emotion={data.emotion}
                sentiment={data.sentiment}
              />
            ))
            .reverse()}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/20">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <CalendarDays className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium text-foreground mb-1">No entries yet</h3>
          <p className="text-sm text-muted-foreground">
            Start tracking your daily highlights and emotions to see them here.
          </p>
        </div>
      )}
    </div>
  );
}

export default StreakCard;
