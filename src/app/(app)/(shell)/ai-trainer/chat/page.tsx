"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { ChatInterface } from "./_components/chat-interface";

export default function AIChatPage() {
  const pathname = usePathname();
  const hasUpdatedUrlRef = useRef(false);
  const { id, messages, sendMessage, status } = useChat();

  return (
    <ChatInterface
      messages={messages}
      onSendMessage={(prompt) => {
        // update URL on first user message
        if (!hasUpdatedUrlRef.current && pathname.endsWith("/chat")) {
          hasUpdatedUrlRef.current = true;
          window.history.replaceState(null, "", `/ai-trainer/chat/${id}`);
        }

        sendMessage({ text: prompt });
      }}
      status={status}
    />
  );
}
