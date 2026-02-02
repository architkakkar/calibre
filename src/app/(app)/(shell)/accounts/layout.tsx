import type { Metadata } from "next";
import { AccountsShell } from "./_components/accounts-shell";

export const metadata: Metadata = {
  title: "Account Settings",
  description:
    "Manage your account details, fitness preferences, and app settings.",
};

export default function AccountsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <AccountsShell>{children}</AccountsShell>
    </div>
  );
}
