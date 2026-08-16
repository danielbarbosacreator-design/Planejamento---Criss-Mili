import React from "react";
import { fmtDate, weekIndex } from "../utils.js";

const WEEK_LABELS = { 0: "Semana 1 — Sensibilizar", 1: "Semana 2 — Sensibilizar", 2: "Semana 3 — Sensibilizar → Motivar", 3: "Semana 4 — Motivar", 4: "Semana 5 — Motivar", 5: "Semana 6 — Mobilizar", 6: "Semana 7 — Mobilizar (reta final)" };

export default function Calendar({ items, activeFilter, isClient, onEdit, onCycleStatus, onCycleApproval }) {
  let filtered = [...items].sort((a, b) => a.date.localeCompare(b.date));
  if (activeFilter !== "all") {
    filtered = filtered.filter((i) => i.channels.includes(activeFilter));
  }
  if (filtered.length === 0) {
    return <div className="empty">Nenhum conteúdo neste filtro. Clique em "+ Novo conteúdo" para adicionar.</div>;
  }

  const weeks = {};
  filtered.forEach((i) => {
    const w = weekIndex(i.date);
    if (!weeks[w]) weeks[w] = [];
    weeks[w].push(i);
  });

  const weekKeys = Object.keys(weeks).sort((a, b) => a - b);

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="clean-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Conteúdo</th>
            <th>Formato/Canal</th>
            <th>Status</th>
            <th>Aprovação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {weekKeys.map((w) => {
            const wItems = weeks[w];
            const range = wItems.length
              ? `${fmtDate(wItems[0].date).day} ${fmtDate(wItems[0].date).month} – ${fmtDate(wItems[wItems.length - 1].date).day} ${fmtDate(wItems[wItems.length - 1].date).month}`
              : "";
            return (
              <React.Fragment key={w}>
                <tr>
                  <td colSpan="6" style={{ background: "#F9FAFB", fontWeight: 700, fontSize: "11px", color: "#6B7280", textTransform: "uppercase" }}>
                    {WEEK_LABELS[w] || "Semana " + (parseInt(w) + 1)} <span style={{ fontWeight: 400, textTransform: "none", marginLeft: 8 }}>{range}</span>
                  </td>
                </tr>
                {wItems.map((item) => (
                  <tr key={item.id}>
                    <td style={{ whiteSpace: "nowrap" }}>{fmtDate(item.date).day} {fmtDate(item.date).month}</td>
                    <td style={{ fontWeight: 600 }}>{item.title}</td>
                    <td>{item.channels.length > 0 ? item.channels.join(", ") : item.type}</td>
                    <td>
                      <button className={`status-pill st-${item.status}`} onClick={() => onCycleStatus(item.id)}>
                        {item.status}
                      </button>
                    </td>
                    <td>
                      <button className={`approval-pill ap-${item.approval}`} onClick={() => onCycleApproval(item.id)} disabled={isClient && item.approval !== "pendente"}>
                        {item.approval}
                      </button>
                    </td>
                    <td>
                      <button className="icon-btn-clean" style={{ width: 28, height: 28 }} onClick={() => onEdit(item.id)}>
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
