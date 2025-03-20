'use client';
import Markdown from "react-markdown";

function Chat({ chat }: { chat: [number, string] }) {
  if (chat[0] === 2) {
    return (
      <div className="w-full flex mb-3 items-stretch">
        <div className="flex flex-grow justify-center">
          <div className="animate-spin h-5 w-5 border-b-2 border-white rounded-full"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex mb-3 items-stretch">
      {/* Chat[0] is 0 for AI, 1 for user */}
      <div
        className={`flex flex-grow ${
          chat[0] === 1 ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`max-w-[80%] px-4 py-2 rounded-lg shadow-sm ${
            chat[0] === 0
              ? "bg-stone-900 text-white" // AI messages style
              : "bg-zinc-200 text-black" // User messages style
          }`}
        >
          <div className="font-light text-base">
            <Markdown>{chat[1]}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
