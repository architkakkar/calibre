"use client";

import { useParams } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { ChatInterface } from "../_components/chat-interface";

export default function ChatByIdPage() {
  const params = useParams();
  const chatId = params.chatId as string;

  const { messages, sendMessage, status } = useChat({
    id: chatId,
  });

  return (
    <ChatInterface
      messages={messages}
      status={status}
      onSendMessage={(prompt) => sendMessage({ text: prompt })}
    />
  );
}
