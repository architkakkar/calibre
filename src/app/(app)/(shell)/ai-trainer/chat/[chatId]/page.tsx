"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useChat, UIMessage } from "@ai-sdk/react";
import { ChatInterface } from "../_components/chat-interface";
import { fetchChatByIdApi } from "@/lib/client/api/chat.api";

export default function ChatByIdPage() {
  const params = useParams();
  const chatId = params.chatId as string;
  const hasMessagesAppliedRef = useRef(false);
  const [persistedMessages, setPersistedMessages] = useState<
    UIMessage[] | null
  >(null);

  const { messages, sendMessage, status, setMessages } = useChat({
    id: chatId,
  });

  // hydrate messages on mount
  useEffect(() => {
    let cancelled = false;

    async function loadMessages() {
      const data = await fetchChatByIdApi(chatId);

      if (!cancelled) {
        setPersistedMessages(data.messages ?? []);
      }
    }

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, [chatId]);

  useEffect(() => {
    if (
      persistedMessages &&
      !hasMessagesAppliedRef.current &&
      persistedMessages.length > 0
    ) {
      hasMessagesAppliedRef.current = true;
      setMessages(persistedMessages);
    }
  }, [persistedMessages, setMessages]);

  if (persistedMessages === null) {
    return (
      <div className="flex flex-1 -mt-25 items-center justify-center text-sm text-muted-foreground">
        Loading conversation…
      </div>
    );
  }

  return (
    <ChatInterface
      messages={messages}
      status={status}
      onSendMessage={(prompt) => sendMessage({ text: prompt })}
    />
  );
}
