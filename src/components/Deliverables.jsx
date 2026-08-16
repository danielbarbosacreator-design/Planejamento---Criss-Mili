import { DELIV_VIEW_MAP } from "../data.js";

export default function Deliverables({ deliverables, onOpen, isClient }) {
  return (
    <div className="progress-list">
      {deliverables.map((d) => {
        let pct = 0;
        if (d.status === "entregue") pct = 100;
        else if (d.status === "andamento") pct = 60;
        else pct = 10;
        
        return (
          <div className="prog-item" key={d.id} onClick={() => onOpen(DELIV_VIEW_MAP[d.id])} style={{cursor:"pointer", paddingBottom: "10px"}}>
            <div className="prog-head">
              <span>{d.name}</span>
              <span style={{ color: "#6B7280" }}>{pct}%</span>
            </div>
            <div className="prog-bar-bg">
              <div className="prog-bar-fill" style={{ width: `${pct}%` }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
