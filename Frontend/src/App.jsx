import { useEffect, useState } from "react";

import Sidebar from "./features/conversation/components/Sidebar";
import ChatScreen from "./features/chat/components/ChatScreen";
import Modal from "./components/ui/modal";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDeleteAllChat, setIsDeleteAllChat] = useState(false);

  const [isHydrated, setIsHydrated] = useState(false);

  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  const activeChat =
    chats.find((chat) => chat.id === activeChatId) || null;

  // Load chats from localStorage
  useEffect(() => {
    const savedChats = localStorage.getItem("novachat-chats");
    const savedActiveChatId =
      localStorage.getItem("novachat-active-chat");

    if (savedChats) {
      try {
        setChats(JSON.parse(savedChats));
      } catch (error) {
        console.error("Failed to load chats:", error);
      }
    }

    if (savedActiveChatId) {
      setActiveChatId(savedActiveChatId);
    }

    setIsHydrated(true);
  }, []);

  // Save chats to localStorage
  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem(
      "novachat-chats",
      JSON.stringify(chats),
    );
  }, [chats, isHydrated]);

  // Save active chat to localStorage
  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (activeChatId) {
      localStorage.setItem(
        "novachat-active-chat",
        activeChatId,
      );
    } else {
      localStorage.removeItem("novachat-active-chat");
    }
  }, [activeChatId, isHydrated]);

  // Sidebar toggle
  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Create new chat
  const handleNewChat = () => {
    const newChat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);

    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }

    return newChat;
  };

  // Delete all chats
  const handleDeleteAll = () => {
    setChats([]);
    setActiveChatId(null);
    setIsDeleteAllChat(false);
  };

  // Delete single chat
  const handleDeleteChat = (chatId) => {
    setChats((prev) =>
      prev.filter((chat) => chat.id !== chatId),
    );

    if (activeChatId === chatId) {
      setActiveChatId(null);
    }
  };

  // Select chat
  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);

    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="relative flex h-dvh w-full overflow-hidden bg-[#fafafa]">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={handleToggleSidebar}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          border-r border-zinc-200
          bg-white
          transition-all duration-300 ease-in-out
          md:relative md:z-auto
          ${
            isSidebarOpen
              ? "w-72 translate-x-0"
              : "w-16 -translate-x-full md:translate-x-0"
          }
        `}
      >
        <Sidebar
          onDeleteChat={handleDeleteChat}
          isDeleteAllChat={isDeleteAllChat}
          setIsDeleteAllChat={setIsDeleteAllChat}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={handleToggleSidebar}
          onNewChat={handleNewChat}
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
        />
      </aside>

      {/* Main Chat */}
      <ChatScreen
        activeChat={activeChat}
        setChats={setChats}
        onCreateChat={handleNewChat}
        onToggleSidebar={handleToggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Delete All Modal */}
      {isDeleteAllChat && (
        <Modal
          chats={chats}
          onDeleteAll={handleDeleteAll}
          setIsDeleteAllChat={setIsDeleteAllChat}
          isDeleteAllChat={isDeleteAllChat}
        />
      )}
    </div>
  );
}

export default App;