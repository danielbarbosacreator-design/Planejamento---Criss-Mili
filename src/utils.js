import { MONTHS, WEEKDAYS } from "./data.js";

export function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return { day: d.getDate(), month: MONTHS[d.getMonth()], weekday: WEEKDAYS[d.getDay()] };
}

// Local calendar date, not UTC — toISOString() rolls to the next day in the evening for timezones west of UTC (e.g. Brazil).
export function todayIso() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function statusLabel(s) {
  return s === "planejado" ? "Planejado" : s === "producao" ? "Em produção" : "Publicado";
}

export function approvalLabel(a) {
  return a === "aprovado" ? "✓ Aprovado" : a === "reprovado" ? "✕ Reprovado" : "Aguardando aprovação";
}

export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
