const prompts = [
  "Explain React hooks",
  "Help me debug my code",
  "Give me a project idea",
  "Explain async/await",
];

function SuggestedPrompts({ onPromptSelect }) {
  return (
    <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onPromptSelect(prompt)}
          className="
            rounded-xl border border-zinc-200 bg-white
            px-4 py-3 text-left text-sm text-zinc-700
            transition-all duration-200
            hover:-translate-y-0.5 hover:border-zinc-300
            hover:bg-zinc-50 hover:shadow-sm
          "
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}

export default SuggestedPrompts;