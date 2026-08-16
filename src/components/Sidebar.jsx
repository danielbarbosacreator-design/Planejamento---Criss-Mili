import { useEffect, useState } from "react";
import { ELECTION_DATE, NAV_ITEMS } from "../data.js";

const ICONS = {
  dashboard: <svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  planejamento: <svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>,
  redes: <svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>,
  site: <svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
  fotosia: <svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>,
  fotospro: <svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>,
  videos: <svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
};

function useCountdown() {
  const [diff, setDiff] = useState(() => Math.ceil((ELECTION_DATE - new Date()) / (1000 * 60 * 60 * 24)));
  useEffect(() => {
    const id = setInterval(() => {
      setDiff(Math.ceil((ELECTION_DATE - new Date()) / (1000 * 60 * 60 * 24)));
    }, 60000);
    return () => clearInterval(id);
  }, []);
  return diff;
}

export default function Sidebar({
  photo, onPhotoChange, currentUser, onLogout,
  view, onNavigate, onOpenPlan, onOpenAccess,
  mobileOpen, onCloseMobile,
}) {
  const diff = useCountdown();
  const countdownNum = diff > 0 ? diff : diff === 0 ? "Hoje!" : "Encerrado";
  const countdownLabel = diff > 0 ? "dias para o 1º turno (04/10)" : "";
  const isClient = currentUser && currentUser.role === "cliente";

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onPhotoChange(reader.result);
    reader.readAsDataURL(file);
  }

  function navigate(v) {
    onNavigate(v);
    onCloseMobile();
  }

  return (
    <>
      <div className={"sidebar-overlay" + (mobileOpen ? " show" : "")} onClick={onCloseMobile}></div>
      <aside className={"sidebar" + (mobileOpen ? " open" : "")}>
        <div className="sidebar-brand">
          <label className="avatar" title="Clique para adicionar foto da candidata" style={photo ? { backgroundImage: `url(${photo})` } : undefined}>
            {!photo && "CM"}
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
          </label>
          <div className="sidebar-brand-text">
            <div className="sidebar-brand-name">Cris Millis</div>
            <div className="sidebar-brand-role">Dep. Estadual SC · Partido Novo</div>
          </div>
        </div>

        <div className="sidebar-countdown">
          <div className="countdown">{countdownNum}</div>
          <div className="countdown-label">{countdownLabel}</div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={"sidebar-link" + (view === item.id ? " active" : "")}
              onClick={() => navigate(item.id)}
            >
              <span className="sidebar-link-icon">{ICONS[item.id] || item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-divider"></div>

        <nav className="sidebar-nav sidebar-nav-secondary">
          <button className="sidebar-link" onClick={() => { onOpenPlan(); onCloseMobile(); }}>
            <span className="sidebar-link-icon"><svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></span>
            <span>Plano Estratégico</span>
          </button>
          <button className="sidebar-link" onClick={() => { onOpenAccess(); onCloseMobile(); }}>
            <span className="sidebar-link-icon"><svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span>
            <span>Acessos</span>
          </button>
        </nav>

        <div className="sidebar-spacer"></div>
        <div style={{ padding: "0 10px" }}>
          <button className="logout-link" onClick={onLogout} style={{ color: "#DC2626", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, fontSize: "12.5px", fontWeight: "600", width: "100%", border: "none", background: "none", cursor: "pointer", padding: "10px" }}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Sair da conta
          </button>
        </div>
      </aside>
    </>
  );
}
