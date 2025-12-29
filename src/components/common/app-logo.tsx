import { cn } from "@/lib/shared/utils";
import { Wendy_One } from "next/font/google";
import { HugeiconsIcon } from "@hugeicons/react";
import { BodyPartMuscleIcon } from "@hugeicons/core-free-icons";
import { APP_NAME } from "@/lib/shared/constants";

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
        {APP_NAME}
      </span>
    </div>
  );
}
