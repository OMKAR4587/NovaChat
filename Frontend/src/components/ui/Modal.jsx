const Modal = ({
  onDeleteAll,
  chatToDelete,
  onDeleteChat,
  onCancelDelete,
  chats,
  setIsDeleteAllChat,
  isDeleteAllChat,
}) => {
  const hasChats = chats.length > 0;
  const isSingleDelete = Boolean(chatToDelete);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/25 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
        <h3 className="mb-6 text-lg font-semibold tracking-tight text-zinc-900">
          {isSingleDelete
            ? "Delete this chat?"
            : hasChats
              ? "Do you really want to delete all chats?"
              : "No chats available to delete"}
        </h3>

        {isSingleDelete ? (
          <p className="mb-6 text-sm text-zinc-500">
            This action cannot be undone. This chat will be permanently deleted.
          </p>
        ) : (
          hasChats && (
            <p className="mb-6 text-sm text-zinc-500">
              This action cannot be undone. This will permanently delete all
              your chats and remove them from our servers.
            </p>
          )
        )}

        <div className="flex justify-end gap-2">
          {isSingleDelete ? (
            <>
              <button
                type="button"
                onClick={onCancelDelete}
                className="rounded-xl bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-300 active:scale-95"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onDeleteChat}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 active:scale-95"
              >
                Delete
              </button>
            </>
          ) : hasChats ? (
            <>
              <button
                type="button"
                onClick={() => setIsDeleteAllChat(false)}
                className="rounded-xl bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-300 active:scale-95"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onDeleteAll}
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 active:scale-95"
              >
                Delete All
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsDeleteAllChat(false)}
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 active:scale-95"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;