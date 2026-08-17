import { PHASES } from "../data.js";
import { fmtDate, todayIso } from "../utils.js";

const ICONS = [
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>,
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><polygon points="11 19 2 12 11 5 11 19"></polygon><path d="M22 12A10 10 0 0 0 12 2v20a10 10 0 0 0 10-10z"></path></svg>
];

export default function PhaseBar() {
  const now = todayIso();
  let progress = 0;
  if (now >= PHASES[0].range[0] && now <= PHASES[0].range[1]) progress = 15;
  else if (now > PHASES[0].range[1] && now < PHASES[1].range[0]) progress = 33;
  else if (now >= PHASES[1].range[0] && now <= PHASES[1].range[1]) progress = 50;
  else if (now > PHASES[1].range[1] && now < PHASES[2].range[0]) progress = 66;
  else if (now >= PHASES[2].range[0] && now <= PHASES[2].range[1]) progress = 85;
  else if (now > PHASES[2].range[1]) progress = 100;

  return (
    <div className="phasebar-new">
      <div className="phase-line-bg"></div>
      <div className="phase-line-fill" style={{ width: `${progress}%` }}></div>
      
      {PHASES.map((ph, idx) => {
        const active = now >= ph.range[0] && now <= ph.range[1];
        const done = now > ph.range[1];
        const d0 = fmtDate(ph.range[0]);
        const d1 = fmtDate(ph.range[1]);
        const statusText = active ? "Fase atual" : now < ph.range[0] ? "A iniciar" : "Concluída";
        
        let color = "#111827";
        if (idx === 1) color = "#F97316";
        if (idx === 2) color = "#EF4444";
        
        return (
          <div key={ph.id} style={{ display: "contents" }}>
            {idx > 0 && <div className="phase-arrow-new"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>}
            
            <div className={`phase-item ${active ? "active" : ""}`}>
              <div className="phase-item-info">
                <div className="phase-item-title">
                  <div className="phase-item-num" style={{ background: color }}>{idx + 1}</div>
                  <span style={{ color }}>{ph.label} {active && "»"}</span>
                </div>
                <div className="phase-item-date">{d0.day} {d0.month.toUpperCase()} {">"} {d1.day} {d1.month.toUpperCase()}</div>
                <div className="phase-item-sub">{statusText}</div>
              </div>
              <div className="phase-item-icon" style={{ color }}>
                {ICONS[idx]}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
