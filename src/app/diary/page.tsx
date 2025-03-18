"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/header";
import axios from "axios";
import { appendToLocalStorage, setToLocalStorage } from "@/lib/store";
import { Toaster, toast } from "react-hot-toast";

function DiaryPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const textareaElement = document?.getElementById(
      "diary"
    ) as HTMLTextAreaElement;
    // localStorage.setItem("diary", textareaElement.value);
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
      <div className="w-full gap-2.5 h-full flex flex-col">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col gap-1.5"
        >
          <Label htmlFor="message" className="text-left text-2xl font-sans">
            Tell me about your day today
          </Label>
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
    </>
  );
}
export default DiaryPage;
