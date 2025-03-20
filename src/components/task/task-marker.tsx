'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { getFromLocalStorage, setToLocalStorage } from "@/lib/store";
import SeparatorLine from "@/components/seprator-line";
import { ScrollArea } from "@radix-ui/react-scroll-area";

// Task data structure
type TaskData = {
  daily: [string, string][];
  weekly: [number | string, string][];
  yearly: [number | string, string][];
};

const taskData: TaskData = getFromLocalStorage<TaskData>("tasks") || {
  daily: [],
  weekly: [],
  yearly: [],
};

// Status descriptions
const statusLabels: { [key: number]: string } = {
  0: "Not scheduled",
  1: "Scheduled",
  2: "Daily Progress",
  3: "Incomplete",
  4: "In Progress",
  5: "Done",
};

function TaskTracker() {
  const [newTask, setNewTask] = useState<string>("");
  const [taskStatus, setTaskStatus] = useState<number>(0);
  const [taskType, setTaskType] = useState<"daily" | "weekly" | "yearly">(
    "daily"
  );
  const [taskDateTime, setTaskDateTime] = useState<string>("");
  const [showDateField, setShowDateField] = useState<boolean>(false);

  // Update date field visibility when status changes
  useEffect(() => {
    setShowDateField(taskStatus === 1);
  }, [taskStatus]);

  // Function to add new task entry
  const handleAddTask = () => {
    if (newTask) {
      let entry;

      if (taskType === "daily") {
        entry = [taskDateTime || new Date().toISOString(), newTask];
        taskData.daily.push(entry as [string, string]);
      } else {
        if (taskStatus === 1 && taskDateTime) {
          // For scheduled tasks with date
          entry = [taskStatus, taskDateTime, newTask];
        } else {
          // For other status types
          entry = [taskStatus, newTask];
        }

        if (taskType === "weekly") {
          taskData.weekly.push(entry as [number | string, string]);
        } else if (taskType === "yearly") {
          taskData.yearly.push(entry as [number | string, string]);
        }
      }

      // Log the task data to console
      console.log("Task added:", entry);
      console.log("Current task data:", JSON.stringify(taskData, null, 2));
      setToLocalStorage("tasks", taskData);

      // Reset form
      setNewTask("");
      setTaskStatus(0);
      setTaskDateTime("");
      setShowDateField(false);
    }
  };

  // Helper function to get status badge color
  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return "bg-zinc-700";
      case 1:
        return "bg-blue-700";
      case 2:
        return "bg-purple-700";
      case 3:
        return "bg-yellow-700";
      case 4:
        return "bg-orange-700";
      case 5:
        return "bg-green-700";
      default:
        return "bg-zinc-700";
    }
  };

  // Helper function to render task rows
  const renderTaskRow = (task: any[], index: number, type: string) => {
    if (task.length === 3) {
      // This is a scheduled task with date
      return (
        <TableRow key={`${type}-${index}`}>
          <TableCell>
            <span
              className={`px-2 py-1 rounded text-sm ${getStatusColor(
                task[0] as number
              )}`}
            >
              {statusLabels[task[0] as number]} ({task[1]})
            </span>
          </TableCell>
          <TableCell>{task[2]}</TableCell>
        </TableRow>
      );
    } else if (type === "daily") {
      return (
        <TableRow key={`${type}-${index}`}>
          <TableCell className="font-medium">{task[0]}</TableCell>
          <TableCell>{task[1]}</TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow key={`${type}-${index}`}>
          <TableCell>
            <span
              className={`px-2 py-1 rounded text-sm ${getStatusColor(
                task[0] as number
              )}`}
            >
              {statusLabels[task[0] as number]}
            </span>
          </TableCell>
          <TableCell>{task[1]}</TableCell>
        </TableRow>
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-50">
      <h1 className="text-2xl font-bold font-mono mx-auto p-4">Task Tracker</h1>
      <SeparatorLine />
      <ScrollArea>
        <div className="flex flex-col p-4">
          <div className="space-y-6">
            {/* Daily Tasks */}
            <div>
              <h2 className="text-xl font-semibold font-mono mb-2">
                Daily Tasks
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Date & Time</TableHead>
                    <TableHead>Task</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taskData.daily.map((task, index) =>
                    renderTaskRow(task, index, "daily")
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Weekly Tasks */}
            <div>
              <h2 className="text-xl font-semibold font-mono mb-2">
                Weekly Tasks
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Status</TableHead>
                    <TableHead>Task</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taskData.weekly.map((task, index) =>
                    renderTaskRow(task, index, "weekly")
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Yearly Tasks */}
            <div>
              <h2 className="text-xl font-semibold font-mono mb-2">
                Yearly Tasks
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Status</TableHead>
                    <TableHead>Task</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taskData.yearly.map((task, index) =>
                    renderTaskRow(task, index, "yearly")
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Form to add new task */}
      <div className="flex flex-col p-6 bg-zinc-900 m-2 rounded-lg">
        <h3 className="text-lg font-semibold text-zinc-100 font-mono mb-4">
          Add New Task
        </h3>

        <div className="flex flex-wrap gap-2 items-center">
          <Select
            value={taskType}
            onValueChange={(value) =>
              setTaskType(value as "daily" | "weekly" | "yearly")
            }
          >
            <SelectTrigger className="w-32 bg-zinc-800 border-zinc-700">
              <SelectValue placeholder="Task Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>

          {taskType === "daily" && (
            <Input
              type="datetime-local"
              value={taskDateTime}
              onChange={(e) => setTaskDateTime(e.target.value)}
              className="bg-zinc-800 border-zinc-700 w-58"
            />
          )}

          {(taskType === "weekly" || taskType === "yearly") && (
            <Select
              value={taskStatus.toString()}
              onValueChange={(value) => setTaskStatus(parseInt(value))}
            >
              <SelectTrigger className="w-46 bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Not scheduled</SelectItem>
                <SelectItem value="1">Scheduled</SelectItem>
                <SelectItem value="2">Daily Progress</SelectItem>
                <SelectItem value="3">Incomplete</SelectItem>
                <SelectItem value="4">In Progress</SelectItem>
                <SelectItem value="5">Done</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Show date field only when status is "Scheduled" (1) */}
          {showDateField &&
            (taskType === "weekly" || taskType === "yearly") && (
              <Input
                type={taskType === "weekly" ? "date" : "date"}
                value={taskDateTime}
                onChange={(e) => setTaskDateTime(e.target.value)}
                className="bg-zinc-800 border-zinc-700 w-46"
              />
            )}

          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task description"
            className="bg-zinc-800 border-zinc-700 flex-1"
          />

          <Button
            onClick={handleAddTask}
            className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TaskTracker;
