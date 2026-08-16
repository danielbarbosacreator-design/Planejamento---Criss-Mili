import { useEffect, useState } from "react";
import { PLAN_PAGES } from "../data.js";

export default function PlanViewer({ open, onClose }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (open) setIdx(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "ArrowRight" && idx < PLAN_PAGES.length - 1) setIdx((i) => i + 1);
      if (e.key === "ArrowLeft" && idx > 0) setIdx((i) => i - 1);
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, idx, onClose]);

  if (!open) return null;

  return (
    <div className="plan-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="plan-topbar">
        <span>Plano Estratégico de Comunicação — Campanha Cris Millis 2026</span>
        <button className="close-x" onClick={onClose}>✕</button>
      </div>
      <div className="plan-imgwrap">
        <img src={PLAN_PAGES[idx]} alt="Página do plano estratégico" />
      </div>
      <div className="plan-nav">
        <button disabled={idx === 0} onClick={() => setIdx((i) => i - 1)}>← Anterior</button>
        <span className="pageind">Página {idx + 1} de {PLAN_PAGES.length}</span>
        <button disabled={idx === PLAN_PAGES.length - 1} onClick={() => setIdx((i) => i + 1)}>Próxima →</button>
      </div>
    </div>
  );
}
