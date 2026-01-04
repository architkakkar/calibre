"use client";

import { useChat } from "@ai-sdk/react";
import { ChatInterface } from "./_components/chat-interface";

export default function AIChatPage() {
  const { messages, sendMessage } = useChat();

  const handleSendMessage = (prompt: string) => {
    sendMessage({ text: prompt });
  };

  return (
    <ChatInterface
      messages={messages}
      onSendMessage={handleSendMessage}
      isLoading={false}
    />
  );
}
