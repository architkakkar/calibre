"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showToast } from "@/lib/client/toast";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState<string>("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedbackType || !message.trim()) {
      showToast({ type: "error", message: "Please fill in all fields" });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/accounts/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: feedbackType,
          message: message.trim(),
        }),
      });

      if (!response.ok) throw new Error("Failed to submit feedback");

      setIsSubmitted(true);
      setFeedbackType("");
      setMessage("");
      showToast({
        type: "success",
        message: "Thank you! Your feedback has been submitted.",
      });

      // Reset submission state after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      showToast({
        type: "error",
        message: "Failed to submit feedback. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Share Your Feedback</h2>
        <p className="text-sm text-muted-foreground">
          Help us improve Calibre by sharing your thoughts, reporting issues, or
          suggesting new features. Your feedback shapes the future of the app.
        </p>
      </div>

      {isSubmitted ? (
        <div className="rounded-2xl border bg-card p-8 text-center space-y-4">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
          <h3 className="text-lg font-semibold">Feedback Submitted!</h3>
          <p className="text-sm text-muted-foreground">
            Thank you for helping us improve Calibre. We review all feedback
            carefully.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border bg-card p-6 space-y-6"
        >
          {/* Feedback Type */}
          <div className="space-y-2">
            <Label htmlFor="feedbackType" className="text-base font-medium">
              What type of feedback do you have?
            </Label>
            <Select value={feedbackType} onValueChange={setFeedbackType}>
              <SelectTrigger id="feedbackType">
                <SelectValue placeholder="Select feedback type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bug">🐛 Bug Report</SelectItem>
                <SelectItem value="feature">💡 Feature Request</SelectItem>
                <SelectItem value="improvement">
                  ✨ Improvement Suggestion
                </SelectItem>
                <SelectItem value="praise">
                  👏 Praise / Positive Feedback
                </SelectItem>
                <SelectItem value="other">💬 General Feedback</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-base font-medium">
              Your Message
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what's on your mind..."
              className="min-h-40 resize-none"
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground text-right">
              {message.length} / 1000 characters
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !feedbackType || !message.trim()}
            className="w-full"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Feedback
              </>
            )}
          </Button>
        </form>
      )}

      {/* Additional Info */}
      <div className="rounded-lg bg-muted/50 p-4 space-y-2">
        <div className="flex items-start gap-3">
          <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Response Time</p>
            <p className="text-xs text-muted-foreground">
              We review all feedback within 48 hours. For urgent issues, please
              contact support directly at support@calibre.app
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
