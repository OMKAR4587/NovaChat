const Modal = ({
  onDeleteAll,
  chats,
  setIsDeleteAllChat,
  isDeleteAllChat,
}) => {
  const hasChats = chats.length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/25 p-4 backdrop-blur-sm">
      <div
        className="
          w-full max-w-sm
          rounded-2xl
          border border-zinc-200
          bg-white
          p-6
          shadow-[0_20px_50px_rgba(0,0,0,0.12)]
        "
      >
        <h3
          className="
            mb-6
            text-lg
            font-semibold
            tracking-tight
            text-zinc-900
          "
        >
          {hasChats
            ? "Do you really want to delete all chats?"
            : "No chats available to delete"}
        </h3>

        <div className="flex justify-end gap-2">
          {hasChats ? (
            <>
              <button
                type="button"
                onClick={() => setIsDeleteAllChat(!isDeleteAllChat)}
                className="
                  rounded-xl
                  bg-zinc-100
                  px-4 py-2
                  text-sm font-medium
                  text-zinc-700
                  transition
                  hover:bg-zinc-200
                  active:scale-95
                "
              >
                No
              </button>

              <button
                type="button"
                onClick={onDeleteAll}
                className="
                  rounded-xl
                  bg-zinc-900
                  px-4 py-2
                  text-sm font-medium
                  text-white
                  transition
                  hover:bg-zinc-700
                  active:scale-95
                "
              >
                Yes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsDeleteAllChat(!isDeleteAllChat)}
              className="
                rounded-xl
                bg-zinc-900
                px-4 py-2
                text-sm font-medium
                text-white
                transition
                hover:bg-zinc-700
                active:scale-95
              "
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