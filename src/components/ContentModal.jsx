import { useEffect, useState } from "react";
import { readFileAsDataURL } from "../utils.js";

const CHANNEL_OPTS = [["instagram", "Instagram"], ["facebook", "Facebook"], ["whatsapp", "Comunidade WhatsApp"], ["site", "Site"]];
const APPROVAL_OPTS = [["pendente", "Pendente"], ["aprovado", "✓ Aprovar"], ["reprovado", "✕ Reprovar"]];

const EMPTY_ITEM = {
  date: "2026-08-16", type: "Post", channels: [], title: "", desc: "", status: "planejado",
  caption: "", imageText: "", feedImage: null, storyImage: null, approval: "pendente", approvalNote: "",
};

function UploadBox({ kind, label, dims, image, isClient, onChange, onRemove }) {
  return (
    <div className="upload-col">
      <div className="upload-label">{label} · {dims}</div>
      <label className={"upload-box " + kind + (image ? " has-img" : "")} style={{ pointerEvents: isClient ? "none" : "auto" }}>
        {!image && <span>clique para subir a arte {kind === "feed" ? "do feed" : "do stories"}</span>}
        {image && <img src={image} style={{ display: "block" }} />}
        <button
          type="button"
          className="upload-remove"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove(); }}
        >✕</button>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            onChange(await readFileAsDataURL(file));
            e.target.value = "";
          }}
        />
      </label>
    </div>
  );
}

export default function ContentModal({ open, editingItem, newItemDate, isClient, currentUser, onSave, onDelete, onCancel }) {
  const [form, setForm] = useState(EMPTY_ITEM);

  useEffect(() => {
    if (!open) return;
    setForm(editingItem ? { ...editingItem } : { ...EMPTY_ITEM, date: newItemDate || EMPTY_ITEM.date });
  }, [open, editingItem, newItemDate]);

  if (!open) return null;
  const isNew = !editingItem;

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }
  function toggleChannel(c) {
    setForm((f) => ({
      ...f,
      channels: f.channels.includes(c) ? f.channels.filter((x) => x !== c) : [...f.channels, c],
    }));
  }

  function handleSave() {
    const approvalChanged = editingItem && editingItem.approval !== form.approval;
    const data = { ...form, title: form.title || "(sem título)" };
    if (approvalChanged && isClient) data.approvedBy = currentUser.name;
    onSave(data, isNew);
  }

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="modal">
        <h3>{isNew ? "Novo conteúdo" : isClient ? "Revisar conteúdo" : "Editar conteúdo"}</h3>

        <div className="form-row">
          <label>Data</label>
          <input className="field-date" type="date" value={form.date} disabled={isClient} onChange={(e) => set("date", e.target.value)} />
        </div>
        <div className="form-row">
          <label>Tipo</label>
          <select className="field-select" value={form.type} disabled={isClient} onChange={(e) => set("type", e.target.value)}>
            <option>Post</option>
            <option>Reels</option>
            <option>Vídeo</option>
            <option>Stories</option>
            <option>Mensagem WhatsApp</option>
            <option>Marco</option>
          </select>
        </div>
        <div className="form-row">
          <label>Canais</label>
          <div className="checks">
            {CHANNEL_OPTS.map(([val, label]) => (
              <label key={val}>
                <input type="checkbox" disabled={isClient} checked={form.channels.includes(val)} onChange={() => toggleChannel(val)} /> {label}
              </label>
            ))}
          </div>
        </div>
        <div className="form-row">
          <label>Título</label>
          <input className="field-input" type="text" value={form.title} disabled={isClient} onChange={(e) => set("title", e.target.value)} placeholder="Ex: Vídeo — proposta 1 explicada" />
        </div>
        <div className="form-row">
          <label>Roteiro / descrição</label>
          <textarea className="field-textarea" rows={3} value={form.desc} disabled={isClient} onChange={(e) => set("desc", e.target.value)} placeholder="Roteiro, briefing ou observações" />
        </div>
        <div className="form-row">
          <label>Legenda (caption)</label>
          <textarea className="field-textarea" rows={4} value={form.caption} disabled={isClient} onChange={(e) => set("caption", e.target.value)} placeholder="Texto que vai na legenda do post..." />
        </div>
        <div className="form-row">
          <label>Texto que vai na imagem</label>
          <input className="field-input" type="text" value={form.imageText} disabled={isClient} onChange={(e) => set("imageText", e.target.value)} placeholder="Ex: VOTO 30 — CRIS MILLIS" />
        </div>
        <div className="form-row">
          <label>Artes</label>
          <div className="upload-row">
            <UploadBox kind="feed" label="Feed" dims="1080×1350" image={form.feedImage} isClient={isClient}
              onChange={(url) => set("feedImage", url)} onRemove={() => set("feedImage", null)} />
            <UploadBox kind="story" label="Stories" dims="1080×1920" image={form.storyImage} isClient={isClient}
              onChange={(url) => set("storyImage", url)} onRemove={() => set("storyImage", null)} />
          </div>
        </div>
        <div className="form-row">
          <label>Aprovação do cliente</label>
          <div className="approval-row">
            {APPROVAL_OPTS.map(([val, label]) => (
              <button
                key={val}
                type="button"
                className={"approval-btn" + (form.approval === val ? " on-" + val : "")}
                onClick={() => set("approval", val)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="form-row">
          <label>Observação do cliente (opcional)</label>
          <textarea className="field-textarea" rows={2} value={form.approvalNote} onChange={(e) => set("approvalNote", e.target.value)} placeholder="Ex: trocar a foto, ajustar o texto..." />
        </div>
        {!isClient && (
          <div className="form-row">
            <label>Status</label>
            <select className="field-select" value={form.status} onChange={(e) => set("status", e.target.value)}>
              <option value="planejado">Planejado</option>
              <option value="producao">Em produção</option>
              <option value="publicado">Publicado</option>
            </select>
          </div>
        )}
        <div className="modal-actions">
          {!isNew && !isClient && (
            <button className="btn btn-ghost" style={{ color: "#DC2626" }} onClick={onDelete}>Excluir</button>
          )}
          <div style={{ flex: 1 }}></div>
          <button className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleSave}>Salvar</button>
        </div>
      </div>
    </div>
  );
}
