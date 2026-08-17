import { useState } from "react";

export default function Site({ siteUrl, isClient, onSave }) {
  const [value, setValue] = useState(siteUrl || "");

  return (
    <>
      <div className="view-intro">Assim que o site oficial estiver no ar, cole o link aqui. Ele fica salvo e disponível pra toda a equipe.</div>
      <div className="site-box">
        <div className="form-row">
          <label>Link do site oficial</label>
          <input className="field-input" type="text" placeholder="https://crismillis.com.br" value={value} disabled={isClient} onChange={(e) => setValue(e.target.value)} />
        </div>
        {!isClient && (
          <button className="btn btn-primary" onClick={() => onSave(value.trim())}>Salvar link</button>
        )}
        <div>
          {siteUrl
            ? <a className="site-link" href={siteUrl} target="_blank" rel="noreferrer">🔗 Abrir site oficial</a>
            : <div className="meta" style={{ marginTop: 10 }}>Nenhum link cadastrado ainda.</div>}
        </div>
      </div>
    </>
  );
}
