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

    return newChat;
  };

  const handleDeleteAll = () => {
    setChats([]);
    setActiveChatId(null);
  };

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <aside
        className={`
          shrink-0 border-r border-zinc-200
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-72" : "w-16"}
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

      <ChatScreen
        activeChat={activeChat}
        setChats={setChats}
        onCreateChat={handleNewChat}
      />
    </div>
  );
}

export default App;