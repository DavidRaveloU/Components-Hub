import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combinar clases de tailwind */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
