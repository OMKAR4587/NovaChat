import { useState } from "react";
import AppLayout from "./app/AppLayout";
import Sidebar from "./features/conversation/components/Sidebar";
import ChatScreen from "./features/chat/components/ChatScreen";

function App() {
  const [isSidebarOpen, setisSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setisSidebarOpen((prev) => !prev);
  };
  return (
    <AppLayout
      isSidebarOpen={isSidebarOpen}
      sidebar={
        <Sidebar isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
      }
    >
    <ChatScreen/>
    </AppLayout>
  );
}

export default App;
