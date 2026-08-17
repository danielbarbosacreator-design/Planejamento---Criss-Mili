import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient.js";
import {
  loadMyContext, loadCampaignBundle, logActivity,
  createContentItem, updateContentItem, deleteContentItem, recordApproval,
  saveSiteUrl, saveCandidatePhoto, saveSocialAccounts,
} from "./lib/campaignData.js";
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
import Videos from "./components/views/Videos.jsx";

function FullScreenMessage({ title, children }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8, padding: 24, textAlign: "center" }}>
      <h1 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>{title}</h1>
      {children}
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(undefined); // undefined = ainda checando, null = deslogado
  const [profileName, setProfileName] = useState("");
  const [ctx, setCtx] = useState(null); // { campaign, isClient, orgRole, campaignRole }
  const [bundle, setBundle] = useState(null); // { phases, deliverables, items, galleries, accesses }
  const [loadError, setLoadError] = useState("");

  const [activeFilter, setActiveFilter] = useState("all");
  const [view, setView] = useState("dashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newItemDate, setNewItemDate] = useState(null);
  const [accessOpen, setAccessOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setCtx(null); setBundle(null); return; }
    let cancelled = false;
    (async () => {
      try {
        const [{ data: profile }, myCtx] = await Promise.all([
          supabase.from("profiles").select("full_name").eq("id", session.user.id).maybeSingle(),
          loadMyContext(),
        ]);
        if (cancelled) return;
        setProfileName(profile?.full_name || session.user.email);
        setCtx(myCtx);
        if (myCtx?.campaign) {
          const b = await loadCampaignBundle(myCtx.campaign.id);
          if (!cancelled) setBundle(b);
        }
      } catch (e) {
        if (!cancelled) setLoadError("Não conseguimos carregar seus dados agora.");
      }
    })();
    return () => { cancelled = true; };
  }, [session]);

  if (session === undefined) return null;
  if (!session) return <LoginScreen />;

  if (loadError) {
    return (
      <FullScreenMessage title="Não conseguimos carregar isso agora">
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Tentar novamente</button>
      </FullScreenMessage>
    );
  }
  if (!ctx) return null;
  if (!ctx.campaign) {
    return (
      <FullScreenMessage title="Sua conta ainda não tem acesso a nenhuma campanha">
        <p style={{ color: "#6B7280", maxWidth: 360 }}>Peça pra um administrador da organização te convidar com seu e-mail ({session.user.email}).</p>
        <button className="btn btn-ghost" onClick={() => supabase.auth.signOut()}>Sair</button>
      </FullScreenMessage>
    );
  }
  if (!bundle) return null;

  const { campaign, isClient } = ctx;
  const currentUser = { name: profileName };
  const phasesForBar = bundle.phases.map((p) => ({ id: p.key, label: p.name, range: [p.start_date, p.end_date] }));

  function updateLocalItem(id, patch) {
    setBundle((b) => ({ ...b, items: b.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) }));
  }

  async function cycleStatus(id) {
    const order = ["planejado", "producao", "publicado"];
    const item = bundle.items.find((i) => i.id === id);
    const next = order[(order.indexOf(item.status) + 1) % order.length];
    updateLocalItem(id, { status: next });
    try {
      await updateContentItem(campaign.id, bundle.phases, id, { ...item, status: next });
      logActivity(campaign.id, campaign.organization_id, "updated", "content_item", id, { status: next });
    } catch (e) {
      updateLocalItem(id, { status: item.status });
      alert("Não conseguimos salvar essa mudança.");
    }
  }

  async function cycleApproval(id) {
    const order = ["pendente", "aprovado", "reprovado"];
    const item = bundle.items.find((i) => i.id === id);
    const next = order[(order.indexOf(item.approval) + 1) % order.length];
    updateLocalItem(id, { approval: next });
    try {
      await recordApproval(campaign.id, id, next, item.approvalNote);
      logActivity(campaign.id, campaign.organization_id, next === "pendente" ? "reset_approval" : next, "content_item", id, {});
    } catch (e) {
      updateLocalItem(id, { approval: item.approval });
      alert("Não conseguimos salvar a aprovação.");
    }
  }

  function handleLogout() {
    supabase.auth.signOut();
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

  async function saveItem(data, isNew) {
    try {
      if (isNew) {
        const newItem = await createContentItem(campaign.id, bundle.phases, data);
        setBundle((b) => ({ ...b, items: [...b.items, newItem] }));
        logActivity(campaign.id, campaign.organization_id, "created", "content_item", newItem.id, { title: newItem.title });
      } else {
        const original = bundle.items.find((i) => i.id === editingId);
        const approvalChanged = original.approval !== data.approval;
        if (!isClient) {
          await updateContentItem(campaign.id, bundle.phases, editingId, data);
        }
        if (approvalChanged) {
          await recordApproval(campaign.id, editingId, data.approval, data.approvalNote);
        }
        updateLocalItem(editingId, { ...data });
        logActivity(campaign.id, campaign.organization_id, "updated", "content_item", editingId, {});
      }
    } catch (e) {
      alert("Não conseguimos salvar. Tente de novo.");
      return;
    }
    closeModal();
  }

  async function deleteItem() {
    if (!editingId) return;
    try {
      await deleteContentItem(editingId);
      setBundle((b) => ({ ...b, items: b.items.filter((i) => i.id !== editingId) }));
      logActivity(campaign.id, campaign.organization_id, "deleted", "content_item", editingId, {});
    } catch (e) {
      alert("Não conseguimos excluir esse conteúdo.");
      return;
    }
    closeModal();
  }

  function goToView(v) {
    setView(v);
    window.scrollTo(0, 0);
  }
  function goToDashboard() {
    setView("dashboard");
    window.scrollTo(0, 0);
  }

  async function handleSaveSiteUrl(url) {
    try {
      await saveSiteUrl(campaign.id, url);
      setCtx((c) => ({ ...c, campaign: { ...c.campaign, site_url: url } }));
    } catch (e) {
      alert("Não conseguimos salvar o link do site.");
    }
  }

  async function handlePhotoChange(dataUrl) {
    try {
      await saveCandidatePhoto(campaign.id, dataUrl);
      setCtx((c) => ({ ...c, campaign: { ...c.campaign, candidate_photo_url: dataUrl } }));
    } catch (e) {
      alert("Não conseguimos salvar a foto.");
    }
  }

  async function handleSaveAccesses(accesses) {
    try {
      await saveSocialAccounts(campaign.id, accesses);
      setBundle((b) => ({ ...b, accesses }));
      setAccessOpen(false);
    } catch (e) {
      alert("Não conseguimos salvar os acessos.");
    }
  }

  const editingItem = editingId ? bundle.items.find((i) => i.id === editingId) : null;

  return (
    <div id="appScreen" style={{ display: "block" }}>
      <div className="app-shell">
        <Sidebar
          campaign={campaign}
          photo={campaign.candidate_photo_url}
          onPhotoChange={handlePhotoChange}
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
            items={bundle.items}
            onMobileMenu={() => setMobileNavOpen(true)}
            onOpenItem={openModal}
            onLogout={handleLogout}
          />

          <div className="app-main-inner">
            {view === "dashboard" && (
              <div id="view-dashboard" className="active">
                <div className="dashboard-hero">
                  <img src="/hero-banner.png" alt="" />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                  <div className="dashboard-greeting">
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111827", margin: "0 0 6px" }}>Overview</h1>
                    <p style={{ color: "#6B7280", margin: 0, fontSize: 13 }}>Painel de acompanhamento e planejamento da campanha.</p>
                  </div>
                </div>

                <div className="section-card" style={{ padding: "24px", marginBottom: "20px" }}>
                  <div className="clean-title" style={{ fontSize: 10, color: "#9CA3AF", letterSpacing: "1px", marginBottom: 20 }}>PROGRESSO DA CAMPANHA</div>
                  <PhaseBar phases={phasesForBar} />
                </div>

                <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "20px" }}>
                  <Stats items={bundle.items} />
                </div>

                <div className="section-card" style={{ padding: "24px", marginTop: "20px" }}>
                  <div className="clean-title" style={{ fontSize: 10, color: "#9CA3AF", letterSpacing: "1px", marginBottom: 20 }}>CALENDÁRIO DE CONTEÚDO</div>
                  <Toolbar
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    onAdd={() => openModal(null)}
                    isClient={isClient}
                  />
                  <Calendar
                    items={bundle.items}
                    activeFilter={activeFilter}
                    isClient={isClient}
                    onEdit={openModal}
                    onAddOnDate={openModalForDate}
                    onCycleStatus={cycleStatus}
                    onCycleApproval={cycleApproval}
                  />
                </div>
              </div>
            )}

            {view === "planejamento" && <div className="deliv-view active section-card"><Planejamento onOpenPlanViewer={() => setPlanOpen(true)} /></div>}
            {view === "redes" && <div className="deliv-view active section-card"><Redes items={bundle.items} isClient={isClient} onEdit={openModal} /></div>}
            {view === "site" && (
              <div className="deliv-view active section-card">
                <Site siteUrl={campaign.site_url} isClient={isClient} onSave={handleSaveSiteUrl} />
              </div>
            )}
            {view === "videos" && <div className="deliv-view active section-card"><Videos items={bundle.items} isClient={isClient} onEdit={openModal} /></div>}
          </div>
        </div>
      </div>

      <PlanViewer open={planOpen} onClose={() => setPlanOpen(false)} />
      <AccessModal
        open={accessOpen}
        accesses={bundle.accesses}
        onClose={() => setAccessOpen(false)}
        onSave={handleSaveAccesses}
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
