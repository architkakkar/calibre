"use client";

import { useState, ReactNode } from "react";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { ArrowReloadHorizontalIcon } from "@hugeicons/core-free-icons";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FlipCardProps {
  icon: IconSvgElement;
  title: string;
  description: string;
  badges: string[];
  visual: ReactNode;
}

export function FlipCard({
  icon,
  title,
  description,
  badges,
  visual,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="h-full cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        perspective: "1000px",
      }}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Card Front */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            width: "100%",
            height: "100%",
          }}
        >
          <Card className="h-full relative overflow-hidden border border-border/70 bg-card/80 backdrop-blur-sm hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] group py-0">
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `radial-gradient(circle at 85% 15%, var(--primary)15 0%, transparent 50%)`,
              }}
            />
            <div className="pointer-events-none absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/15 rounded-full blur-2xl" />
            </div>

            <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group/flip hover:bg-primary/20 hover:scale-110 transition-all duration-300 z-50">
              <HugeiconsIcon
                icon={ArrowReloadHorizontalIcon}
                className="w-3.5 h-3.5 text-primary/60 group-hover/flip:text-primary group-hover/flip:rotate-180 transition-all duration-300"
                strokeWidth={2.5}
              />
            </div>

            <div className="relative h-full">
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full">{visual}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Card Back */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Card className="h-full relative overflow-hidden border border-border/70 bg-card/80 backdrop-blur-sm hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex flex-col">
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at 20% 80%, var(--primary)20 0%, transparent 50%)`,
              }}
            />

            <div className="pointer-events-none absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-20 h-20 border-2 border-primary/30 rounded-full" />
              <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-primary/20 rounded-lg rotate-45" />
            </div>

            <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group/flip hover:bg-primary/20 hover:scale-110 transition-all duration-300">
              <HugeiconsIcon
                icon={ArrowReloadHorizontalIcon}
                className="w-3.5 h-3.5 text-primary/60 group-hover/flip:text-primary group-hover/flip:rotate-180 transition-all duration-300"
                strokeWidth={2.5}
              />
            </div>

            <CardHeader className="relative flex-1 flex flex-col justify-between ">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-10 h-10 rounded-xl bg-linear-to-br from-primary/20 to-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <div className="absolute inset-0 rounded-xl bg-primary/10 blur group-hover:blur-md transition-all" />
                    <HugeiconsIcon
                      icon={icon}
                      strokeWidth={2}
                      className="relative group-hover:rotate-12 transition-transform duration-300"
                    />
                  </div>
                  <CardTitle className="font-black text-xl tracking-tight">
                    {title}
                  </CardTitle>
                </div>
                <p className="text-sm leading-relaxed text-foreground/75">
                  {description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5">
                  {badges.map((badge) => (
                    <Badge
                      key={badge}
                      variant="secondary"
                      className="font-medium text-[11px] px-2 py-0.5 bg-secondary/70 hover:bg-secondary transition-colors"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
