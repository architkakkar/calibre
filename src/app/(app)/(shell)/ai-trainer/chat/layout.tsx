import { ChatShell } from "./_components/chat-shell";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[calc(100dvh-120px)] w-full text-primary border border-border rounded-2xl bg-card/60">
      <ChatShell>{children}</ChatShell>
    </div>
  );
}
