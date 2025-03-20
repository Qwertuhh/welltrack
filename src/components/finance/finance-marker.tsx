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
import { useState, useEffect } from "react";
import { getFromLocalStorage, setToLocalStorage } from "@/lib/store";

// New finance data structure - an array of [type, date, title, amount]
type FinanceEntry = [number, string, string, number]; // [0/1, date, title, amount]

function FinanceMarker() {
  // Initialize state
  const [financeData, setFinanceData] = useState<FinanceEntry[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newAmount, setNewAmount] = useState<number>(0);
  const [isInvestment, setIsInvestment] = useState<boolean>(true);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = getFromLocalStorage("finances");

    // If there's existing data in the old format, convert it
    if (storedData && !Array.isArray(storedData)) {
      const convertedData: FinanceEntry[] = [];
      const currentDate = new Date().toISOString().split("T")[0];

      // Convert old object format to new array format
      Object.entries(storedData).forEach(([title, value]) => {
        if (Array.isArray(value) && value.length === 2) {
          const [type, amount] = value as [number, number];
          convertedData.push([type, currentDate, title, amount]);
        }
      });

      setFinanceData(convertedData);
      // Save the converted data back to localStorage
      setToLocalStorage("finances", convertedData);
    } else if (Array.isArray(storedData)) {
      // If data is already in the correct format, use it
      setFinanceData(storedData);
    }
  }, []);

  // Function to add new finance entry
  const handleAddEntry = () => {
    if (newTitle && newAmount !== 0) {
      // Set the finance type (0 for expense, 1 for investment)
      const financeType = isInvestment ? 1 : 0;

      // Get current date string
      const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

      // Set the amount (positive for all types)
      const adjustedAmount = Math.abs(newAmount);

      // Create new entry
      const newEntry: FinanceEntry = [
        financeType,
        currentDate,
        newTitle,
        adjustedAmount,
      ];

      // Add to finance data
      const updatedFinanceData = [...financeData, newEntry];
      setFinanceData(updatedFinanceData);

      // Save to localStorage
      setToLocalStorage("finances", updatedFinanceData);

      // Log the finance data
      console.log("Finance entry added:", newEntry);

      // Reset form
      setNewTitle("");
      setNewAmount(0);
      setIsInvestment(true);
    }
  };

  // Function to format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return error instanceof Error ? error.message : dateString; // Return as-is if parsing fails
    }
  };

  // Calculate totals
  const totalInvestments = financeData
    .filter((entry) => entry && entry[0] === 1)
    .reduce((sum, entry) => sum + entry[3], 0);

  const totalExpenses = financeData
    .filter((entry) => entry && entry[0] === 0)
    .reduce((sum, entry) => sum + entry[3], 0);

  // Handle delete entry
  const handleDeleteEntry = (index: number) => {
    const updatedData = [...financeData];
    updatedData.splice(index, 1);
    setFinanceData(updatedData);
    setToLocalStorage("finances", updatedData);
  };

  return (
    <div className="flex flex-col text-zinc-50">
      <h1 className="text-2xl font-bold font-mono mx-auto">Finance Tracker</h1>
      <hr className="w-2/3 mx-auto m-1.5 h-0.5 bg-gray-400"></hr>

      {/* Summary section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
        <div className="bg-zinc-800 p-3 rounded-md">
          <h3 className="text-sm font-medium text-zinc-400">
            Total Investments
          </h3>
          <p className="text-xl font-bold text-green-500">
            ₹{totalInvestments.toFixed(2)}
          </p>
        </div>
        <div className="bg-zinc-800 p-3 rounded-md">
          <h3 className="text-sm font-medium text-zinc-400">Total Expenses</h3>
          <p className="text-xl font-bold text-red-500">
            ₹{totalExpenses.toFixed(2)}
          </p>
        </div>
        <div className="bg-zinc-800 p-3 rounded-md">
          <h3 className="text-sm font-medium text-zinc-400">Net Spendings</h3>
          <p
            className={`text-xl font-bold ${
              totalInvestments - totalExpenses >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            ₹{(totalInvestments - totalExpenses).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex flex-col overflow-auto p-4">
        <Table>
          <TableCaption>A list of your recent transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {financeData && financeData.length > 0 ? (
              financeData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(entry[1])}</TableCell>
                  <TableCell className="font-medium">{entry[2]}</TableCell>
                  <TableCell>
                    {entry[0] === 1 ? "Investment" : "Expense"}
                  </TableCell>
                  <TableCell
                    className={`text-right ${
                      entry[0] === 1 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    ₹{entry[3].toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteEntry(index)}
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-zinc-800"
                    >
                      ✕
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-4 text-zinc-500"
                >
                  No transactions recorded yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                ₹{(totalInvestments + totalExpenses).toFixed(2)}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Form to add new entry */}
      <div className="flex flex-col p-6 bg-zinc-900 m-2 rounded-lg">
        <h3 className="text-lg font-semibold text-zinc-100 font-mono mb-4">
          Add New Finance Entry
        </h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            id="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
            className="bg-zinc-800 border-zinc-700"
          />
          <Input
            id="amount"
            value={newAmount || ""}
            onChange={(e) => setNewAmount(Number(e.target.value))}
            type="number"
            placeholder="Amount"
            className="bg-zinc-800 border-zinc-700"
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is-investment"
              checked={isInvestment}
              className="size-5"
              onCheckedChange={() => setIsInvestment(!isInvestment)}
            />
            <label htmlFor="is-investment" className="text-sm cursor-pointer">
              {isInvestment ? "Investment" : "Expense"}
            </label>
          </div>
          <Button
            onClick={handleAddEntry}
            className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100"
          >
            Add Spending
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FinanceMarker;
