"use client";

import { CalendarCheck} from "lucide-react";
import { Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

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

type ConvertedData = {
  timeType: "daily" | "weekly" | "yearly";
  length: number;
  fill: string;
};

const chartData: ChartData = getFromLocalStorage("tasks")!;

// Function to convert the chartData to the desired format
function convertChartData(data: ChartData, colors: string[]): ConvertedData[] {
  const result: ConvertedData[] = [
    {
      timeType: "daily",
      length: data.daily.length,
      fill: colors[0],
    },
    {
      timeType: "weekly",
      length: data.weekly.length,
      fill: colors[1],
    },
    {
      timeType: "yearly",
      length: data.yearly.length,
      fill: colors[2],
    },
  ];

  return result;
}

// Chart configuration
const chartConfig = {
  daily: {
    label: "Daily",
    color: "hsl(var(--chart-1))",
  },
  weekly: {
    label: "Weekly",
    color: "hsl(var(--chart-2))",
  },
  yearly: {
    label: "Yearly",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const colors = ["#0088FE", "#00C49F", "#FFBB28"];
// Convert the chartData
const convertedData = convertChartData(chartData, colors);

// Custom render function for the center label
const renderCenterLabel = ({
  viewBox,
}: {
  viewBox?: { cx: number; cy: number };
}) => {
  if (!viewBox) return null;
  const { cx, cy } = viewBox;
  const totalTasks = convertedData.reduce((acc, { length }) => acc + length, 0);

  return (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
      <tspan x={cx} y={cy} fontSize="20px" fontWeight="bold" fill="#333">
        {totalTasks}
      </tspan>
      <tspan x={cx} y={cy + 20} fontSize="12px" fill="#666">
        Tasks
      </tspan>
    </text>
  );
};

function TaskPieChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Task Progress Distribution</CardTitle>
        <CardDescription>Daily, Weekly, and Yearly Tasks</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-64"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={convertedData}
              dataKey="length" // Use 'length' instead of 'value'
              nameKey="timeType"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
              labelLine={false}
              activeIndex={0}
            //   fill={(props) => props.fill} // Dynamic fill based on data
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            >
              {/* Center label */}
              {renderCenterLabel({ viewBox: { cx: 0, cy: 0 } })}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Task ration by time period <CalendarCheck className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing task distribution by time period
        </div>
      </CardFooter>
    </Card>
  );
}

export default TaskPieChart;
