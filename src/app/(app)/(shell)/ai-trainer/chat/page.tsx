"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function ChatPage() {
  const [prompt, setPrompt] = useState<string>("");
  const { messages, sendMessage } = useChat();

  return (
    <section className="h-[calc(100dvh-120px)] w-full text-primary border border-border rounded-2xl bg-card/60 grid grid-cols-5 p-3 gap-3">
      {/* Sidebar content goes here */}
      <aside className="bg-background col-span-1 rounded-xl"></aside>
      {/* Main chat content goes here */}
      <main className="col-span-4 flex justify-between flex-col">
        {/* title goes here */}
        <div className="px-1">
          <span className="text-lg">Cal – Your AI Coach</span>

          <Separator className="my-2" />
        </div>
        {/* chat messages go here */}
        <div className="flex-1 content-end">
          {messages.map((message) => (
            <div
              className="flex-1 content-end p-2 flex flex-col overflow-y-hidden gap-2"
              key={message.id}
            >
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div
                        key={`${message.id}-${i}`}
                        className={`mb-2 max-w-96 w-fit px-2 py-1 rounded-xl ${
                          message.role === "user"
                            ? "bg-primary text-background self-end"
                            : " text-primary"
                        }`}
                      >
                        {message.role === "user" ? "User: " : "AI: "}
                        {part.text}
                      </div>
                    );
                }
              })}
            </div>
          ))}
          {/* input box goes here */}
          <form
            className="p-1"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage({ text: prompt });
              setPrompt("");
            }}
          >
            <Input
              id="prompt"
              name="prompt"
              placeholder="Ask me anything..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              className=""
            />
          </form>
        </div>
      </main>
    </section>
  );
}
