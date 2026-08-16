import { useEffect, useState } from "react";
import { ELECTION_DATE } from "../data.js";

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

export default function Header({ photo, onPhotoChange, currentUser, onLogout, onOpenPlan, onOpenAccess }) {
  const diff = useCountdown();
  const countdownNum = diff > 0 ? diff : diff === 0 ? "É hoje!" : "Encerrado";
  const countdownLabel = diff > 0 ? "dias para o 1º turno (04/10)" : "";
  const isClient = currentUser && currentUser.role === "cliente";

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onPhotoChange(reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <div className="header">
      <label className="avatar" title="Clique para adicionar foto da candidata" style={photo ? { backgroundImage: `url(${photo})` } : undefined}>
        {!photo && "CM"}
        <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
      </label>
      <div className="header-info">
        <h1 style={{ margin: 0 }}>Gestão de Campanha — Cris Millis</h1>
        <div className="sub">Pré-candidata a Deputada Estadual SC · Partido Novo · São Francisco do Sul</div>
        <div className="sub">Período contratado: 16 ago – 02 out 2026 · 1º turno: 04 out 2026</div>
      </div>
      <div className="header-right">
        <div style={{ marginBottom: 8 }}>
          <span className="user-badge">
            <span className="dot"></span>
            <span>{currentUser ? currentUser.name + (isClient ? " · cliente" : " · equipe") : "—"}</span>
            <button className="logout-link" onClick={onLogout}>trocar</button>
          </span>
        </div>
        <div className="countdown">{countdownNum}</div>
        <div className="countdown-label">{countdownLabel}</div>
        <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <button className="plan-btn" onClick={onOpenPlan}>📄 Plano Estratégico</button>
          <button className="plan-btn" style={{ background: "var(--mob)" }} onClick={onOpenAccess}>🔐 Acessos</button>
        </div>
      </div>
    </div>
  );
}
