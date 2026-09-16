export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Rough two-letter index used by the terminal and rails: 01, 02, 03 ... */
export function indexLabel(n: number): string {
  return String(n).padStart(2, "0");
}

const timeFormatters = new Map<string, Intl.DateTimeFormat>();

export function timeInZone(date: Date, timeZone: string): string {
  let formatter = timeFormatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });
    timeFormatters.set(timeZone, formatter);
  }
  return formatter.format(date);
}
