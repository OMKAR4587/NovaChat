import { useState } from "react";

import {
  User,
  Sparkles,
  ChevronUp,
  PanelLeft,
  SquarePen,
  Trash,
} from "lucide-react";

function Sidebar({ isSidebarOpen, onToggleSidebar }) {
  const [isHovered, setIsHovered] = useState(false);

  const icon =
    !isSidebarOpen && isHovered ? (
      <PanelLeft size={18} />
    ) : (
      <Sparkles size={18} />
    );

  return (
    <div className="flex h-full flex-col bg-white p-3">
      {/* Brand */}
      <div
        className={`
          relative flex items-center px-2 py-3
          ${isSidebarOpen ? "gap-3" : "justify-center"}
        `}
      >
        {/* Logo / Sidebar Toggle */}
        <button
          type="button"
          onClick={isSidebarOpen?()=>{}:onToggleSidebar}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="
            flex size-8 shrink-0 cursor-pointer
            items-center justify-center
            rounded-xl bg-zinc-900 text-white
          "
          aria-label={
            isSidebarOpen ? "Close sidebar" : "Open sidebar"
          }
        >
          {icon}
        </button>

        {/* Brand Text */}
        {isSidebarOpen && (
          <div className="overflow-hidden whitespace-nowrap">
            <h1 className="text-sm font-semibold tracking-tight text-zinc-900">
              NovaChat
            </h1>

            <p className="text-xs text-zinc-500">
              Your AI assistant
            </p>
          </div>
        )}

        {/* Close Sidebar Button */}
        {isSidebarOpen && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="
              ml-auto flex size-8 shrink-0
              cursor-pointer items-center justify-center
              rounded-lg text-zinc-500
              transition-colors
              hover:bg-zinc-100 hover:text-zinc-900
            "
            aria-label="Close sidebar"
          >
            <PanelLeft size={20} />
          </button>
        )}
      </div>

      {/* New Chat */}
      <button
        type="button"
        className={`
          mt-6 flex w-full cursor-pointer items-center rounded-xl
          p-2.5 text-sm font-medium text-zinc-700
          transition-colors duration-200
          hover:bg-zinc-100 hover:text-zinc-900
          ${isSidebarOpen ? "gap-3" : "justify-center"}
        `}
      >
        <SquarePen size={19} className="shrink-0" />

        {isSidebarOpen && (
          <span className="whitespace-nowrap">
            New chat
          </span>
        )}
      </button>

      {/* Delete All */}
      <button
        type="button"
        className={`
          flex w-full cursor-pointer items-center rounded-xl
          p-2.5 text-sm font-medium text-zinc-700
          transition-colors duration-200
          hover:bg-red-50 hover:text-red-600
          ${isSidebarOpen ? "gap-3" : "justify-center"}
        `}
      >
        <Trash size={19} className="shrink-0" />

        {isSidebarOpen && (
          <span className="whitespace-nowrap">
            Delete all
          </span>
        )}
      </button>

      {/* Conversations */}
      <div className="mt-6 min-h-0 flex-1">
        {isSidebarOpen && (
          <>
            <p className="px-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Conversations
            </p>

            <div className="mt-3 flex flex-col gap-1">
              <div className="rounded-lg px-3 py-2 text-sm text-zinc-500">
                No conversations yet
              </div>
            </div>
          </>
        )}
      </div>

      {/* User */}
      <div className="border-t border-zinc-200 pt-2">
        <button
          type="button"
          className={`
            relative flex w-full cursor-pointer items-center rounded-xl
            text-sm font-medium text-zinc-900
            transition-colors duration-200
            hover:bg-zinc-100
            ${
              isSidebarOpen
                ? "gap-3 px-1 py-2.5"
                : "justify-center p-2"
            }
          `}
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-400 text-black">
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