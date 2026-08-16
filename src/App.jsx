import { useEffect, useState } from "react";
import {
  STORAGE_KEY, USER_KEY, DEFAULT_ITEMS, DEFAULT_DELIVERABLES, DEFAULT_GALLERIES,
  VIEW_TITLES,
} from "./data.js";
import LoginScreen from "./components/LoginScreen.jsx";
import Header from "./components/Header.jsx";
import PhaseBar from "./components/PhaseBar.jsx";
import Stats from "./components/Stats.jsx";
import Deliverables from "./components/Deliverables.jsx";
import Toolbar from "./components/Toolbar.jsx";
import Calendar from "./components/Calendar.jsx";
import ContentModal from "./components/ContentModal.jsx";
import AccessModal from "./components/AccessModal.jsx";
import PlanViewer from "./components/PlanViewer.jsx";
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
  const [accessOpen, setAccessOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);

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
  function openModal(id) {
    setEditingId(id);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
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
      <div className="wrap">
        <Header
          photo={state.photo}
          onPhotoChange={(dataUrl) => setState((s) => ({ ...s, photo: dataUrl }))}
          currentUser={currentUser}
          onLogout={() => {
            localStorage.removeItem(USER_KEY);
            setCurrentUser(null);
          }}
          onOpenPlan={() => setPlanOpen(true)}
          onOpenAccess={() => setAccessOpen(true)}
        />

        {view !== "dashboard" && (
          <div className="subnav-back show">
            <button className="btn btn-ghost" onClick={goToDashboard}>← Voltar ao painel</button>
            <span className="subnav-title">{VIEW_TITLES[view] || ""}</span>
          </div>
        )}

        {view === "dashboard" && (
          <div id="view-dashboard" className="active">
            <PhaseBar />
            <Stats items={state.items} />

            <div className="section-title">Entregáveis contratados</div>
            <Deliverables
              deliverables={state.deliverables}
              isClient={isClient}
              onOpen={goToView}
              onFieldChange={(id, field, value) => {
                setState((s) => ({
                  ...s,
                  deliverables: s.deliverables.map((d) => (d.id === id ? { ...d, [field]: value } : d)),
                }));
              }}
            />

            <div className="section-title" style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 10 }}>
              Calendário de conteúdo
            </div>
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
        )}

        {view === "planejamento" && <div className="deliv-view active"><Planejamento onOpenPlanViewer={() => setPlanOpen(true)} /></div>}
        {view === "redes" && <div className="deliv-view active"><Redes items={state.items} isClient={isClient} onEdit={openModal} /></div>}
        {view === "site" && (
          <div className="deliv-view active">
            <Site siteUrl={state.siteUrl} isClient={isClient} onSave={(url) => setState((s) => ({ ...s, siteUrl: url }))} />
          </div>
        )}
        {view === "fotosia" && (
          <div className="deliv-view active">
            <FotosIA
              galleries={state.galleries.fotosIA}
              isClient={isClient}
              onAdd={(cat, urls) => addGalleryPhotos("fotosia", cat, urls)}
              onRemove={(cat, idx) => removeGalleryPhoto("fotosia", cat, idx)}
            />
          </div>
        )}
        {view === "fotospro" && (
          <div className="deliv-view active">
            <FotosPro
              photos={state.galleries.fotosPro}
              isClient={isClient}
              onAdd={(urls) => addGalleryPhotos("fotospro", null, urls)}
              onRemove={(idx) => removeGalleryPhoto("fotospro", null, idx)}
            />
          </div>
        )}
        {view === "videos" && <div className="deliv-view active"><Videos items={state.items} isClient={isClient} onEdit={openModal} /></div>}
      </div>

      <button className="plan-fab" onClick={() => setPlanOpen(true)}>📄 Ver Plano Estratégico / Entregáveis</button>

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
        isClient={isClient}
        currentUser={currentUser}
        onSave={saveItem}
        onDelete={deleteItem}
        onCancel={closeModal}
      />
    </div>
  );
}
