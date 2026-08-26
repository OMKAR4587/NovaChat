import { useState } from "react";
import { ArrowUp } from "lucide-react";

function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput || disabled) return;

    onSend(trimmedInput);
    setInput("");
  };

  return (
    <div className="w-full max-w-3xl px-4 pb-5">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm"
      >
        <input
          type="text"
          value={input}
          disabled={disabled}
          onChange={(event) => setInput(event.target.value)}
          placeholder={
            disabled ? "Aixo is thinking..." : "Ask anything..."
          }
          className="
            min-w-0 flex-1 bg-transparent px-3 py-2
            text-sm text-zinc-900 outline-none
            placeholder:text-zinc-400
            disabled:cursor-not-allowed disabled:opacity-60
          "
        />

        <button
          type="submit"
          disabled={!input.trim() || disabled}
          className="
            flex size-9 shrink-0 items-center justify-center
            rounded-xl bg-zinc-900 text-white
            transition-all duration-200
            hover:bg-zinc-800
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
          aria-label="Send message"
        >
          <ArrowUp size={18} />
        </button>
      </form>

      <p className="mt-2 text-center text-xs text-zinc-400">
        NovaChat can make mistakes. Check important information.
      </p>
    </div>
  );
}

export default ChatInput;