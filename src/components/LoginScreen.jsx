import { useState } from "react";

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
        <div className="login-avatar">CM</div>
        <h2>Gestão de Campanha — Cris Millis</h2>
        <div className="login-sub">Acesso da equipe ou da candidata para acompanhar o calendário, revisar conteúdos e aprovar posts.</div>
        <div className="form-row">
          <label>Seu nome</label>
          <input
            className="field-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
            placeholder="Ex: Cris Millis"
          />
        </div>
        <div className="form-row">
          <label>Você é</label>
          <div className="role-options">
            <div
              className={"role-opt" + (role === "equipe" ? " selected" : "")}
              onClick={() => setRole("equipe")}
            >
              Equipe (edita tudo)
            </div>
            <div
              className={"role-opt" + (role === "cliente" ? " selected" : "")}
              onClick={() => setRole("cliente")}
            >
              Cliente (aprova/reprova)
            </div>
          </div>
        </div>
        <button className="btn btn-primary login-btn" onClick={submit}>Entrar</button>
      </div>
    </div>
  );
}
