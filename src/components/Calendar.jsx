import { useMemo, useState } from "react";
import { PHASES } from "../data.js";
import { todayIso } from "../utils.js";

const WEEKDAY_HEAD = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTH_NAMES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const TODAY_ISO = todayIso();

function pad2(n) {
  return String(n).padStart(2, "0");
}
function isoOf(year, month, day) {
  return `${year}-${pad2(month + 1)}-${pad2(day)}`;
}
function phaseForDate(iso) {
  return PHASES.find((p) => iso >= p.range[0] && iso <= p.range[1]);
}
function buildWeeks(year, month) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function EventChip({ item, isClient, onEdit, onCycleStatus, onCycleApproval, showType }) {
  const primaryChannel = item.channels[0];
  return (
    <div className={"cal-event" + (primaryChannel ? " chan-" + primaryChannel : " chan-type")}>
      <button
        type="button"
        className={"cal-event-dot st-" + item.status}
        title={"Status: " + item.status + (isClient ? "" : " (clique para avançar)")}
        onClick={(e) => { e.stopPropagation(); onCycleStatus(item.id); }}
        disabled={isClient}
      ></button>
      <button type="button" className="cal-event-title" onClick={() => onEdit(item.id)} title={item.title}>
        {item.title}
        {showType && <span className="cal-event-type">{item.channels.length ? item.channels.join(", ") : item.type}</span>}
      </button>
      {item.approval !== "pendente" && (
        <button
          type="button"
          className={"cal-event-approval ap-" + item.approval}
          title={"Aprovação: " + item.approval + " (clique para alterar)"}
          onClick={(e) => { e.stopPropagation(); onCycleApproval(item.id); }}
          disabled={isClient}
        >
          {item.approval === "aprovado" ? "✓" : "✕"}
        </button>
      )}
    </div>
  );
}

export default function Calendar({ items, activeFilter, isClient, onEdit, onAddOnDate, onCycleStatus, onCycleApproval }) {
  const filtered = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((i) => i.channels.includes(activeFilter));
  }, [items, activeFilter]);

  const byDate = useMemo(() => {
    const map = {};
    filtered.forEach((i) => {
      (map[i.date] || (map[i.date] = [])).push(i);
    });
    Object.values(map).forEach((arr) => arr.sort((a, b) => a.id.localeCompare(b.id)));
    return map;
  }, [filtered]);

  const bounds = useMemo(() => {
    if (items.length === 0) return null;
    const dates = items.map((i) => i.date).sort();
    return { min: dates[0].slice(0, 7), max: dates[dates.length - 1].slice(0, 7) };
  }, [items]);

  const [cursor, setCursor] = useState(() => {
    const startIso = items.length ? items.slice().sort((a, b) => a.date.localeCompare(b.date))[0].date : TODAY_ISO;
    const d = new Date(startIso + "T00:00:00");
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const ymKey = `${cursor.year}-${pad2(cursor.month + 1)}`;
  const atMin = bounds ? ymKey <= bounds.min : false;
  const atMax = bounds ? ymKey >= bounds.max : false;
  const canGoToday = !bounds || (TODAY_ISO.slice(0, 7) >= bounds.min && TODAY_ISO.slice(0, 7) <= bounds.max);

  function shiftMonth(delta) {
    setCursor((c) => {
      let month = c.month + delta;
      let year = c.year;
      if (month < 0) { month = 11; year -= 1; }
      if (month > 11) { month = 0; year += 1; }
      return { year, month };
    });
  }
  function goToday() {
    const d = new Date(TODAY_ISO + "T00:00:00");
    setCursor({ year: d.getFullYear(), month: d.getMonth() });
  }

  const weeks = buildWeeks(cursor.year, cursor.month);

  const agendaDays = useMemo(() => {
    return Object.entries(byDate)
      .filter(([date]) => date.slice(0, 7) === ymKey)
      .sort(([a], [b]) => a.localeCompare(b));
  }, [byDate, ymKey]);

  const monthCount = agendaDays.reduce((n, [, arr]) => n + arr.length, 0);

  return (
    <div className="cal-wrap">
      <div className="cal-nav">
        <div className="cal-nav-controls">
          <button className="cal-nav-btn" onClick={() => shiftMonth(-1)} disabled={atMin} aria-label="Mês anterior">‹</button>
          <div className="cal-nav-title">{MONTH_NAMES[cursor.month]} <span>{cursor.year}</span></div>
          <button className="cal-nav-btn" onClick={() => shiftMonth(1)} disabled={atMax} aria-label="Próximo mês">›</button>
          {canGoToday && <button className="cal-nav-today" onClick={goToday}>Hoje</button>}
        </div>
        <div className="cal-nav-meta">
          <span className="cal-nav-count">{monthCount} {monthCount === 1 ? "conteúdo" : "conteúdos"}</span>
          <div className="cal-legend">
            {PHASES.map((p) => (
              <span key={p.id} className={"cal-legend-item tag-" + p.cls}>{p.label.replace(" »", "")}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop / tablet: month grid, Google Calendar style */}
      <div className="cal-grid-wrap">
        <div className="cal-grid">
          {WEEKDAY_HEAD.map((w) => (
            <div className="cal-head-cell" key={w}>{w}</div>
          ))}
          {weeks.map((week, wi) =>
            week.map((day, di) => {
              if (day === null) return <div className="cal-cell cal-cell-empty" key={`${wi}-${di}`}></div>;
              const iso = isoOf(cursor.year, cursor.month, day);
              const dayItems = byDate[iso] || [];
              const phase = phaseForDate(iso);
              const isToday = iso === TODAY_ISO;
              const visible = dayItems.slice(0, 3);
              const rest = dayItems.length - visible.length;
              return (
                <div key={iso} className={"cal-cell" + (isToday ? " cal-cell-today" : "") + (phase ? " cal-phase-" + phase.cls : "")}>
                  <div className="cal-cell-head">
                    <span className={"cal-cell-date" + (isToday ? " is-today" : "")}>{day}</span>
                    {!isClient && (
                      <button className="cal-cell-add" onClick={() => onAddOnDate(iso)} title="Adicionar conteúdo neste dia">+</button>
                    )}
                  </div>
                  <div className="cal-cell-events">
                    {visible.map((item) => (
                      <EventChip key={item.id} item={item} isClient={isClient} onEdit={onEdit} onCycleStatus={onCycleStatus} onCycleApproval={onCycleApproval} />
                    ))}
                    {rest > 0 && <div className="cal-more">+{rest} mais</div>}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Mobile: agenda / schedule list, Google Calendar app style */}
      <div className="cal-agenda">
        {agendaDays.length === 0 && (
          <div className="cal-agenda-empty">
            Nenhum conteúdo neste mês{activeFilter !== "all" ? " para este filtro" : ""}.
            {!isClient && (
              <button className="cal-agenda-add-empty" onClick={() => onAddOnDate(isoOf(cursor.year, cursor.month, 1))}>+ Novo conteúdo</button>
            )}
          </div>
        )}
        {agendaDays.map(([iso, dayItems]) => {
          const d = new Date(iso + "T00:00:00");
          const phase = phaseForDate(iso);
          const isToday = iso === TODAY_ISO;
          return (
            <div className={"cal-agenda-day" + (phase ? " cal-phase-" + phase.cls : "")} key={iso}>
              <div className="cal-agenda-date">
                <div className={"cal-agenda-daynum" + (isToday ? " is-today" : "")}>{d.getDate()}</div>
                <div className="cal-agenda-dayname">{WEEKDAY_HEAD[d.getDay()]}</div>
              </div>
              <div className="cal-agenda-list">
                {dayItems.map((item) => (
                  <EventChip key={item.id} item={item} isClient={isClient} onEdit={onEdit} onCycleStatus={onCycleStatus} onCycleApproval={onCycleApproval} showType />
                ))}
                {!isClient && (
                  <button className="cal-agenda-add" onClick={() => onAddOnDate(iso)}>+ Adicionar conteúdo</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
