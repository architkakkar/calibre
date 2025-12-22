import { cn } from "@/lib/utils";

// import { Rubik_Wet_Paint } from "next/font/google";
import { Wendy_One } from "next/font/google";
import { HugeiconsIcon } from "@hugeicons/react";
import { BodyPartMuscleIcon } from "@hugeicons/core-free-icons";

// const logoFont = Rubik_Wet_Paint({ subsets: ["latin"], weight: "400" });
const logoFont = Wendy_One({ subsets: ["latin"], weight: "400" });

export function AppLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-inner">
        <HugeiconsIcon icon={BodyPartMuscleIcon} strokeWidth={2} />
      </div>
      <span
        className={cn(
          "font-black tracking-wide text-foreground text-2xl",
          logoFont.className
        )}
      >
        Calibre
      </span>
    </div>
  );
}
