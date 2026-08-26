import { Sparkles } from "lucide-react";
import SuggestedPrompts from "./SuggestedPrompts";

function WelcomeScreen({ onPromptSelect }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-zinc-900 text-white">
        <Sparkles size={22} />
      </div>

      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
        How can I help you?
      </h1>

      <p className="mt-2 max-w-md text-center text-sm text-zinc-500">
        Ask questions, learn something new, write code, or work
        through an idea with NovaChat.
      </p>

      <SuggestedPrompts onPromptSelect={onPromptSelect} />
    </div>
  );
}

export default WelcomeScreen;