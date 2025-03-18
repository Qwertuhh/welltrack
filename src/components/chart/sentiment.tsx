"use client";

import { Activity, TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getFromLocalStorage } from "@/lib/store";

type Data = {
  day: string;
  sentiment: number;
  emotion: number;
  other: number;
};

const chartData: Data[] = getFromLocalStorage("emotion_sentiment")!;

const chartConfig = {
  Sentiment: {
    label: "Sentiment",
    color: "hsl(var(--chart-1))",
    icon: Activity,
  },
} satisfies ChartConfig;

function SentimentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Chart</CardTitle>
        <CardDescription>
          Showing total sentiment trends for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="sentiment"
              type="step"
              fill="var(--color-sentiment)"
              fillOpacity={0.4}
              stroke="var(--color-sentiment)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Current Sentiment Trend
              <span className="text-muted-foreground">
                {chartData[chartData.length - 1].sentiment}
              </span>
              {chartData[chartData.length - 1].sentiment > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-800" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-800" />
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              This range from 0 to 1
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default SentimentChart;
