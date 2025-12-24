import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Login · Calibre",
  description: "Login to your Calibre account to access your dashboard.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-background">
      <SignIn />
    </div>
  );
}
