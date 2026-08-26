function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`
        flex w-full
        ${isUser ? "justify-end" : "justify-start"}
      `}
    >
      <div
        className={`
          max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-6
          ${
            isUser
              ? "bg-zinc-900 text-white"
              : "border border-zinc-200 bg-white text-zinc-700"
          }
        `}
      >
        {message.content}
      </div>
    </div>
  );
}

export default MessageBubble;