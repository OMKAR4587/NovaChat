import { useState } from "react";

import {
  User,
  Sparkles,
  ChevronUp,
  PanelLeft,
  SquarePen,
  Trash,
} from "lucide-react";

function Sidebar({
  isSidebarOpen,
  onToggleSidebar,
  onNewChat,
  onDeleteAll,
  chats,
  activeChatId,
  onSelectChat,
}) {
  const [isHovered, setIsHovered] = useState(false);

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
          aria-label={
            isSidebarOpen
              ? "Close sidebar"
              : "Open sidebar"
          }
        >
          {icon}
        </button>

        {/* Brand */}
        {isSidebarOpen && (
          <div className="min-w-0 overflow-hidden whitespace-nowrap">
            <h1 className="text-sm font-semibold tracking-tight text-zinc-900">
              NovaChat
            </h1>

            <p className="text-xs text-zinc-500">
              Your AI assistant
            </p>
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
          <SquarePen
            size={19}
            className="shrink-0"
          />

          {isSidebarOpen && (
            <span className="whitespace-nowrap">
              New chat
            </span>
          )}
        </button>

        {/* Delete All */}
        <button
          type="button"
          onClick={onDeleteAll}
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
          <Trash
            size={19}
            className="shrink-0"
          />

          {isSidebarOpen && (
            <span className="whitespace-nowrap">
              Delete all
            </span>
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
                  const isActive =
                    chat.id === activeChatId;

                  return (
                    <button
                      key={chat.id}
                      type="button"
                      onClick={() =>
                        onSelectChat(chat.id)
                      }
                      className={`
                        group flex w-full
                        min-w-0 items-center
                        rounded-lg px-3 py-2.5
                        text-left text-sm
                        transition-all duration-200
                        ${
                          isActive
                            ? "bg-zinc-100 font-medium text-zinc-900"
                            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                        }
                      `}
                    >
                      <span className="truncate">
                        {chat.title}
                      </span>
                    </button>
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
            ${
              isSidebarOpen
                ? "gap-3 px-1 py-2.5"
                : "justify-center p-2"
            }
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

              <ChevronUp
                className="absolute right-2 text-zinc-600"
                size={18}
              />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;