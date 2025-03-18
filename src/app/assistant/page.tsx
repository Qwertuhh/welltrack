'use client';
import Chat from "@/components/assistant/chat";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function AssistantPage() {
  const [chatData, setChatData] = useState([
    [0, "Hello! How can I help you today?"],
  ]);
  const handelClick = () => {
    const message = document.getElementById("message") as HTMLInputElement;
    setChatData([...chatData, [1, message.value]]);
  };
  return (
    <>
      <Header message="Ask me anything" route="Assistant" />
      <div className="w-full">
        {chatData.map((chat, key) => (
          <Chat key={key} chat={chat as [number, string]} />
        ))}
      </div>
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
