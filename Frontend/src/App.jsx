import { useState } from "react";

import Sidebar from "./features/conversation/components/Sidebar";
import ChatScreen from "./features/chat/components/ChatScreen";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#fafafa]">
      
      <div
        className={`
          shrink-0 border-r border-zinc-200/70
          transition-all duration-300
          ${isSidebarOpen ? "w-64" : "w-[72px]"}
        `}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() =>
            setIsSidebarOpen((prev) => !prev)
          }
        />
      </div>

      <ChatScreen />
    </div>
  );
}

export default App;