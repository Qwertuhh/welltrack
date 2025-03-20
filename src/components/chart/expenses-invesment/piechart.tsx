"use client";

import { Coins} from "lucide-react";
import { Pie, PieChart, Label, Sector } from "recharts";
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

// Data type definition (Expenses and Investments)
type Data = [number, string, string, number]; // [type (expense/investment), date, title, amount]

// Get the chart data from local storage
const chartData: Data[] = getFromLocalStorage("finances")!;

// Initialize totals for investment and expenses
let totalInvestment = 0;
let totalExpense = 0;

// Process the chartData to sum expenses and investments
chartData.forEach(([type, , , amount]) => {
  if (type === 1) {
    totalInvestment += amount; // Investment (type 1)
  } else {
    totalExpense += amount; // Expense (type 0)
  }
});

// Pie chart data structure
const pieData = [
  { name: "Investment", value: totalInvestment , fill: "var(--color-investment)"},
  { name: "Expenses", value: totalExpense , fill: "var(--color-expenses)"},
];

// Chart configuration
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

function FinancePieChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Investment vs Expenses</CardTitle>
        <CardDescription>Showing total Investment and Expenses</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieData}
              dataKey="value" // Use the 'value' to define the size of the pie slices
              nameKey="name" // Use the 'name' to label each sector
              innerRadius={60}
              outerRadius={80}
              strokeWidth={150}
              labelLine={false} // Disable the lines to labels
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            >
              <Label
                position="center"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                ₹{totalInvestment + totalExpense}
              </Label>
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm items-start">
        <div className="flex items-start gap-2 font-medium leading-none">
          Trenad of Your Finances
          <Coins />
        </div>
        <div className="leading-none text-muted-foreground">
          Treans of your expenses and investments of all time
        </div>
      </CardFooter>
    </Card>
  );
}

export default FinancePieChart;