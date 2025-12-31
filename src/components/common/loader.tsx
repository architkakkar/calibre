"use client";

import { useGlobalStore } from "@/stores/global.store";
import Image from "next/image";

export function Loader() {
  const { isLoading, loaderMessage } = useGlobalStore();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/40 backdrop-blur-xs">
      <div
        className={`flex flex-col items-center gap-4 rounded-xl bg-primary/60 px-6 py-6 text-center border border-border shadow-2xl ${
          loaderMessage ? "w-40" : "w-20"
        }`}
      >
        <Image
          src="/spinner.svg"
          alt="Loading spinner"
          width={35}
          height={35}
        />
        {loaderMessage && <p className="text-sm">{loaderMessage}</p>}
      </div>
    </div>
  );
}
