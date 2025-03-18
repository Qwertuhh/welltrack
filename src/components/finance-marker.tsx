import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

type Data = {
  title: string;
  isInvestmentOExpense: boolean;
  amount: number;
};

// Sample data
const financeData: Data[] = [
  {
    title: "Invoice #1",
    isInvestmentOExpense: true,
    amount: 123.45,
  },
  {
    title: "Invoice #2",
    isInvestmentOExpense: false,
    amount: 67.89,
  },
  {
    title: "Invoice #3",
    isInvestmentOExpense: true,
    amount: 90.12,
  },
  {
    title: "Invoice #4",
    isInvestmentOExpense: false,
    amount: 45.67,
  },
];

function FinanceMarker() {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newAmount, setNewAmount] = useState<number>(0);
  const [isInvestment, setIsInvestment] = useState<boolean>(true);

  // Function to add new finance entry
  const handleAddEntry = () => {
    if (newTitle && newAmount > 0) {
      const newData: Data = {
        title: newTitle,
        isInvestmentOExpense: isInvestment,
        amount: newAmount,
      };
      financeData.push(newData); // Add to the current data (in a real app, you'd update the state or backend)
      setNewTitle("");
      setNewAmount(0);
      setIsInvestment(true);
    }
  };

  return (
    <div className="flex flex-col text-zinc-50">
      <h1 className="text-2xl font-bold font-mono mx-auto">Finance Marker</h1>
      <hr className="w-2/3 mx-auto m-1.5 h-0.5 bg-gray-400"></hr>
      <div className="flex flex-col overflow-auto p-4">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {financeData.map((invoice, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{invoice.title}</TableCell>
                <TableCell>
                  {invoice.isInvestmentOExpense ? "Investment" : "Expense"}
                </TableCell>
                <TableCell className="text-right">
                  ₹{invoice.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">
                ₹
                {financeData
                  .reduce((acc, curr) => acc + curr.amount, 0)
                  .toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Form to add new entry */}
      <div className="flex flex-col p-6 bg-zinc-900 m-2 rounded-lg">
        <h3 className="text-lg font-semibold text-zinc-100 font-mono">
          Add New Finance Entry
        </h3>

        <div className="flex space-x-2 items-center">
          <Input
            id="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
            className="bg-zinc-800 border-zinc-700"
          />
          <Input
            id="amount"
            value={newAmount}
            onChange={(e) => setNewAmount(Number(e.target.value))}
            type="number"
            placeholder="Amount"
            className="bg-zinc-800 border-zinc-700"
          />
          <Checkbox
            id="is-investment"
            checked={isInvestment}
            title="Is Investment?"
            className="size-8"
            onCheckedChange={() => setIsInvestment(!isInvestment)}
          />
          <Button
            onClick={handleAddEntry}
            className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FinanceMarker;
