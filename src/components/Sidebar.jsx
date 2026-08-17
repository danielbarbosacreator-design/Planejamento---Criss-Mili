import { useEffect, useState } from "react";
import { ELECTION_DATE, NAV_ITEMS } from "../data.js";

const ICONS = {
  dashboard: <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  planejamento: <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  redes: <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>,
  site: <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
  fotosia: <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>,
  fotospro: <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>,
  videos: <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
};

function useCountdown() {
  const [diff, setDiff] = useState(() => Math.ceil((ELECTION_DATE - new Date()) / (1000 * 60 * 60 * 24)));
  useEffect(() => {
    const timer = setInterval(() => {
      setDiff(Math.ceil((ELECTION_DATE - new Date()) / (1000 * 60 * 60 * 24)));
    }, 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, []);
  return diff;
}

export default function Sidebar({
  view,
  navigate,
  onOpenPlan,
  onOpenAccess,
  currentUser,
  isClient,
  onLogout,
  mobileMenuOpen,
  onCloseMobile
}) {
  const diff = useCountdown();

  return (
    <>
      <div className={`sidebar-overlay ${mobileMenuOpen ? "show" : ""}`} onClick={onCloseMobile}></div>
      <aside className={`sidebar ${mobileMenuOpen ? "open" : ""}`} style={{ padding: "24px 20px" }}>
        
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#F97316", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16 }}>
            CM
          </div>
          <div>
            <div className="sidebar-brand-name" style={{ fontSize: 14, fontWeight: 700 }}>Cris Millis</div>
            <div className="sidebar-brand-role" style={{ fontSize: 10 }}>Dep. Estadual SC • Partido Novo</div>
          </div>
        </div>

        <div className="sidebar-countdown">
          <div className="countdown">{diff}</div>
          <div className="countdown-label">DIAS PARA O 1º TURNO</div>
          <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 600, marginTop: 4 }}>04/10/2026</div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={"sidebar-link" + (view === item.id ? " active" : "")}
              onClick={() => { navigate(item.id); onCloseMobile(); }}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", width: "100%", background: view === item.id ? "#1F242C" : "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
            >
              <span style={{ display: "flex", color: view === item.id ? "white" : "#8B949E" }}>{ICONS[item.id] || item.icon}</span>
              <span style={{ fontSize: 13 }}>{item.id === "dashboard" ? "Painel" : item.label}</span>
            </button>
          ))}
        </nav>

        <div style={{ height: 1, background: "#30363D", margin: "16px 0" }}></div>

        <nav className="sidebar-nav sidebar-nav-secondary">
          <button className="sidebar-link" onClick={() => { onOpenPlan(); onCloseMobile(); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", width: "100%", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
            <span style={{ display: "flex", color: "#8B949E" }}><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></span>
            <span style={{ fontSize: 13, color: "#8B949E" }}>Plano Estratégico</span>
          </button>
          <button className="sidebar-link" onClick={() => { onOpenAccess(); onCloseMobile(); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", width: "100%", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
            <span style={{ display: "flex", color: "#8B949E" }}><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span>
            <span style={{ fontSize: 13, color: "#8B949E" }}>Acessos</span>
          </button>
        </nav>

        <div className="sidebar-spacer" style={{ flex: 1 }}></div>
        <div style={{ padding: "0 16px", marginTop: 24 }}>
          <button onClick={onLogout} style={{ color: "#EF4444", textDecoration: "none", display: "flex", alignItems: "center", gap: 12, fontSize: "13px", fontWeight: "600", width: "100%", border: "none", background: "none", cursor: "pointer", padding: "12px 0" }}>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Sair da conta
          </button>
        </div>
      </aside>
    </>
  );
}
