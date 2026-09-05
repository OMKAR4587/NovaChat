import { useState, useEffect} from "react";
import { sendChatMessage } from "../service/ChatService";

function useChat({ activeChat, setChats, onCreateChat }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFailedRequest, setLastFailedRequest] = useState(null);

  useEffect(() => {
    setError(null);
    setLastFailedRequest(null);
  }, [activeChat?.id]);

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

  const createChatTitle = (chatId, message) => {
    const title = message.length > 32 ? `${message.slice(0, 32)}...` : message;

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              title,
            }
          : chat,
      ),
    );
  };

  const requestAIResponse = async (chatId, messages) => {
    const data = await sendChatMessage(messages);

    const aiMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: data?.reply || "Sorry, I couldn't generate a response.",
    };

    const finalMessages = [...messages, aiMessage];

    updateChatMessages(chatId, finalMessages);

    return finalMessages;
  };

  const sendMessage = async () => {
    const trimmedMessage = input.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    setError(null);

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

    setInput("");
    updateChatMessages(currentChat.id, updatedMessages);
    setIsLoading(true);

    try {
      await requestAIResponse(currentChat.id, updatedMessages);

      setLastFailedRequest(null);

      if (!currentChat.messages || currentChat.messages.length === 0) {
        createChatTitle(currentChat.id, trimmedMessage);
      }
    } catch (error) {
      console.error("Chat error:", error);

      setLastFailedRequest({
        chatId: currentChat.id,
        messages: updatedMessages,
      });

      setError(
        "The AI service is temporarily busy. Please try again in a moment.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const retryMessage = async () => {
    if (!lastFailedRequest || isLoading) {
      return;
    }

    if (!activeChat || activeChat.id !== lastFailedRequest.chatId) {
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await requestAIResponse(
        lastFailedRequest.chatId,
        lastFailedRequest.messages,
      );

      setLastFailedRequest(null);

      if (lastFailedRequest.messages.length === 1) {
        createChatTitle(
          lastFailedRequest.chatId,
          lastFailedRequest.messages[0].content,
        );
      }
    } catch (error) {
      console.error("Chat retry error:", error);

      setError(
        "The AI service is temporarily busy. Please try again in a moment.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    input,
    setInput,
    isLoading,
    error,
    sendMessage,
    retryMessage,
  };
}

export default useChat;
