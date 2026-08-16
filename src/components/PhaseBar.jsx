import { PHASES } from "../data.js";
import { fmtDate } from "../utils.js";

export default function PhaseBar() {
  const now = new Date().toISOString().slice(0, 10);
  return (
    <>
      <div className="stepper-line"></div>
      <div className="phasebar">
        {PHASES.map((ph, idx) => {
          const active = now >= ph.range[0] && now <= ph.range[1];
          const done = now > ph.range[1];
          const d0 = fmtDate(ph.range[0]);
          const d1 = fmtDate(ph.range[1]);
          const statusText = active ? "Fase atual" : now < ph.range[0] ? "A iniciar" : "✓ Concluída";
          return (
            <div key={ph.id} style={{ display: "contents" }}>
              {idx > 0 && <div className="phase-arrow">→</div>}
              <div className={"phase-card" + (active ? " active" : "") + (done ? " done" : "")} style={{ color: `var(--${ph.cls})` }}>
                <div className="phase-head">
                  <span className="phase-step-num" style={{ background: `var(--${ph.cls})` }}>{done ? "✓" : idx + 1}</span>
                  <span className={"phase-tag tag-" + ph.cls}>{ph.label}</span>
                </div>
                <div className="phase-name" style={{ marginTop: 6, color: "var(--navy)" }}>{d0.day} {d0.month} → {d1.day} {d1.month}</div>
                <div className="phase-dates">{statusText}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
