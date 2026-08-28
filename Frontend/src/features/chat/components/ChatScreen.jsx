import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Sparkles,
  Code2,
  Lightbulb,
  MessageSquare,
  RotateCcw,
} from "lucide-react";

import MessageBubble from "./MessageBubble";

function ChatScreen() {
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  // Auto resize textarea
  const handleInputChange = (e) => {
    setInput(e.target.value);

    const textarea = e.target;

    textarea.style.height = "auto";

    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  };

  const sendMessage = async () => {
    const trimmedMessage = input.trim();

    if (!trimmedMessage || isLoading) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedMessage,
    };

    // Create updated conversation history
    const updatedMessages = [...messages, userMessage];

    // Update UI immediately
    setMessages(updatedMessages);

    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        // Send full conversation history
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong. Please try again.",
        );
      }

      const aiMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply || "Sorry, I couldn't generate a response.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      const errorMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: error.message || "Something went wrong. Please try again.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestion = (prompt) => {
    setInput(prompt);

    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  };

  const startNewChat = () => {
    if (isLoading) return;

    setMessages([]);
    setInput("");

    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  };

  const suggestions = [
    {
      icon: Code2,
      title: "Build something",
      description: "Help me plan a React project",
      prompt: "Help me plan a modern React project",
    },
    {
      icon: Lightbulb,
      title: "Learn something",
      description: "Explain React hooks simply",
      prompt: "Explain React hooks simply with examples",
    },
    {
      icon: MessageSquare,
      title: "Ask anything",
      description: "Let's have a conversation",
      prompt: "Let's have a conversation",
    },
  ];

  return (
    <main className="relative flex  min-w-0 flex-1 flex-col overflow-hidden bg-[#fafafa]">
      {/* Main Scroll Area */}
      <div className="min-h-0 flex-1 mt-12 overflow-y-auto">
        {messages.length === 0 ? (
          /* ================= WELCOME SCREEN ================= */

          <div className="flex  items-center justify-center sm:px-8">
            <div className="w-full max-w-4xl">
              {/* Hero */}
              <div className="mx-auto max-w-4xl text-center">
                <div
                  className="
                    mx-auto mb-4
                    flex size-16 items-center justify-center
                    rounded-[22px]
                    bg-zinc-900
                    text-white
                    shadow-lg shadow-zinc-900/10
                  "
                >
                  <Sparkles size={27} strokeWidth={1.8} />
                </div>

                <p className="mb-2 text-sm font-medium text-zinc-400">
                  Welcome to NovaChat
                </p>

                <h2
                  className="
                    text-4xl font-semibold
                    tracking-[-0.04em]
                    text-zinc-900
                    sm:text-6xl
                  "
                >
                  What can I help with?
                </h2>

                <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-zinc-500">
                  Ask questions, explore ideas, solve problems, or get help with
                  your next project.
                </p>
              </div>

              {/* Suggestion Cards */}
              <div className="mt-2 grid gap-3 md:grid-cols-3">
                {suggestions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => handleSuggestion(item.prompt)}
                      className="
                        group relative overflow-hidden
                        rounded-2xl
                        border border-zinc-200/80
                        bg-white
                        p-5 text-left
                        shadow-sm
                        transition-all duration-200
                        hover:-translate-y-1
                        hover:border-zinc-300
                        hover:shadow-md
                      "
                    >
                      <div
                        className="
                          mb-6 flex size-10
                          items-center justify-center
                          rounded-xl bg-zinc-100
                          text-zinc-700
                          transition
                          group-hover:bg-zinc-900
                          group-hover:text-white
                        "
                      >
                        <Icon size={18} />
                      </div>

                      <h3 className="text-sm font-semibold text-zinc-900">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 text-xs leading-5 text-zinc-500">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* ================= CHAT MESSAGES ================= */

          <div className="mx-auto w-full max-w-4xl px-5 pb-8 pt-4 sm:px-8">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {/* AI Loading */}
            {isLoading && (
              <div className="flex gap-3 py-6">
                <div
                  className="
                    flex size-8 shrink-0
                    items-center justify-center
                    rounded-lg bg-zinc-900
                    text-white
                  "
                >
                  <Sparkles size={14} />
                </div>

                <div className="flex items-center gap-1 pt-2">
                  <span className="size-1.5 animate-bounce rounded-full bg-zinc-400" />

                  <span className="size-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:150ms]" />

                  <span className="size-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* ================= COMPOSER ================= */}

      <div
        className="
          shrink-0
          px-4 pb-5
          pt-3
          sm:px-8 sm:pb-7
        "
      >
        <div className="mx-auto w-full max-w-4xl">
          <div
            className="
              relative flex items-end gap-2
              rounded-[22px]
              border border-zinc-200
              bg-white
              p-2
              shadow-[0_8px_30px_rgba(0,0,0,0.06)]
              transition-all duration-200

              focus-within:border-zinc-300
              focus-within:shadow-[0_12px_40px_rgba(0,0,0,0.09)]
            "
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              rows={1}
              placeholder="Ask NovaChat anything..."
              className="
                max-h-45
                min-h-12
                flex-1 resize-none
                bg-transparent
                px-3 py-3
                text-[15px] leading-6
                text-zinc-800
                outline-none

                placeholder:text-zinc-400

                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

            <button
              type="button"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="
                flex size-11 shrink-0
                items-center justify-center
                rounded-[14px]
                bg-zinc-900
                text-white

                transition-all duration-200

                hover:scale-[1.03]
                hover:bg-zinc-700
                active:scale-95

                disabled:scale-100
                disabled:cursor-not-allowed
                disabled:bg-zinc-100
                disabled:text-zinc-400
              "
            >
              <ArrowUp size={19} strokeWidth={2.5} />
            </button>
          </div>

          <p className="mt-3 text-center text-[11px] text-zinc-400">
            NovaChat can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </main>
  );
}

export default ChatScreen;
