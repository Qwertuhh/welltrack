"use client";

import { StickyNote } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

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

type ChartData = {
  daily: [string, string][];
  weekly: [number, string][];
  yearly: [number, string][];
};

// Mapping the scheduledType numbers to string statuses
const statusMapping: { [key: number]: string } = {
  0: "@New Not scheduled",
  1: "@New scheduled (DateTime)",
  2: "@New Daily Progress",
  3: "Incomplete",
  4: "Still in progress",
  5: "Done",
};

type ConvertedData = {
  scheduledType: typeof statusMapping[keyof typeof statusMapping];
  numberOfTasks: number;
};

const chartData: ChartData = getFromLocalStorage("tasks")!;

// Function to convert the chartData to the desired format
function convertChartData(data: ChartData): ConvertedData[] {
  const result: ConvertedData[] = Object.entries(statusMapping).map(([, value], index) => ({
    scheduledType: value,
    numberOfTasks: data.daily.filter(([]) => statusMapping[1] === value).length +
      data.weekly.filter(([scheduledType]) => scheduledType === index + 1).length +
      data.yearly.filter(([scheduledType]) => scheduledType === index + 1).length,
  }));
  

  return result;
}

// Convert the chartData
const convertedData = convertChartData(chartData);

const chartConfig = {
  ScheduledType: {
    label: "Scheduled Type",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function TaskBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled Tasks</CardTitle>
        <CardDescription>
          Types of scheduled tasks like Done, Incomplete and etc
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={convertedData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="scheduledType"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="numberOfTasks" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="numberOfTasks"
              layout="vertical"
              fill="var(--color-schedule)"
              radius={4}
            >
              <LabelList
                dataKey="scheduledType"
                position="insideLeft"
                offset={8}
                className="fill-[var(--card)]"
                fontSize={12}
              />
              <LabelList
                dataKey="numberOfTasks"
                position="right"
                offset={8}
                className="fill-[#fff]"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Showing types of scheduled <StickyNote className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Scheduled Types To complete your work on time
        </div>
      </CardFooter>
    </Card>
  );
}

export default TaskBarChart;
