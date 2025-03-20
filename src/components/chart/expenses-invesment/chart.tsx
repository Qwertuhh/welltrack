"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

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
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getFromLocalStorage } from "@/lib/store";
import { PiggyBank } from "lucide-react";

type Data = [number, string, string, number];
// 1. expenses/investment (0, 1) respectively
// 2. date (e.g., "2024-03-01")
// 3. title
// 4. amount

// Get the chart data from local storage (ensure it's correctly structured)
const chartData: Data[] = getFromLocalStorage("finances")!;

// Group and sum the amounts by date for investments and expenses
const groupedData = chartData.reduce((acc, [type, date, , amount]) => {
  // Initialize date group if not present
  acc[date] = acc[date] ?? { date, investment: 0, expense: 0 };

  // Group by type (investment or expense) and sum amounts
  if (type === 1) {
    acc[date].investment += amount;
  } else {
    acc[date].expense += amount;
  }

  return acc;
}, {} as Record<string, { date: string; investment: number; expense: number }>);

// Convert grouped data to an array for recharts
const chartDataProcessed = Object.values(groupedData);

const chartConfig = {
  Investment: {
    label: "Investment",
    color: "hsl(var(--chart-1))",
  },
  Expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function ExpensesInvesmentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment vs Expenses</CardTitle>
        <CardDescription>
          Showing total investment and expenses by day
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartDataProcessed} // Use the processed chart data
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date" // Use the `date` property for the X-axis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 10)} // Show full date (e.g., "2024-03-01")
            />
            <YAxis hide />
            <Tooltip
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            {/* Investment Area */}
            <Area
              dataKey="investment"
              type="linear"
              fill="var(--color-investment)"
              fillOpacity={0.4}
              stroke="var(--color-investment)"
              strokeWidth={2}
            />
            {/* Expenses Area */}
            <Area
              dataKey="expense"
              type="linear"
              fill="var(--color-expenses)"
              fillOpacity={0.4}
              stroke="var(--color-expenses)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Financial trends by day <PiggyBank />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              March 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ExpensesInvesmentChart;
