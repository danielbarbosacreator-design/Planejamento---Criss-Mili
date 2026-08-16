import { useState } from "react";

const BLOCKS = [
  {
    id: "quem-e",
    icon: "👤",
    title: "Quem é Cris Milli",
    teaser: "Trajetória pessoal e biografia real da candidata",
    body: (
      <>
        <p>Cristianne Milli da Silva, 53 anos, natural de Capitão Leônidas Marques (PR). Reside há 9 anos no bairro Praia do Ervino, São Francisco do Sul (SC). Casada com Julio Cesar de Souza Pereira, mãe de Mariáh, Hadassa Ayumi e Kawa. Cabeleireira há mais de 12 anos, fundadora do movimento Encontro das Estrelas (150+ mulheres), criadora da mentoria "Desbloqueando Seu Propósito — Método ESTRELA", apresentadora do Podcast Estrelas em Foco e Presidente das Mulheres pelo Novo em São Francisco do Sul. Pré-candidata a Deputada Estadual pelo Partido Novo — número 30.180.</p>
        <p>História real: enfrentou dislexia e bullying na infância, criou três filhos praticamente sozinha após um divórcio difícil, viveu e trabalhou no Japão (inclusive vendendo pão e coxinha quando precisou), voltou ao Brasil grávida de risco pagando a própria passagem, e perdeu a mãe há poucos meses. Não vem da política — vem do povo, e essa é a base de toda a comunicação da campanha.</p>
      </>
    ),
  },
  {
    id: "slogans",
    icon: "💬",
    title: "Slogan e Frases da Campanha",
    teaser: "Frases oficiais e bordões da comunicação",
    body: (
      <ul>
        <li><b>"Eu não vim buscar a política. A política veio até mim."</b></li>
        <li><b>"A voz feminina que não vai se calar."</b> (bio oficial do Instagram)</li>
        <li>"Quando você reconstrói uma mulher, você reconstrói uma família."</li>
        <li>"Não vim por ambição. Vim por chamado."</li>
        <li>"Meu melhor capítulo começa agora."</li>
      </ul>
    ),
  },
  {
    id: "bandeiras",
    icon: "🚩",
    title: "As 3 Bandeiras",
    teaser: "Mulher e Família · Empreendedorismo e Juventude · Mobilidade e Infraestrutura",
    body: (
      <ul>
        <li><b>Mulher e Família</b> — saúde mental feminina, segurança da mulher, delegacia da mulher eficaz em SFS. "Reconstruir a mulher é reconstruir a família, o bairro e a cidade."</li>
        <li><b>Empreendedorismo e Juventude</b> — oportunidades pra jovens não precisarem sair de SFS pra trabalhar e estudar; diversificar a economia local, hoje concentrada em poucas empresas.</li>
        <li><b>Mobilidade e Infraestrutura</b> — transporte público funcional na Praia do Ervino e em SFS (linhas e horários acessíveis) e escola até o ensino médio nos bairros.</li>
      </ul>
    ),
  },
  {
    id: "diagnostico",
    icon: "📊",
    title: "Diagnóstico Estratégico (SWOT)",
    teaser: "Forças, fraquezas, oportunidades e riscos da candidatura",
    body: (
      <>
        <p><b>Forças</b></p>
        <ul>
          <li>História de vida real e verificável — diferencial forte frente a discursos genéricos de campanha.</li>
          <li>Base de relacionamento consolidada: 9 anos de clientes no salão, 150+ mulheres do Encontro das Estrelas (~45 altamente engajadas), grupos de negócios, ouvintes do podcast, Mulheres pelo Novo SFS e a associação de bairro do Ervino (presidente Conrad).</li>
          <li>Comunicadora natural — confortável com vídeo, oratória e presença de palco.</li>
          <li>Inserção em reduto regional forte do Novo (Joinville/litoral norte), lançada ao lado de lideranças eleitas da região.</li>
        </ul>
        <p><b>Fraquezas</b></p>
        <ul>
          <li>Base de seguidores pequena pra escala de disputa estadual (~3 mil no Instagram).</li>
          <li>Sem site institucional até o momento — resolvido pelo escopo contratado.</li>
          <li>Zero verba de mídia paga contratada — crescimento depende de orgânico e boca a boca.</li>
          <li>Ainda aprendendo os processos técnicos e políticos de campanha (auto-percepção da própria candidata).</li>
        </ul>
        <p><b>Oportunidades</b></p>
        <ul>
          <li>Converter a base já engajada (Encontro das Estrelas, salão, podcast) em rede de mobilização eleitoral desde a semana 1.</li>
          <li>Usar a Associação de Moradores do Ervino e a rede Mulheres pelo Novo como canais de confiança já estabelecidos.</li>
          <li>Horário eleitoral gratuito (28/08–01/10) como caixa de ressonância gratuita pra narrativa já validada nas redes.</li>
        </ul>
        <p><b>Riscos</b></p>
        <ul>
          <li>Janela de 50 dias é curta pra crescer alcance do zero.</li>
          <li>Concorrência interna: 37 pré-candidaturas do próprio Novo disputando o mesmo público simpatizante.</li>
          <li>Fé e religião fazem parte real dos valores da candidata — comunicar com naturalidade, sem soar excludente pra quem não compartilha a mesma fé.</li>
        </ul>
      </>
    ),
  },
  {
    id: "posicionamento",
    icon: "🎯",
    title: "Posicionamento e Narrativa Central",
    teaser: "Como contamos a história da Cris Milli",
    body: (
      <p>Cris Milli não chega à política como estreante de discurso — chega como alguém que já reconstruiu a própria vida mais de uma vez e, há anos, ajuda outras mulheres a fazerem o mesmo através do Encontro das Estrelas. A narrativa central é a ponte entre o "antes" (mulher que se reconstruiu e mentora que transforma outras) e o "depois" (representante que leva essa mesma força pra dentro da Alesc). "Não vim da política. Vim do povo."</p>
    ),
  },
  {
    id: "framework",
    icon: "🧭",
    title: "Framework de Comunicação",
    teaser: "Sensibilizar → Motivar → Mobilizar",
    body: (
      <>
        <p>Sensibilização gera empatia e não pede voto; motivação apresenta as 3 bandeiras e credibilidade; mobilização converte confiança acumulada em ação — compartilhar, indicar, votar (30.180). Pular etapas é o erro mais comum em campanhas de estreantes.</p>
        <div className="plan-badge-row">
          <span className="phase-tag tag-sens">Sensibilizar · 16/08–05/09</span>
          <span className="phase-tag tag-mot">Motivar · 06/09–19/09</span>
          <span className="phase-tag tag-mob">Mobilizar » · 20/09–02/10</span>
        </div>
      </>
    ),
  },
  {
    id: "pilares",
    icon: "🏛️",
    title: "Pilares de Conteúdo",
    teaser: "Os 5 eixos que organizam todo o conteúdo",
    body: (
      <ul>
        <li><b>Trajetória & Propósito</b> — dislexia, criação dos filhos sozinha, Japão, recomeço em SFS, perda da mãe.</li>
        <li><b>Prova Social & Comunidade</b> — depoimentos e cases reais do Encontro das Estrelas (150+ mulheres).</li>
        <li><b>As 3 Bandeiras</b> — Mulher e Família / Empreendedorismo e Juventude / Mobilidade e Infraestrutura.</li>
        <li><b>Bastidores de Campanha</b> — agenda, salão, Mulheres pelo Novo SFS, aliança regional com o Novo em Joinville/litoral norte.</li>
        <li><b>Convocação</b> — presente só nas fases de Motivar e Mobilizar: comunidade de WhatsApp, compartilhamento, voto 30.180.</li>
      </ul>
    ),
  },
  {
    id: "canais",
    icon: "📡",
    title: "Canais e Papel de Cada Um",
    teaser: "Instagram, Facebook, WhatsApp e Site",
    body: (
      <ul>
        <li><b>Instagram</b> — canal principal de Sensibilização e Motivação; já ativo e crescendo.</li>
        <li><b>Facebook</b> — replicação institucional, público de mais idade.</li>
        <li><b>Comunidade de WhatsApp</b> — substitui o funil de tráfego pago; onde a Motivação vira lista qualificada e a Mobilização vira ação coordenada.</li>
        <li><b>Site oficial</b> — hub institucional, destino de todo link em bio.</li>
      </ul>
    ),
  },
];

export default function Planejamento({ onOpenPlanViewer }) {
  const [openId, setOpenId] = useState(null);
  const openBlock = BLOCKS.find((b) => b.id === openId);

  return (
    <>
      <div className="view-intro">Base estratégica da campanha — posicionamento, narrativa, bandeiras e framework de comunicação, construída a partir da Anamnese Política e do Perfil Estratégico fornecidos pela candidata. Clique em cada bloco pra ver o conteúdo completo.</div>

      <div className="plan-block-grid">
        {BLOCKS.map((b) => (
          <div className="plan-block-card" key={b.id} onClick={() => setOpenId(b.id)}>
            <div className="pb-icon">{b.icon}</div>
            <h4>{b.title}</h4>
            <div className="pb-teaser">{b.teaser}</div>
            <div className="open-hint">Clique para abrir →</div>
          </div>
        ))}
        <div className="plan-block-card pb-outline" onClick={onOpenPlanViewer}>
          <div className="pb-icon">📄</div>
          <h4>Documento PDF original</h4>
          <div className="pb-teaser">Versão anterior à validação dos dados reais</div>
          <div className="open-hint">Clique para abrir →</div>
        </div>
      </div>

      {openBlock && (
        <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) setOpenId(null); }}>
          <div className="modal plan-block-modal">
            <div className="pbm-head">
              <span className="pb-icon">{openBlock.icon}</span>
              <h3>{openBlock.title}</h3>
            </div>
            <div className="plan-prose">{openBlock.body}</div>
            <div className="modal-actions">
              <div style={{ flex: 1 }}></div>
              <button className="btn btn-primary" onClick={() => setOpenId(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
