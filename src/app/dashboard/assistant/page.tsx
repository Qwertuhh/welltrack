"use client";
import Chat from "@/components/assistant/chat";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getFromLocalStorage } from "@/lib/store";
import axios from "axios";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Volume2, VolumeX } from "lucide-react";

function AssistantPage() {
  const [chatData, setChatData] = useState([
    [0, "Hello! How can I help you today?"],
  ]);
  const [speak, setSpeak] = useState(false);
  const handelClick = () => {
    const message = document.getElementById("message") as HTMLInputElement;
    const userDataLocal = `
    Today's Diary: ${getFromLocalStorage("diary")},
    Finances: ${getFromLocalStorage("finances")},
    Tasks: ${getFromLocalStorage("tasks")},
    EmotionAndSentiment: ${getFromLocalStorage("emotion_sentiment")},
    `;

    const updatedChatData = [...chatData, [1, `${message.value}`]];
    setChatData(updatedChatData);
    setChatData([...updatedChatData, [2, ""]]);
    axios
      .post("/api/assistant", {
        userData: userDataLocal,
        issue: message.value,
      })
      .then((response) => {
        const newChatData = [...updatedChatData, [0, response.data.response]];
        setChatData(newChatData.slice(0, -1));
        setChatData(newChatData);
        if (speak) {
          speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(
            response.data.response
          );
          utterance.voice = speechSynthesis.getVoices()[87];
          utterance.rate = 1.25;
          speechSynthesis.speak(utterance);
        } // To speak

        //* Clearing the input
        message.value = "";
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
  return (
    <>
      <Header message="Ask me anything" route="Assistant" />
      {/* Speak Toggle */}
      <div className="flex items-center gap-2 border rounded-md p-2 absolute top-2 right-2">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setSpeak(!speak);
            if (speak) speechSynthesis.cancel();
          }}
        >
          {speak ? <Volume2 /> : <VolumeX />}
        </div>
      </div>
      <ScrollArea className="h-[72vh] rounded-md border p-4">
        {chatData.map((chat, key) => (
          <Chat key={key} chat={chat as [number, string]} />
        ))}
      </ScrollArea>
      <div className="bottom-2 absolute w-[90%] mx-auto  text-white flex items-end justify-center">
        <div className="w-full max-w-xl px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            {/* Chat Input and Button */}
            <div className="w-full flex items-center gap-4 bg-zinc-800 p-4 rounded-lg shadow-lg">
              <Input
                type="text"
                id="message"
                placeholder="Ask me anything"
                className="flex-1 bg-zinc-700 text-white focus:ring-2 focus:ring-blue-500 rounded-md p-3 focus:ring-offset-2 focus:outline-none"
              />
              <Button
                type="submit"
                onClick={handelClick}
                className="w-[80px] bg-blue-500 hover:bg-blue-600 text-white rounded-md py-3"
              >
                Chat
              </Button>
            </div>

            {/* Footer message */}
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Final decision is in our hands only. This is just to counsel you.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssistantPage;
