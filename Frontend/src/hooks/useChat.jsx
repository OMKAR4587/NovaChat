import { useState } from "react";
import { sendChatMessage } from "../service/ChatService";

function useChat({ activeChat, setChats, onCreateChat }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateChatMessages = (chatId, messages) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages,
              updatedAt: Date.now(),
            }
          : chat,
      ),
    );
  };

  const sendMessage = async () => {
    const trimmedMessage = input.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    let currentChat = activeChat;

    if (!currentChat) {
      currentChat = onCreateChat();

      if (!currentChat) {
        return;
      }
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedMessage,
    };

    const updatedMessages = [...(currentChat.messages || []), userMessage];

    // Clear input immediately
    setInput("");

    // Show user message immediately
    updateChatMessages(currentChat.id, updatedMessages);

    setIsLoading(true);

    try {
      const data = await sendChatMessage(updatedMessages);

      const aiMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data?.reply || "Sorry, I couldn't generate a response.",
      };

      const finalMessages = [...updatedMessages, aiMessage];

      updateChatMessages(currentChat.id, finalMessages);

      // Create title from first message
      if (!currentChat.messages || currentChat.messages.length === 0) {
        const title =
          trimmedMessage.length > 32
            ? `${trimmedMessage.slice(0, 32)}...`
            : trimmedMessage;

        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === currentChat.id
              ? {
                  ...chat,
                  title,
                }
              : chat,
          ),
        );
      }
    } catch (error) {
      console.error("Chat error:", error);

      const errorMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: error?.message || "Something went wrong. Please try again.",
      };

      updateChatMessages(currentChat.id, [...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    input,
    setInput,
    isLoading,
    sendMessage,
  };
}

export default useChat;
