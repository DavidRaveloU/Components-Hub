import type { ParsedTime, TimeRange } from "../types/timeSlot.types";

/**
 * Parsea string de tiempo en formato 24h a objeto
 * Input: "15:30" o "09:10"
 */
export function parseTime(time: string): ParsedTime {
  const [hoursStr, minutesStr] = time.split(":");
  const hours = parseInt(hoursStr);
  const minutes = parseInt(minutesStr);
  return { hours, minutes };
}

/**
 * Convierte ParsedTime a minutos totales desde medianoche
 */
export function timeToMinutes(parsed: ParsedTime): number {
  return parsed.hours * 60 + parsed.minutes;
}

/**
 * Convierte minutos a formato HH:MM
 */
export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

/**
 * Verifica si From es antes que To
 */
export function isValidTimeRange(from: string, to: string): boolean {
  const fromMinutes = timeToMinutes(parseTime(from));
  const toMinutes = timeToMinutes(parseTime(to));
  return fromMinutes < toMinutes;
}

/**
 * Detecta si hay overlap entre rangos
 */
export function hasOverlap(ranges: TimeRange[]): boolean {
  for (let i = 0; i < ranges.length; i++) {
    for (let j = i + 1; j < ranges.length; j++) {
      const start1 = timeToMinutes(parseTime(ranges[i].from));
      const end1 = timeToMinutes(parseTime(ranges[i].to));
      const start2 = timeToMinutes(parseTime(ranges[j].from));
      const end2 = timeToMinutes(parseTime(ranges[j].to));

      if (start1 < end2 && start2 < end1) return true;
    }
  }
  return false;
}

/**
 * Genera ID único
 */
export function generateTimeId(): string {
  return `time-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Ajusta 'to' sumando 1 minuto a 'from' si to <= from
 * Caso especial: Si from es 23:59, to será 23:59 (no se puede pasar de medianoche)
 */
export function adjustToTime(from: string): string {
  const fromMinutes = timeToMinutes(parseTime(from));

  // Caso especial: 23:59 es el máximo
  if (fromMinutes >= 1439) {
    // 23:59 = 1439 minutos
    return "23:59";
  }

  // Sumar 1 minuto
  const newToMinutes = fromMinutes + 1;
  return minutesToTime(newToMinutes);
}

/**
 * Ajusta 'from' restando 1 minuto a 'to' si from >= to
 */
export function adjustFromTime(to: string): string {
  const toMinutes = timeToMinutes(parseTime(to));

  // Caso especial: 00:00 es el mínimo
  if (toMinutes <= 0) {
    return "00:00";
  }

  // Restar 1 minuto
  const newFromMinutes = toMinutes - 1;
  return minutesToTime(newFromMinutes);
}
