import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapToDbEnum<
  TInput extends readonly string[],
  TEnum extends readonly string[],
>(input: TInput, enumValues: TEnum): Record<TInput[number], TEnum[number]> {
  const map = {} as Record<TInput[number], TEnum[number]>;

  for (const value of input as readonly TInput[number][]) {
    const normalized = value
      .toUpperCase()
      .replaceAll(" ", "_")
      .replace("+", "_PLUS")
      .replace("-", "_") as TEnum[number];

    if (!enumValues.includes(normalized)) {
      throw new Error(
        `Enum mismatch: "${value}" → "${normalized}" not in DB enum`,
      );
    }

    map[value] = normalized;
  }

  return map;
}

export function formatRelativeTime(date: Date) {
  const diff = Date.now() - date.getTime();
  const day = 86400000;

  if (diff < day) return "Today";
  if (diff < day * 2) return "Yesterday";

  const days = Math.floor(diff / day);

  return `${days}d ago`;
}

export function groupChatsByTime(
  chats: { id: string; title: string | null; updatedAt: string }[],
) {
  const now = Date.now();
  const day = 86400000;

  return {
    Today: chats.filter((c) => now - new Date(c.updatedAt).getTime() < day),
    "This Week": chats.filter(
      (c) =>
        now - new Date(c.updatedAt).getTime() >= day &&
        now - new Date(c.updatedAt).getTime() < day * 7,
    ),
    Earlier: chats.filter(
      (c) => now - new Date(c.updatedAt).getTime() >= day * 7,
    ),
  };
}
