"use client";

import { useChat } from "@ai-sdk/react";
import { ChatInterface } from "./_components/chat-interface";

export default function AIChatPage() {
  const { messages, sendMessage } = useChat();

  return (
    <ChatInterface
      messages={messages}
      onSendMessage={(prompt) => sendMessage({ text: prompt })}
    />
  );
}
