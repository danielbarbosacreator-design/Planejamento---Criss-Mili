import { useEffect, useState } from "react";
import {
  STORAGE_KEY, USER_KEY, DEFAULT_ITEMS, DEFAULT_DELIVERABLES, DEFAULT_GALLERIES,
  VIEW_TITLES,
} from "./data.js";
import LoginScreen from "./components/LoginScreen.jsx";
import Sidebar from "./components/Sidebar.jsx";
import PhaseBar from "./components/PhaseBar.jsx";
import Stats from "./components/Stats.jsx";
import Toolbar from "./components/Toolbar.jsx";
import Calendar from "./components/Calendar.jsx";
import ContentModal from "./components/ContentModal.jsx";
import AccessModal from "./components/AccessModal.jsx";
import PlanViewer from "./components/PlanViewer.jsx";
import TopBar from "./components/TopBar.jsx";
import Planejamento from "./components/views/Planejamento.jsx";
import Redes from "./components/views/Redes.jsx";
import Site from "./components/views/Site.jsx";
import FotosIA from "./components/views/FotosIA.jsx";
import FotosPro from "./components/views/FotosPro.jsx";
import Videos from "./components/views/Videos.jsx";

function loadState() {
  let s = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) s = JSON.parse(raw);
  } catch (e) { /* ignore malformed storage */ }
  if (!s) s = { photo: null, items: DEFAULT_ITEMS, deliverables: DEFAULT_DELIVERABLES };
  if (!s.siteUrl) s.siteUrl = "";
  if (!s.galleries) s.galleries = JSON.parse(JSON.stringify(DEFAULT_GALLERIES));
  if (!s.galleries.fotosIA) s.galleries.fotosIA = { estudio: [], rua: [], evento: [], saidaReuniao: [] };
  if (!s.galleries.fotosPro) s.galleries.fotosPro = [];
  if (!s.accesses) s.accesses = { ig: { user: "", pass: "" }, fb: { user: "", pass: "" } };
  return s;
}

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch (e) {
    return null;
  }
}

export default function App() {
  const [state, setState] = useState(loadState);
  const [currentUser, setCurrentUser] = useState(loadUser);
  const [activeFilter, setActiveFilter] = useState("all");
  const [view, setView] = useState("dashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newItemDate, setNewItemDate] = useState(null);
  const [accessOpen, setAccessOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  if (!currentUser) {
    return (
      <LoginScreen
        onLogin={(user) => {
          localStorage.setItem(USER_KEY, JSON.stringify(user));
          setCurrentUser(user);
        }}
      />
    );
  }

  const isClient = currentUser.role === "cliente";

  function updateItem(id, patch) {
    setState((s) => ({ ...s, items: s.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) }));
  }
  function cycleStatus(id) {
    const order = ["planejado", "producao", "publicado"];
    const item = state.items.find((i) => i.id === id);
    const idx = order.indexOf(item.status);
    updateItem(id, { status: order[(idx + 1) % order.length] });
  }
  function cycleApproval(id) {
    const order = ["pendente", "aprovado", "reprovado"];
    const item = state.items.find((i) => i.id === id);
    const idx = order.indexOf(item.approval);
    const patch = { approval: order[(idx + 1) % order.length] };
    if (currentUser) patch.approvedBy = currentUser.name;
    updateItem(id, patch);
  }
  function handleLogout() {
    localStorage.removeItem(USER_KEY);
    setCurrentUser(null);
  }
  function openModal(id) {
    setEditingId(id);
    setNewItemDate(null);
    setModalOpen(true);
  }
  function openModalForDate(date) {
    setEditingId(null);
    setNewItemDate(date);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setNewItemDate(null);
  }
  function saveItem(data, isNew) {
    if (isNew) {
      const newItem = { ...data, id: "it" + Date.now(), approvedBy: null };
      setState((s) => ({ ...s, items: [...s.items, newItem] }));
    } else {
      updateItem(editingId, data);
    }
    closeModal();
  }
  function deleteItem() {
    if (!editingId) return;
    setState((s) => ({ ...s, items: s.items.filter((i) => i.id !== editingId) }));
    closeModal();
  }
  function resetPlan() {
    if (!window.confirm("Isso vai substituir todas as edições pelo plano padrão sugerido. Continuar?")) return;
    setState((s) => ({
      photo: s.photo,
      items: JSON.parse(JSON.stringify(DEFAULT_ITEMS)),
      deliverables: JSON.parse(JSON.stringify(DEFAULT_DELIVERABLES)),
      siteUrl: s.siteUrl,
      galleries: s.galleries,
      accesses: s.accesses,
    }));
  }
  function goToView(v) {
    setView(v);
    window.scrollTo(0, 0);
  }
  function goToDashboard() {
    setView("dashboard");
    window.scrollTo(0, 0);
  }

  function addGalleryPhotos(group, cat, urls) {
    setState((s) => {
      const galleries = { ...s.galleries };
      if (group === "fotosia") {
        galleries.fotosIA = { ...galleries.fotosIA, [cat]: [...galleries.fotosIA[cat], ...urls] };
      } else {
        galleries.fotosPro = [...galleries.fotosPro, ...urls];
      }
      return { ...s, galleries };
    });
  }
  function removeGalleryPhoto(group, cat, idx) {
    setState((s) => {
      const galleries = { ...s.galleries };
      if (group === "fotosia") {
        galleries.fotosIA = { ...galleries.fotosIA, [cat]: galleries.fotosIA[cat].filter((_, i) => i !== idx) };
      } else {
        galleries.fotosPro = galleries.fotosPro.filter((_, i) => i !== idx);
      }
      return { ...s, galleries };
    });
  }

  const editingItem = editingId ? state.items.find((i) => i.id === editingId) : null;

  return (
    <div id="appScreen" style={{ display: "block" }}>
      <div className="app-shell">
        <Sidebar
          photo={state.photo}
          onPhotoChange={(dataUrl) => setState((s) => ({ ...s, photo: dataUrl }))}
          currentUser={currentUser}
          onLogout={handleLogout}
          view={view}
          onNavigate={(v) => (v === "dashboard" ? goToDashboard() : goToView(v))}
          onOpenPlan={() => setPlanOpen(true)}
          onOpenAccess={() => setAccessOpen(true)}
          mobileOpen={mobileNavOpen}
          onCloseMobile={() => setMobileNavOpen(false)}
        />

        <div className="app-main">
          <TopBar
            currentUser={currentUser}
            isClient={isClient}
            items={state.items}
            onMobileMenu={() => setMobileNavOpen(true)}
            onOpenItem={openModal}
            onLogout={handleLogout}
          />

          <div className="app-main-inner">
            {view === "dashboard" && (
              <div id="view-dashboard" className="active">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                  <div className="dashboard-greeting">
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111827", margin: "0 0 6px" }}>Overview</h1>
                    <p style={{ color: "#6B7280", margin: 0, fontSize: 13 }}>Painel de acompanhamento e planejamento da campanha.</p>
                  </div>
                  <button className="btn-ghost" style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: 8, padding: "8px 12px", background: "white", border: "1px solid #E5E7EB", fontSize: 12, fontWeight: 600 }}>
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    16 AGO - 4 OUT, 2026
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                </div>

                <div className="section-card" style={{ padding: "24px", marginBottom: "20px" }}>
                  <div className="clean-title" style={{ fontSize: 10, color: "#9CA3AF", letterSpacing: "1px", marginBottom: 20 }}>PROGRESSO DA CAMPANHA</div>
                  <PhaseBar />
                </div>

                <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "20px" }}>
                  <Stats items={state.items} />
                </div>

                <div className="section-card" style={{ padding: "24px", marginTop: "20px" }}>
                  <div className="clean-title" style={{ fontSize: 10, color: "#9CA3AF", letterSpacing: "1px", marginBottom: 20 }}>CALENDÁRIO DE CONTEÚDO</div>
                  <Toolbar
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    onReset={resetPlan}
                    onAdd={() => openModal(null)}
                    isClient={isClient}
                  />
                  <Calendar
                    items={state.items}
                    activeFilter={activeFilter}
                    isClient={isClient}
                    onEdit={openModal}
                    onCycleStatus={cycleStatus}
                    onCycleApproval={cycleApproval}
                  />
                </div>
              </div>
            )}

            {view === "planejamento" && <div className="deliv-view active section-card"><Planejamento onOpenPlanViewer={() => setPlanOpen(true)} /></div>}
            {view === "redes" && <div className="deliv-view active section-card"><Redes items={state.items} isClient={isClient} onEdit={openModal} /></div>}
            {view === "site" && (
              <div className="deliv-view active section-card">
                <Site siteUrl={state.siteUrl} isClient={isClient} onSave={(url) => setState((s) => ({ ...s, siteUrl: url }))} />
              </div>
            )}
            {view === "fotosia" && (
              <div className="deliv-view active section-card">
                <FotosIA
                  galleries={state.galleries.fotosIA}
                  isClient={isClient}
                  onAdd={(cat, urls) => addGalleryPhotos("fotosia", cat, urls)}
                  onRemove={(cat, idx) => removeGalleryPhoto("fotosia", cat, idx)}
                />
              </div>
            )}
            {view === "fotospro" && (
              <div className="deliv-view active section-card">
                <FotosPro
                  photos={state.galleries.fotosPro}
                  isClient={isClient}
                  onAdd={(urls) => addGalleryPhotos("fotospro", null, urls)}
                  onRemove={(idx) => removeGalleryPhoto("fotospro", null, idx)}
                />
              </div>
            )}
            {view === "videos" && <div className="deliv-view active section-card"><Videos items={state.items} isClient={isClient} onEdit={openModal} /></div>}
          </div>
        </div>
      </div>

      <PlanViewer open={planOpen} onClose={() => setPlanOpen(false)} />
      <AccessModal
        open={accessOpen}
        accesses={state.accesses}
        onClose={() => setAccessOpen(false)}
        onSave={(accesses) => {
          setState((s) => ({ ...s, accesses }));
          setAccessOpen(false);
        }}
      />
      <ContentModal
        open={modalOpen}
        editingItem={editingItem}
        newItemDate={newItemDate}
        isClient={isClient}
        currentUser={currentUser}
        onSave={saveItem}
        onDelete={deleteItem}
        onCancel={closeModal}
      />
    </div>
  );
}
