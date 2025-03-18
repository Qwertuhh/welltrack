function Chat({ chat }: { chat: [number, string] }) {
  return (
    <div className="w-full flex mb-2 items-stretch">
      {/* Check if chat[0] is 0 (AI) or 1 (user) */}
      <div
        className={`flex flex-grow ${chat[0] === 0 ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-[80%] px-4 py-2 rounded-lg ${
            chat[0] === 0
              ? "bg-stone-600 text-white" // AI messages style
              : "bg-zinc-200 text-black" // User messages style
          }`}
        >
          <p className="text-sm">{chat[1]}</p>
        </div>
      </div>
    </div>
  );
}

export default Chat;

