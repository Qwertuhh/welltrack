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
import { getFromLocalStorage, setToLocalStorage } from "@/lib/store";

// Finance data structure
type FinanceData = {
  [key: string]: [number, number];
};

// Sample data
const financeData: FinanceData = getFromLocalStorage<FinanceData>("finances") || {};
// const financeData: FinanceData = {
//   "Invoice #1": [1, 123.45], // Investment, positive amount
//   "Invoice #2": [0, 67.89], // Expense, positive amount
//   "Invoice #3": [1, 90.12], // Investment, positive amount
//   "Invoice #4": [0, 45.67], // Expense, positive amount
// };

function FinanceMarker() {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newAmount, setNewAmount] = useState<number>(0);
  const [isInvestment, setIsInvestment] = useState<boolean>(true);

  // Function to add new finance entry
  const handleAddEntry = () => {
    if (newTitle && newAmount !== 0) {
      // Set the finance type (0 for expense, 1 for investment)
      const financeType = isInvestment ? 1 : 0;

      // Set the amount (positive for all types)
      const adjustedAmount = Math.abs(newAmount);

      // Add to finance data
      financeData[newTitle] = [financeType, adjustedAmount];

      // Log the finance data to console
      console.log("Finance entry added:", {
        [newTitle]: [financeType, adjustedAmount],
      });
      console.log(
        "Current finance data:",
        JSON.stringify({ finance: financeData }, null, 2)
      );
      setToLocalStorage("finances", financeData);

      // Reset form
      setNewTitle("");
      setNewAmount(0);
      setIsInvestment(true);
    }
  };

  return (
    <div className="flex flex-col text-zinc-50">
      <h1 className="text-2xl font-bold font-mono mx-auto">Finance Tracker</h1>
      <hr className="w-2/3 mx-auto m-1.5 h-0.5 bg-gray-400"></hr>
      <div className="flex flex-col overflow-auto p-4">
        <Table>
          <TableCaption>A list of your recent transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(financeData).map(
              ([title, [type, amount]], index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{title}</TableCell>
                  <TableCell>{type === 1 ? "Investment" : "Expense"}</TableCell>
                  <TableCell
                    className={`text-right ${
                      type === 1 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    ₹{amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">
                ₹
                {Object.values(financeData)
                  .reduce((acc, [_, amount]) => acc + amount, 0)
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
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is-investment"
              checked={isInvestment}
              title="Is Investment?"
              className="size-8"
              onCheckedChange={() => setIsInvestment(!isInvestment)}
            />
            <span className="text-sm">Investment</span>
          </div>
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

