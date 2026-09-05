import { useState } from "react";

import {
  User,
  Sparkles,
  ChevronUp,
  PanelLeft,
  SquarePen,
  Trash,
  Ellipsis,
} from "lucide-react";

function Sidebar({
  isSidebarOpen,
  onToggleSidebar,
  onNewChat,
  onDeleteChat,
  setIsDeleteAllChat,
  isDeleteAllChat,
  chats,
  activeChatId,
  onSelectChat,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const deleteIcon = !isSidebarOpen && isHovered ? <Trash size={18} /> : "";
  const icon =
    !isSidebarOpen && isHovered ? (
      <PanelLeft size={18} />
    ) : (
      <Sparkles size={18} />
    );

  return (
    <div className="flex h-full w-full flex-col bg-white p-3">
      {/* Brand */}
      <div
        className={`
          relative flex items-center px-2 py-3
          ${isSidebarOpen ? "gap-3" : "justify-center"}
        `}
      >
        {/* Logo / Toggle */}
        <button
          type="button"
          onClick={onToggleSidebar}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="
            flex size-8 shrink-0 cursor-pointer
            items-center justify-center
            rounded-xl bg-zinc-900 text-white
            transition-transform duration-200
            hover:scale-105
            active:scale-95
          "
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {icon}
        </button>

        {/* Brand */}
        {isSidebarOpen && (
          <div className="min-w-0 overflow-hidden whitespace-nowrap">
            <h1 className="text-sm font-semibold tracking-tight text-zinc-900">
              NovaChat
            </h1>

            <p className="text-xs text-zinc-500">Your AI assistant</p>
          </div>
        )}

        {/* Close Button */}
        {isSidebarOpen && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="
              ml-auto flex size-8 shrink-0
              cursor-pointer items-center justify-center
              rounded-lg text-zinc-500
              transition-colors duration-200
              hover:bg-zinc-100
              hover:text-zinc-900
              active:scale-95
            "
            aria-label="Close sidebar"
          >
            <PanelLeft size={19} />
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="mt-5 space-y-1">
        {/* New Chat */}
        <button
          type="button"
          onClick={onNewChat}
          title={!isSidebarOpen ? "New chat" : undefined}
          className={`
            flex w-full cursor-pointer
            items-center rounded-xl
            p-2.5 text-sm font-medium
            text-zinc-700
            transition-all duration-200
            hover:bg-zinc-100
            hover:text-zinc-900
            active:scale-[0.98]
            ${isSidebarOpen ? "gap-3" : "justify-center"}
          `}
        >
          <SquarePen size={19} className="shrink-0" />

          {isSidebarOpen && <span className="whitespace-nowrap">New chat</span>}
        </button>

        {/* Delete All */}
        <button
          type="button"
          onClick={() => setIsDeleteAllChat(!isDeleteAllChat)}
          title={!isSidebarOpen ? "Delete all" : undefined}
          className={`
            flex w-full cursor-pointer
            items-center rounded-xl
            p-2.5 text-sm font-medium
            text-zinc-700
            transition-all duration-200
            hover:bg-red-50
            hover:text-red-600
            active:scale-[0.98]
            ${isSidebarOpen ? "gap-3" : "justify-center"}
          `}
        >
          <Trash  size={19} className="shrink-0" />

          {isSidebarOpen && (
            <span className="whitespace-nowrap">Delete all</span>
          )}
        </button>
      </div>

      {/* Conversations */}
      <div className="mt-7 min-h-0 flex-1 overflow-y-auto">
        {isSidebarOpen && (
          <>
            <p
              className="
                mb-3 px-3
                text-[11px] font-medium
                uppercase tracking-wider
                text-zinc-400
              "
            >
              Conversations
            </p>

            <div className="space-y-1 px-1">
              {chats.length === 0 ? (
                <div className="px-2 py-3">
                  <p className="text-xs leading-5 text-zinc-400">
                    No conversations yet.
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-zinc-300">
                    Start a new chat to see it here.
                  </p>
                </div>
              ) : (
                chats.map((chat) => {
                  const isActive = chat.id === activeChatId;

                  return (
                    <div
                      key={chat.id}
                      className={`
                        group flex items-center gap-2 rounded-xl px-3 py-2 transition cursor-pointer
                        ${isActive ? "bg-zinc-100" : "hover:bg-zinc-50"}
                      `}
                    >
                      <button
                        type="button"
                        onClick={() => onSelectChat(chat.id)}
                        className={`min-w-0 flex-1 truncate text-left text-sm cursor-pointer ${
                          isActive
                            ? "font-medium text-zinc-900"
                            : "text-zinc-700"
                        }`}
                      >
                        {chat.title}
                      </button>

                     <div className="relative shrink-0">
                      <button type="button" onClick={()=>setOpenMenuId((prev)=>prev===chat.id?null:chat.id)}
                      aria-label="chat action"
                       className="flex size-7 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-700 ">
                        <Ellipsis size={18}/>
                      </button>
                      {openMenuId===chat.id && (
                        <div className="absolute right-0 top-9 z-30 p-1 w-32 rounded-xl border border-zinc-200 bg-white shadow-lg">
                          <button
                            type="button"
                            onClick={() => setOpenMenuId(null)}
                            className="w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-700 transition hover:bg-zinc-50"
                          >
                            Rename
                          </button>
                          <button
                          type="button" onClick={()=>{
                            setOpenMenuId(null)
                            onDeleteChat(chat.id)}}
                            className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                            Delete
                          </button>
                        </div>
                      )}
                     </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>

      {/* User */}
      <div className="border-t border-zinc-200 pt-2">
        <button
          type="button"
          className={`
            relative flex w-full
            cursor-pointer items-center
            rounded-xl
            text-sm font-medium
            text-zinc-900
            transition-all duration-200
            hover:bg-zinc-100
            active:scale-[0.98]
            ${isSidebarOpen ? "gap-3 px-1 py-2.5" : "justify-center p-2"}
          `}
        >
          <div
            className="
              flex size-9 shrink-0
              items-center justify-center
              rounded-full
              bg-amber-400
              text-black
            "
          >
            <User size={18} />
          </div>

          {isSidebarOpen && (
            <>
              <span>Guest</span>

              <ChevronUp className="absolute right-2 text-zinc-600" size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
