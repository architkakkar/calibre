interface ChatInputProps {
  onSend: (prompt: string) => void;
}

const SUGGESTED_PROMPTS = [
  "Create a beginner workout plan",
  "Suggest a muscle gain diet",
  "Help with back pain",
  "Build a weekly workout routine",
];

export function ChatEmptyState({ onSend }: ChatInputProps) {
  return (
    <div className="flex-1 flex items-center justify-center -mt-15">
      <div className="flex flex-col items-center gap-4 text-center text-muted-foreground max-w-md">
        <p className="text-sm">
          Start a conversation with Cal, your AI trainer
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => onSend(prompt)}
              className="px-3 py-1 rounded-full bg-muted text-xs hover:bg-muted/80 hover:scale-105 transition cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
