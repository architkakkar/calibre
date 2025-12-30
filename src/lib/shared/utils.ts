import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapToDbEnum<
  TInput extends readonly string[],
  TEnum extends readonly string[]
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
        `Enum mismatch: "${value}" → "${normalized}" not in DB enum`
      );
    }

    map[value] = normalized;
  }

  return map;
}
