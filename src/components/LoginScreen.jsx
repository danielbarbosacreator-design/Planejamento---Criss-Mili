import { useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

const FEATURES = [
  ["🗓️", "Acompanhar o calendário de conteúdo de toda a campanha, semana a semana"],
  ["✅", "Aprovar ou reprovar posts e vídeos antes de irem ao ar"],
  ["📄", "Consultar o plano estratégico da campanha"],
  ["📸", "Ver os bancos de fotos (IA e profissional) e o roteiro dos vídeos"],
];

function authErrorMessage(error) {
  if (!error) return "";
  if (error.message?.includes("Invalid login credentials")) return "E-mail ou senha incorretos.";
  if (error.message?.includes("User already registered")) return "Já existe uma conta com esse e-mail. Tente entrar.";
  if (error.message?.includes("Password should be")) return "A senha precisa ter pelo menos 6 caracteres.";
  return "Não conseguimos concluir isso agora. Tente de novo em instantes.";
}

export default function LoginScreen() {
  const [mode, setMode] = useState("entrar");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function submit() {
    setError("");
    setInfo("");
    if (!email.trim() || !password) return;
    setLoading(true);
    if (mode === "entrar") {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) setError(authErrorMessage(error));
    } else {
      if (!name.trim()) {
        setError("Preenche seu nome também.");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { full_name: name.trim() } },
      });
      if (error) {
        setError(authErrorMessage(error));
      } else if (!data.session) {
        setInfo("Conta criada! Confirme seu e-mail para poder entrar.");
      }
    }
    setLoading(false);
  }

  return (
    <div id="loginScreen">
      <div className="login-card">
        <div className="login-intro">
          <h1>Sistema de Gestão de Campanha</h1>
          <div className="login-lede">Cris Millis, pré-candidata a Deputada Estadual SC · Partido Novo · São Francisco do Sul. Um só lugar pra equipe e candidata acompanharem tudo o que está acontecendo na campanha.</div>
          <ul className="login-features">
            {FEATURES.map(([icon, text]) => (
              <li key={text}><span className="lf-icon">{icon}</span><span>{text}</span></li>
            ))}
          </ul>
        </div>
        <div className="login-form-col">
          <h2>{mode === "entrar" ? "Entrar" : "Criar conta"}</h2>
          <div className="login-sub">
            {mode === "entrar" ? "Entre com seu e-mail e senha pra acessar o painel." : "Primeiro acesso? Crie sua conta pra acessar o painel."}
          </div>

          {mode === "criar" && (
            <div className="form-row">
              <label>Seu nome</label>
              <input className="field-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Cris Millis" />
            </div>
          )}
          <div className="form-row">
            <label>E-mail</label>
            <input
              className="field-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
              placeholder="voce@exemplo.com"
              autoFocus
            />
          </div>
          <div className="form-row">
            <label>Senha</label>
            <div className="login-password-wrap">
              <input
                className="field-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2" fill="none"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
            </div>
          </div>

          {error && <div className="access-warning" style={{ marginBottom: 12 }}>{error}</div>}
          {info && <div className="access-warning" style={{ marginBottom: 12 }}>{info}</div>}

          <button className="btn btn-primary login-btn" onClick={submit} disabled={loading}>
            {loading ? "Só um instante…" : mode === "entrar" ? "Entrar no painel" : "Criar minha conta"}
          </button>

          <button
            type="button"
            className="btn-ghost"
            style={{ marginTop: 12, background: "none", border: "none", fontSize: 13, cursor: "pointer", color: "#6B7280" }}
            onClick={() => { setMode(mode === "entrar" ? "criar" : "entrar"); setError(""); setInfo(""); }}
          >
            {mode === "entrar" ? "Primeiro acesso? Criar conta" : "Já tenho conta, entrar"}
          </button>
        </div>
      </div>
    </div>
  );
}
