"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/header";
import axios from "axios";
import { appendToLocalStorage, setToLocalStorage } from "@/lib/store";
import { Toaster, toast } from "react-hot-toast";
import FinanceMarker from "@/components/finance-marker";
import TaskTracker from "@/components/task-marker";

function DiaryPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const textareaElement = document?.getElementById(
      "diary"
    ) as HTMLTextAreaElement;
    setToLocalStorage("diary", textareaElement.value);
    axios
      .post("/api/data", { data: textareaElement.value })
      .then((response) => {
        appendToLocalStorage("data", response.data.response);
        toast.success("Diary saved successfully!");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  return (
    <>
      <Toaster />
      <Header route="Diary" message="Do't forget to write your diary" />
      <div className="flex flex-row w-full h-full place-content-evenly">
        <div className="w-full gap-2.5 h-screen flex flex-col">
          <form
            onSubmit={handleSubmit}
            className="w-full h-[85%] flex flex-col gap-1.5"
          >
            <Label htmlFor="message" className="mx-auto text-2xl font-sans">
              Tell me about your day today
            </Label>
            <hr className="w-2/3 mx-auto m-1.5 h-0.5 bg-gray-400"></hr>
            <Textarea
              id="diary"
              placeholder="write your diary here"
              className="w-full p-5 h-full focus:outline-none"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mx-auto cursor-pointer">
              I&apos;m complete with my diary
            </button>
          </form>
        </div>
      </div>
            <FinanceMarker />
            <TaskTracker />
    </>
  );
}
export default DiaryPage;
