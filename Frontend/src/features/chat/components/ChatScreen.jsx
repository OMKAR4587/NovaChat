import { useState } from "react";

import WelcomeScreen from "./WelcomeScreen";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import LoadingMessage from "./LoadingMessage";

function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = (content) => {
    if (isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: `You said: "${content}"`,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="flex h-full flex-col">
      {messages.length === 0 ? (
        <WelcomeScreen onPromptSelect={sendMessage} />
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-6">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
              />
            ))}

            {isLoading && <LoadingMessage />}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <ChatInput
          onSend={sendMessage}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}

export default ChatScreen;