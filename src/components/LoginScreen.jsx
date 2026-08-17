import { useState } from "react";

const FEATURES = [
  ["🗓️", "Acompanhar o calendário de conteúdo de toda a campanha, semana a semana"],
  ["✅", "Aprovar ou reprovar posts e vídeos antes de irem ao ar"],
  ["📄", "Consultar o plano estratégico da campanha"],
  ["📸", "Ver os bancos de fotos (IA e profissional) e o roteiro dos vídeos"],
];

export default function LoginScreen({ onLogin }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("equipe");

  function submit() {
    const trimmed = name.trim();
    if (!trimmed) return;
    onLogin({ name: trimmed, role });
  }

  return (
    <div id="loginScreen">
      <div className="login-card">
        <div className="login-intro">
          <h1>Sistema de Gestão de Campanha</h1>
          <div className="login-lede">Cris Millis — Pré-candidata a Deputada Estadual SC · Partido Novo · São Francisco do Sul. Um só lugar pra equipe e candidata acompanharem tudo o que está acontecendo na campanha.</div>
          <ul className="login-features">
            {FEATURES.map(([icon, text]) => (
              <li key={text}><span className="lf-icon">{icon}</span><span>{text}</span></li>
            ))}
          </ul>
        </div>
        <div className="login-form-col">
          <h2>Entrar</h2>
          <div className="login-sub">Identifique-se pra acessar o painel da campanha.</div>
          <div className="form-row">
            <label>Seu nome</label>
            <input
              className="field-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
              placeholder="Cris Millis"
              autoFocus
            />
          </div>

          <button className="btn btn-primary login-btn" onClick={submit}>Entrar no painel</button>
        </div>
      </div>
    </div>
  );
}
