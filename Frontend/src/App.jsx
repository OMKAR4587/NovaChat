import { useState } from "react";

import Sidebar from "./features/conversation/components/Sidebar";
import ChatScreen from "./features/chat/components/ChatScreen";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [chats, setChats] = useState([]);

  const [activeChatId, setActiveChatId] = useState(null);

  const activeChat =
    chats.find((chat) => chat.id === activeChatId) || null;

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

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

    // Mobile वर new chat केल्यावर sidebar close
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }

    return newChat;
  };

  const handleDeleteAll = () => {
    setChats([]);
    setActiveChatId(null);
  };

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);

    // Mobile वर chat select केल्यावर sidebar close
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
          className="
            fixed inset-0 z-40
            bg-black/20
            backdrop-blur-[2px]
            md:hidden
          "
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          border-r border-zinc-200
          bg-white

          transition-all duration-300 ease-in-out

          md:relative
          md:z-auto

          ${
            isSidebarOpen
              ? "w-72 translate-x-0"
              : "w-16 -translate-x-full md:translate-x-0"
          }
        `}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={handleToggleSidebar}
          onNewChat={handleNewChat}
          onDeleteAll={handleDeleteAll}
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
    </div>
  );
}

export default App;