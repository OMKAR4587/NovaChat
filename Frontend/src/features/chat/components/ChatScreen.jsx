import { useEffect, useRef } from "react";
import {
  ArrowUp,
  Sparkles,
  Code2,
  Lightbulb,
  MessageSquare,
  Menu,
} from "lucide-react";

import MessageBubble from "./MessageBubble";
import useChat from "../../../hooks/useChat";

function ChatScreen({ activeChat, setChats, onCreateChat, onToggleSidebar }) {
  const { input, setInput, isLoading, sendMessage } = useChat({
    activeChat,
    setChats,
    onCreateChat,
  });

  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const messages = activeChat?.messages || [];

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isLoading]);

  useEffect(() => {
    setInput("");
  }, [activeChat?.id]);

  // Auto resize textarea
  const handleInputChange = (e) => {
    const value = e.target.value;
    const textarea = e.target;

    setInput(value);
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  };

  // Keyboard handling
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Suggestion handling
  const handleSuggestion = (prompt) => {
    setInput(prompt);

    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  };

  const suggestions = [
    {
      icon: Code2,
      title: "Build something",
      description: "Plan a React project",
      prompt: "Help me plan a modern React project",
    },
    {
      icon: Lightbulb,
      title: "Learn something",
      description: "Understand a concept",
      prompt: "Explain React hooks simply with examples",
    },
    {
      icon: MessageSquare,
      title: "Ask anything",
      description: "Start a conversation",
      prompt: "Give me some interesting ideas to explore",
    },
  ];

  return (
    <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-[#fafafa]">
      {/* Header */}
      <header className="absolute left-0 right-0 top-0 z-20 flex h-14 items-center border-b border-zinc-200/70 bg-[#fafafa]/90 px-4 backdrop-blur-md sm:px-6 sm:hidden">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Open sidebar"
            className="flex size-9 items-center justify-center active:scale-95 md:hidden"
          >
            <Menu size={18} />
          </button>

          <h2 className="text-sm font-semibold tracking-tight text-zinc-900">
            NovaChat
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-0 flex-1 overflow-y-auto pt-14">
        {messages.length === 0 ? (
          <WelcomeScreen
            suggestions={suggestions}
            onSuggestion={handleSuggestion}
          />
        ) : (
          <ChatMessages
            messages={messages}
            isLoading={isLoading}
            bottomRef={bottomRef}
          />
        )}
      </div>

      {/* Composer */}
      <ChatComposer
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        sendMessage={sendMessage}
        textareaRef={textareaRef}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </main>
  );
}

/* --------------------------------
   Welcome Screen
-------------------------------- */

function WelcomeScreen({ suggestions, onSuggestion }) {
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-10 sm:px-8">
      <div className="w-full max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg shadow-zinc-900/10">
            <Sparkles size={24} strokeWidth={1.8} />
          </div>

          <p className="mb-2 text-sm font-medium text-zinc-400">
            Welcome to NovaChat
          </p>

          <h1 className="text-4xl font-semibold tracking-[-0.045em] text-zinc-900 sm:text-5xl">
            What can I help with?
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-zinc-500">
            Ask questions, explore ideas, solve problems, or build something
            amazing.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                type="button"
                onClick={() => onSuggestion(item.prompt)}
                className="group rounded-2xl border border-zinc-200 bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md active:scale-[0.99]"
              >
                <div className="mb-5 flex size-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 transition-colors group-hover:bg-zinc-900 group-hover:text-white">
                  <Icon size={17} />
                </div>

                <h3 className="text-sm font-semibold text-zinc-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------
   Chat Messages
-------------------------------- */

function ChatMessages({ messages, isLoading, bottomRef }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-10 pt-6 sm:px-8">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isLoading && (
        <div className="flex gap-3 py-5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white">
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
  );
}

/* --------------------------------
   Chat Composer
-------------------------------- */

function ChatComposer({
  input,
  setInput,
  isLoading,
  sendMessage,
  textareaRef,
  onInputChange,
  onKeyDown,
}) {
  return (
    <div className="shrink-0 bg-linear-to-t from-[#fafafa] via-[#fafafa] to-transparent px-3 pb-4 pt-3 sm:px-6 sm:pb-6">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex items-end gap-2 rounded-2xl border border-zinc-200 bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all focus-within:border-zinc-300 focus-within:shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            disabled={isLoading}
            rows={1}
            placeholder="Message NovaChat..."
            className="max-h-45 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm leading-6 text-zinc-800 outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            type="button"
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white transition-all duration-200 hover:bg-zinc-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400"
          >
            <ArrowUp size={18} strokeWidth={2.5} />
          </button>
        </div>

        <p className="mt-2.5 text-center text-[10px] text-zinc-400">
          NovaChat can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}

export default ChatScreen;
