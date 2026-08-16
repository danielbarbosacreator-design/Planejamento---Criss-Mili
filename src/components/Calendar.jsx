import { fmtDate, weekIndex } from "../utils.js";
import ItemCard from "./ItemCard.jsx";

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
    <div>
      {weekKeys.map((w) => {
        const wItems = weeks[w];
        const range = wItems.length
          ? `${fmtDate(wItems[0].date).day} ${fmtDate(wItems[0].date).month} – ${fmtDate(wItems[wItems.length - 1].date).day} ${fmtDate(wItems[wItems.length - 1].date).month}`
          : "";
        return (
          <div className="week-group" key={w}>
            <div className="week-header">
              <h3>{WEEK_LABELS[w] || "Semana " + (parseInt(w) + 1)}</h3>
              <span className="wrange">{range}</span>
            </div>
            {wItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                isClient={isClient}
                onEdit={() => onEdit(item.id)}
                onCycleStatus={() => onCycleStatus(item.id)}
                onCycleApproval={() => onCycleApproval(item.id)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
