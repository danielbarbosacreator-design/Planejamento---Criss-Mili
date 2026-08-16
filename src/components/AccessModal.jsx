import { useEffect, useState } from "react";

function PasswordField({ value, onChange }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="pw-wrap">
      <input className="field-input" type={visible ? "text" : "password"} value={value} onChange={(e) => onChange(e.target.value)} />
      <button type="button" className="pw-toggle" onClick={() => setVisible((v) => !v)}>👁</button>
    </div>
  );
}

export default function AccessModal({ open, accesses, onSave, onClose }) {
  const [ig, setIg] = useState({ user: "", pass: "" });
  const [fb, setFb] = useState({ user: "", pass: "" });

  useEffect(() => {
    if (!open) return;
    setIg(accesses.ig);
    setFb(accesses.fb);
  }, [open, accesses]);

  if (!open) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={{ width: 480 }}>
        <h3>🔐 Acessos das redes</h3>
        <div className="access-warning">Fica salvo só neste navegador/dispositivo, sem criptografia. Não printe nem envie essa tela por WhatsApp — prefira compartilhar por um gerenciador de senhas.</div>

        <div className="access-block">
          <div className="access-block-title">📷 Instagram — @crismilli_</div>
          <div className="form-row"><label>Usuário / e-mail</label><input className="field-input" type="text" value={ig.user} onChange={(e) => setIg({ ...ig, user: e.target.value })} /></div>
          <div className="form-row">
            <label>Senha</label>
            <PasswordField value={ig.pass} onChange={(v) => setIg({ ...ig, pass: v })} />
          </div>
        </div>

        <div className="access-block">
          <div className="access-block-title">📘 Facebook</div>
          <div className="form-row"><label>Usuário / e-mail</label><input className="field-input" type="text" value={fb.user} onChange={(e) => setFb({ ...fb, user: e.target.value })} /></div>
          <div className="form-row">
            <label>Senha</label>
            <PasswordField value={fb.pass} onChange={(v) => setFb({ ...fb, pass: v })} />
          </div>
        </div>

        <div className="modal-actions">
          <div style={{ flex: 1 }}></div>
          <button className="btn btn-ghost" onClick={onClose}>Fechar</button>
          <button className="btn btn-primary" onClick={() => onSave({ ig, fb })}>Salvar</button>
        </div>
      </div>
    </div>
  );
}
