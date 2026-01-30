"use client";

import { useState } from "react";

interface MacroRingChartProps {
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
}

type HoveredSegment = "protein" | "carbs" | "fats" | null;

export function MacroRingChart({
  proteinGrams,
  carbsGrams,
  fatsGrams,
  size = "md",
  showLabels = true,
}: MacroRingChartProps) {
  const [hoveredSegment, setHoveredSegment] = useState<HoveredSegment>(null);

  // Calculate percentages
  const totalGrams = proteinGrams + carbsGrams + fatsGrams;
  const proteinPercent = totalGrams > 0 ? (proteinGrams / totalGrams) * 100 : 0;
  const carbsPercent = totalGrams > 0 ? (carbsGrams / totalGrams) * 100 : 0;
  const fatsPercent = totalGrams > 0 ? (fatsGrams / totalGrams) * 100 : 0;

  // Size configurations
  const sizeConfig = {
    sm: { radius: 30, stroke: 6, fontSize: "text-[10px]" },
    md: { radius: 40, stroke: 8, fontSize: "text-xs" },
    lg: { radius: 50, stroke: 10, fontSize: "text-sm" },
  };

  const config = sizeConfig[size];
  const circumference = 2 * Math.PI * config.radius;

  // Calculate stroke dash offsets for each segment
  const proteinDash = (proteinPercent / 100) * circumference;
  const carbsDash = (carbsPercent / 100) * circumference;
  const fatsDash = (fatsPercent / 100) * circumference;

  const svgSize = (config.radius + config.stroke) * 2;

  // Get display info based on hovered segment
  const getDisplayInfo = () => {
    if (hoveredSegment === "protein") {
      return {
        label: "Protein",
        value: proteinGrams,
        percent: proteinPercent,
        color: "text-blue-500",
      };
    }
    if (hoveredSegment === "carbs") {
      return {
        label: "Carbs",
        value: carbsGrams,
        percent: carbsPercent,
        color: "text-amber-500",
      };
    }
    if (hoveredSegment === "fats") {
      return {
        label: "Fats",
        value: fatsGrams,
        percent: fatsPercent,
        color: "text-emerald-500",
      };
    }
    return {
      label: "Total",
      value: totalGrams,
      percent: 100,
      color: "text-foreground",
    };
  };

  const displayInfo = getDisplayInfo();

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative group"
        style={{ width: svgSize, height: svgSize }}
      >
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={config.radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke}
            className="text-muted/20"
          />

          {/* Protein segment (blue) */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={config.radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={config.stroke}
            strokeDasharray={`${proteinDash} ${circumference}`}
            strokeDashoffset="0"
            strokeLinecap="round"
            className={`transition-all duration-300 cursor-pointer ${
              hoveredSegment === "protein"
                ? "opacity-100 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                : hoveredSegment
                  ? "opacity-30"
                  : "opacity-100 hover:opacity-100 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
            }`}
            onMouseEnter={() => setHoveredSegment("protein")}
            onMouseLeave={() => setHoveredSegment(null)}
          />

          {/* Carbs segment (amber) */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={config.radius}
            fill="none"
            stroke="#f59e0b"
            strokeWidth={config.stroke}
            strokeDasharray={`${carbsDash} ${circumference}`}
            strokeDashoffset={-proteinDash}
            strokeLinecap="round"
            className={`transition-all duration-300 cursor-pointer ${
              hoveredSegment === "carbs"
                ? "opacity-100 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                : hoveredSegment
                  ? "opacity-30"
                  : "opacity-100 hover:opacity-100 hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
            }`}
            onMouseEnter={() => setHoveredSegment("carbs")}
            onMouseLeave={() => setHoveredSegment(null)}
          />

          {/* Fats segment (emerald) */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={config.radius}
            fill="none"
            stroke="#10b981"
            strokeWidth={config.stroke}
            strokeDasharray={`${fatsDash} ${circumference}`}
            strokeDashoffset={-(proteinDash + carbsDash)}
            strokeLinecap="round"
            className={`transition-all duration-300 cursor-pointer ${
              hoveredSegment === "fats"
                ? "opacity-100 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                : hoveredSegment
                  ? "opacity-30"
                  : "opacity-100 hover:opacity-100 hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
            }`}
            onMouseEnter={() => setHoveredSegment("fats")}
            onMouseLeave={() => setHoveredSegment(null)}
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div
            className={`${config.fontSize} font-bold transition-colors duration-300 ${displayInfo.color}`}
          >
            {displayInfo.value}g
          </div>
          <div className="text-[8px] text-muted-foreground uppercase tracking-wide">
            {displayInfo.label}
          </div>
          {hoveredSegment && (
            <div className="text-[8px] font-semibold text-muted-foreground mt-0.5">
              {displayInfo.percent.toFixed(0)}%
            </div>
          )}
        </div>
      </div>

      {showLabels && (
        <div className="flex items-center gap-3 justify-center flex-wrap">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className={`${config.fontSize} text-muted-foreground`}>
              P: {proteinGrams}g
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            <span className={`${config.fontSize} text-muted-foreground`}>
              C: {carbsGrams}g
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className={`${config.fontSize} text-muted-foreground`}>
              F: {fatsGrams}g
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
