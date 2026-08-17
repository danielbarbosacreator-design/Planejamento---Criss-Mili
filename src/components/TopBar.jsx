import { useEffect, useMemo, useRef, useState } from "react";
import { fmtDate } from "../utils.js";

export default function TopBar({ currentUser, isClient, items, onMobileMenu, onOpenItem, onLogout }) {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return items
      .filter((i) =>
        i.title.toLowerCase().includes(q) ||
        i.type.toLowerCase().includes(q) ||
        (i.desc || "").toLowerCase().includes(q) ||
        (i.caption || "").toLowerCase().includes(q)
      )
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 8);
  }, [items, query]);

  const notifications = useMemo(() => {
    if (isClient) {
      return items
        .filter((i) => i.approval === "pendente")
        .map((i) => ({ id: i.id, text: `Aguardando sua aprovação: "${i.title}"` }));
    }
    return items
      .filter((i) => i.approval === "reprovado")
      .map((i) => ({ id: i.id, text: `Reprovado pelo cliente: "${i.title}"${i.approvalNote ? " — " + i.approvalNote : ""}` }));
  }, [items, isClient]);

  function openResult(id) {
    onOpenItem(id);
    setQuery("");
    setSearchOpen(false);
    setNotifOpen(false);
  }

  return (
    <div className="topbar">
      <div className="topbar-left">
        {onMobileMenu && (
          <button className="mobile-menu-btn" onClick={onMobileMenu} aria-label="Menu">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}
        <div className="topbar-search" ref={searchRef}>
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="text"
            placeholder="Buscar conteúdo..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSearchOpen(true); }}
            onFocus={() => setSearchOpen(true)}
          />
          {searchOpen && query.trim() && (
            <div className="topbar-dropdown search-dropdown">
              {results.length === 0 && <div className="dropdown-empty">Nada encontrado pra "{query.trim()}"</div>}
              {results.map((r) => (
                <button key={r.id} className="dropdown-item search-item" onClick={() => openResult(r.id)}>
                  <span className="search-item-title">{r.title}</span>
                  <span className="search-item-meta">{fmtDate(r.date).day} {fmtDate(r.date).month} · {r.type}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-notif" ref={notifRef}>
          <button className="icon-btn-clean notification-btn" onClick={() => setNotifOpen((o) => !o)} aria-label="Notificações">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            {notifications.length > 0 && <span className="notification-dot"></span>}
          </button>
          {notifOpen && (
            <div className="topbar-dropdown notif-dropdown">
              <div className="dropdown-title">Notificações</div>
              {notifications.length === 0 && <div className="dropdown-empty">Nenhuma novidade por aqui.</div>}
              {notifications.slice(0, 8).map((n) => (
                <button key={n.id} className="dropdown-item" onClick={() => openResult(n.id)}>{n.text}</button>
              ))}
            </div>
          )}
        </div>
        <div className="topbar-profile" ref={profileRef} onClick={() => setProfileOpen((o) => !o)}>
          <div className="topbar-avatar">{currentUser?.name?.charAt(0) || "U"}</div>
          <span className="topbar-name">{currentUser?.name?.split(" ")[0] || "User"}</span>
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
          {profileOpen && (
            <div className="topbar-dropdown profile-dropdown">
              <div className="dropdown-title">{currentUser?.name}</div>
              <div className="dropdown-role">{isClient ? "Cliente" : "Equipe"}</div>
              <button className="dropdown-item danger" onClick={onLogout}>Sair da conta</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
