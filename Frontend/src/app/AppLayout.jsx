function AppLayout({ sidebar, children, isSidebarOpen }) {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 text-zinc-900">
      <aside
        className={`
          shrink-0 overflow-hidden border-r border-zinc-200 bg-white
          transition-[width] duration-300 ease-in-out
          ${isSidebarOpen ? "w-64" : "w-16"}
        `}
      >
        {sidebar}
      </aside>

      <main className="min-w-0 flex-1">
        {children}
      </main>
    </div>
  );
}

export default AppLayout;