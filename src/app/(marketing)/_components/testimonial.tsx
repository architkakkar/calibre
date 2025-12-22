"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon } from "@hugeicons/core-free-icons";

const testimonials = [
  {
    quote:
      "Calibre transformed my fitness journey. The AI coach is game-changing!",
    name: "Arjun Singh",
    role: "Fitness Enthusiast",
    rating: 5,
    avatar: "AS",
  },
  {
    quote: "Finally, an app that adapts to my schedule. Lost 15kg in 4 months!",
    name: "Priya Kapoor",
    role: "Working Professional",
    rating: 5,
    avatar: "PK",
  },
  {
    quote: "The personalized meal plans are incredible. No more guesswork.",
    name: "Rajesh Kumar",
    role: "Personal Trainer",
    rating: 5,
    avatar: "RK",
  },
  {
    quote:
      "Best investment I've made for my health. The streak feature keeps me motivated!",
    name: "Neha Sharma",
    role: "Marathon Runner",
    rating: 5,
    avatar: "NS",
  },
  {
    quote: "As a coach, I recommend Calibre to all my clients. It just works.",
    name: "Vikram Patel",
    role: "Gym Owner",
    rating: 5,
    avatar: "VP",
  },
];

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="col-span-6 row-span-1 border border-border overflow-hidden">
      <CardContent className="px-6 py-2 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="font-black text-lg">Trusted by Thousands</h3>
            <Badge variant="secondary" className="text-xs font-semibold">
              4.8 ★
            </Badge>
          </div>
          {/* Indicators */}
          <div className="flex gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-6 bg-secondary"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative flex-1 overflow-hidden">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-500 ease-out ${
                idx === activeIndex
                  ? "opacity-100 translate-x-0"
                  : idx < activeIndex
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}
            >
              <div className="flex items-start gap-4 h-full">
                {/* Avatar */}
                <div className="shrink-0 w-11 h-11 rounded-full bg-linear-to-br from-primary/30 to-secondary/50 flex items-center justify-center border border-secondary/30 ring-1 ml-1 mt-1">
                  <span className="text-sm font-bold text-primary/80">
                    {testimonial.avatar}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-relaxed mb-3 text-foreground/90">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <HugeiconsIcon
                          key={i}
                          icon={StarIcon}
                          size={14}
                          className="text-secondary fill-primary"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
