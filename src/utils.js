import { MONTHS, WEEKDAYS } from "./data.js";

export function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return { day: d.getDate(), month: MONTHS[d.getMonth()], weekday: WEEKDAYS[d.getDay()] };
}

export function weekIndex(iso) {
  const start = new Date("2026-08-16T00:00:00");
  const d = new Date(iso + "T00:00:00");
  return Math.floor((d - start) / (1000 * 60 * 60 * 24 * 7));
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
