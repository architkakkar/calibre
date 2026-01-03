"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import {
  Send,
  Menu,
  X,
  Plus,
  Trash2,
  Apple,
  Dumbbell,
  AlertCircle,
} from "lucide-react";

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
}

const FREE_CHATS_LIMIT = 10;
const CURRENT_FREE_CHATS = 3;

const mockChats: ChatSession[] = [
  {
    id: "1",
    title: "Lower back pain during deadlifts",
    timestamp: new Date(new Date().getTime() - 86400000),
  },
  {
    id: "2",
    title: "Best workout routine for beginners",
    timestamp: new Date(new Date().getTime() - 172800000),
  },
  {
    id: "3",
    title: "Diet plan for muscle gain",
    timestamp: new Date(new Date().getTime() - 259200000),
  },
  {
    id: "4",
    title: "How to improve flexibility",
    timestamp: new Date(new Date().getTime() - 345600000),
  },
  {
    id: "5",
    title: "Morning stretching routine",
    timestamp: new Date(new Date().getTime() - 432000000),
  },
];

export default function Chat() {
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>(mockChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage } = useChat();

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  const handleNewChat = () => {
    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      timestamp: new Date(),
    };
    setChatHistory([newChat, ...chatHistory]);
    setActiveChatId(newChat.id);
  };

  const handleDeleteChat = (id: string) => {
    setChatHistory(chatHistory.filter((chat) => chat.id !== id));
    if (activeChatId === id) {
      setActiveChatId(null);
    }
  };

  const formatChatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-screen bg-background text-foreground flex-col">
      {/* Top Navigation Bar */}
      <nav className="border-b border-border bg-background px-8 py-5 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          CALIBRE
        </h1>

        <h2 className="text-lg font-medium text-foreground">
          Calibre Coach (AI Powered)
        </h2>

        <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium px-6 py-2 rounded-lg">
          Upgrade
        </Button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-72" : "w-0"
          } transition-all duration-300 border-r border-border bg-background flex flex-col overflow-hidden`}
        >
          {/* New Chat Button */}
          <div className="p-5">
            <Button
              onClick={handleNewChat}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 font-medium py-6 rounded-lg text-base"
            >
              <Plus size={22} />
              New Chat
            </Button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-1">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 px-2">
              Chat History
            </div>
            {chatHistory.length > 0 ? (
              chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    activeChatId === chat.id
                      ? "bg-primary/20 text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                  onClick={() => setActiveChatId(chat.id)}
                >
                  <div className="truncate text-sm leading-snug font-medium pr-7">
                    {chat.title}
                  </div>
                  <div className="text-xs opacity-60 mt-1.5">
                    {formatChatTime(chat.timestamp)}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id);
                    }}
                    className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                  >
                    <Trash2 size={16} className="text-destructive" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-xs text-muted-foreground text-center py-12">
                No chat history
              </div>
            )}
          </div>
        </aside>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-background">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto flex flex-col">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6 px-6">
                <div className="w-28 h-28 rounded-full bg-muted/30 flex items-center justify-center backdrop-blur-sm border border-border/50">
                  <span className="text-6xl">🤖</span>
                </div>
                <div className="text-center space-y-3 max-w-xl">
                  <h2 className="text-4xl font-bold text-foreground">
                    Calibre Coach
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Ask me anything about workouts, nutrition, or fitness goals
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 p-8">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-2xl px-6 py-4 rounded-2xl text-base leading-relaxed ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-muted text-foreground rounded-bl-none"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">
                        {message.parts.map((part, i) => {
                          switch (part.type) {
                            case "text":
                              return (
                                <span key={`${message.id}-${i}`}>
                                  {part.text}
                                </span>
                              );
                            default:
                              return null;
                          }
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-border bg-background p-6 space-y-3">
            <form onSubmit={handleSendMessage} className="space-y-3">
              {/* Input Container */}
              <div className="border border-border bg-card rounded-2xl p-4">
                {/* Line 1: Textarea */}
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e as unknown as React.FormEvent);
                    }
                  }}
                  placeholder="Ask Calibre Coach"
                  className="w-full bg-transparent text-foreground text-base placeholder:text-muted-foreground focus:outline-none resize-none max-h-20"
                  rows={1}
                />

                {/* Line 2: Controls Row */}
                <div className="flex items-center justify-between gap-3 border-t border-border mt-3 pt-3">
                  {/* Left side - Attachment Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Diet Plan Attachment */}
                    <button
                      type="button"
                      className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                      title="Attach diet plan"
                    >
                      <Apple size={20} />
                    </button>

                    {/* Workout Plan Attachment */}
                    <button
                      type="button"
                      className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                      title="Attach workout plan"
                    >
                      <Dumbbell size={20} />
                    </button>
                  </div>

                  {/* Right side - Chat Count & Send */}
                  <div className="flex items-center gap-3">
                    {/* Free Chat Counter */}
                    <div className="text-muted-foreground text-xs font-medium">
                      ({CURRENT_FREE_CHATS}/{FREE_CHATS_LIMIT})
                    </div>

                    {/* Send Button */}
                    <Button
                      type="submit"
                      disabled={!input.trim()}
                      className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground p-2 rounded-lg"
                      size="icon"
                    >
                      <Send size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </form>

            {/* Disclaimer */}
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p>
                AI responses are suggestions and not a substitute for
                professional medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
