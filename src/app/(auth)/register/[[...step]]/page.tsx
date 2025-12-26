import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Register · Calibre",
  description: "Create a new Calibre account to get started.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-background p-4">
      <SignUp />
    </div>
  );
}
