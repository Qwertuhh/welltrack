"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
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

type Data = { day: string; emotion: number; sentiment: number };

const chartData: Data[] = getFromLocalStorage("emotion_sentiment")!;

const chartConfig = {
  Emotion: {
    label: "Emotion",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function SentimentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emotion Chart</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
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
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="emotion"
              type="natural"
              fill="var(--color-emotion)"
              fillOpacity={0.4}
              stroke="var(--color-emotion)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Current Emotion Trend
              <span className="bg-gray-300 px-2 text-black rounded">
                {(chartData[chartData.length - 1].emotion).toFixed(2)}
              </span>
              {chartData[chartData.length - 1].emotion > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-800" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-800" />
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              This range from -10 to 10
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default SentimentChart;
