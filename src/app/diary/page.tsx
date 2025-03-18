"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/header";
import axios from "axios";
import { appendToLocalStorage, setToLocalStorage } from "@/lib/store";
import { Toaster, toast } from "react-hot-toast";
import FinanceMarker from "@/components/finance/finance-marker";
import TaskTracker from "@/components/task/task-marker";
import SeparatorLine from "@/components/seprator-line";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function DiaryPage() {
  const router = useRouter();
  const handleSubmit = () => {
    const textareaElement = document?.getElementById(
      "diary"
    ) as HTMLTextAreaElement;
    setToLocalStorage("diary", textareaElement.value);
    axios
      .post("/api/sentimentAndEmotion", {
        data: textareaElement.value,
        finances: localStorage.getItem("finances")! || {data: [], weekly: [], yearly: []},
      })
      .then((response) => {
        appendToLocalStorage(
          "emotion_sentiment",
          response.data.response.emotion_sentiment
        );
        console.log(response.data.response);
        appendToLocalStorage(
          "highlights",
          response.data.response.fromCompose.highlights
        );
        appendToLocalStorage(
          "fromAI",
          response.data.response.fromCompose.fromAI
        );
        if (response.data.response.emotion_sentiment.sentiment == 0) {
          toast("You are having a bad day!", { icon: "🥺" });
          setInterval(() => {
            router.push("/assistant");
          }, 2000);
        }
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
        <div className="w-[90%] gap-2.5 h-[85vh] flex flex-col">
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mx-auto cursor-pointer"
            onClick={() => {
              handleSubmit();
            }}
            type="submit"
          >
            I&apos;m done with my diary
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            First done with your finances and tasks
          </p>
          <div className="w-full h-full flex flex-col gap-1.5">
            <Label htmlFor="message" className="mx-auto text-2xl font-sans">
              Tell me about your day today
            </Label>
            <SeparatorLine />
            <Textarea
              id="diary"
              placeholder="write your diary here"
              className="w-full p-5 h-full focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="w-[90%] mx-auto  h-full">
        <FinanceMarker />
        <TaskTracker />
      </div>
    </>
  );
}
export default DiaryPage;
