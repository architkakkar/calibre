"use client";

import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock notifications data
const notifications = [
  {
    id: 1,
    message: "Your workout plan has been updated successfully",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    message: "New diet plan available for your fitness goals",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    message: "Congratulations! You've earned 50 credits",
    time: "3 hours ago",
    unread: false,
  },
  {
    id: 4,
    message: "AI Trainer has a new suggestion for you",
    time: "5 hours ago",
    unread: false,
  },
  {
    id: 5,
    message: "Your 7-day streak is amazing! Keep it up",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 6,
    message: "Weekly progress report is now available",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 7,
    message: "New features added to the workout tracker",
    time: "3 days ago",
    unread: false,
  },
  {
    id: 8,
    message: "Your profile has been viewed 15 times",
    time: "4 days ago",
    unread: false,
  },
  {
    id: 9,
    message: "Upgrade to Pro and unlock premium features",
    time: "5 days ago",
    unread: false,
  },
  {
    id: 10,
    message: "Monthly challenge starts tomorrow",
    time: "1 week ago",
    unread: false,
  },
];

const unreadCount = notifications.filter((n) => n.unread).length;

export function NotificationPopup() {
  const router = useRouter();

  return (
    <Popover>
      <PopoverTrigger>
        <div className="hidden sm:flex relative size-8 rounded-lg text-foreground hover:bg-white/10 transition-all cursor-pointer">
          <span className="inline-flex items-center justify-center">
            <HugeiconsIcon icon={Notification01Icon} className="size-4 ml-2" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1 size-2 rounded-full bg-orange-500" />
            )}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-96 p-0 bg-card backdrop-blur-md border border-border shadow-2xl shadow-black/30"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <Badge
              variant="secondary"
              className="h-5 px-2 text-xs bg-primary/20 text-primary border-0"
            >
              {unreadCount} new
            </Badge>
          )}
        </div>

        {/* Notifications List - Limited to 4-5 items visible */}
        <div className="overflow-y-auto max-h-80">
          {notifications.map((notification, index) => (
            <div key={notification.id}>
              <button
                onClick={() => {
                  // Handle notification click
                }}
                className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-all ${
                  notification.unread ? "bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    {notification.unread && (
                      <div className="size-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    )}
                    <p
                      className={`text-[13px] line-clamp-2 ${
                        notification.unread
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {notification.message}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-nowrap mt-0.5">
                    {notification.time}
                  </p>
                </div>
              </button>
              {index < Math.min(notifications.length, 5) - 1 && (
                <Separator className="bg-border" />
              )}
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-1 border-t border-border flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Handle mark all as read
              console.log("Mark all as read");
            }}
            className="flex-1 h-9 text-xs font-medium"
          >
            mark all as read
          </Button>
          <Separator orientation="vertical" className="h-9 w-px bg-border" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              router.push("/notifications");
            }}
            className="flex-1 h-9 text-xs font-medium text-primary hover:text-primary"
          >
            All Messages
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
