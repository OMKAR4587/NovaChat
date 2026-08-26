function LoadingMessage() {
  return (
    <div className="flex w-full justify-start">
      <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="size-1.5 animate-bounce rounded-full bg-zinc-400" />
          <span className="size-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:150ms]" />
          <span className="size-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

export default LoadingMessage;