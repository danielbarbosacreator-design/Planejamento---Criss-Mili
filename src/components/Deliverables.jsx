import { DELIV_VIEW_MAP } from "../data.js";

export default function Deliverables({ deliverables, onFieldChange, onOpen, isClient }) {
  return (
    <div className="deliverables">
      {deliverables.map((d) => (
        <div className="deliv-card clickable" key={d.id} onClick={() => onOpen(DELIV_VIEW_MAP[d.id])}>
          <h4>{d.name}</h4>
          <div className="meta">{d.note}{d.recurring ? " · recorrente" : ""}</div>
          <div className="open-hint">Clique para abrir →</div>
          <div style={{ display: "flex", gap: 6, margin: "8px 0 6px" }} onClick={(e) => e.stopPropagation()}>
            <input
              className="field-date"
              type="date"
              value={d.target}
              style={{ flex: 1 }}
              disabled={isClient}
              onChange={(e) => onFieldChange(d.id, "target", e.target.value)}
            />
          </div>
          <select
            className="status-select"
            value={d.status}
            disabled={isClient}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => onFieldChange(d.id, "status", e.target.value)}
          >
            <option value="planejado">Planejado</option>
            <option value="andamento">Em andamento</option>
            <option value="entregue">Entregue</option>
          </select>
        </div>
      ))}
    </div>
  );
}
