import { useState } from "react";

const BLOCKS = [
  {
    id: "ficha",
    icon: "🪪",
    title: "Ficha Oficial de Dados",
    teaser: "Nome, idade, família, formação e números-chave: a fonte única de verdade pra todo material de campanha",
    body: (
      <>
        <div className="callout">Todo material de campanha (site, redes, santinho, release de imprensa, roteiro de vídeo, entrevista) deve usar exclusivamente os dados abaixo. Fonte: Master File Estratégico, consolidado em 29/07/2026.</div>
        <dl className="fact-grid">
          <dt>Nome completo</dt><dd>Cristianne Milli da Silva</dd>
          <dt>Nome público / urna</dt><dd>Cris Milli</dd>
          <dt>Número</dt><dd>30.180</dd>
          <dt>Partido</dt><dd>Novo, Santa Catarina</dd>
          <dt>Cargo pleiteado</dt><dd>Deputada Estadual</dd>
          <dt>Idade</dt><dd>53 anos</dd>
          <dt>Naturalidade</dt><dd>Capitão Leônidas Marques, Paraná</dd>
          <dt>Município-base</dt><dd>São Francisco do Sul, SC (bairro Praia do Ervino)</dd>
          <dt>Tempo de residência em SFS</dt><dd>9 anos</dd>
          <dt>Estado civil</dt><dd>Casada, cônjuge Julio Cesar de Souza Pereira</dd>
          <dt>Filhos</dt><dd>Mariáh Matoso, Hadassa Ayumi e Kawa</dd>
          <dt>Religião</dt><dd>Cristã</dd>
          <dt>Formação acadêmica</dt><dd>Educação Física, Administração Esportiva e Teologia</dd>
          <dt>Profissão principal</dt><dd>Cabeleireira e mentora de mulheres, mais de 12 anos de atuação</dd>
          <dt>Movimento fundado</dt><dd>Encontro das Estrelas (há 2 anos)</dd>
          <dt>Mulheres impactadas</dt><dd>150 mulheres, sendo 45 altamente engajadas e 100+ pessoas de influência direta</dd>
          <dt>Mentoria própria</dt><dd>"Desbloqueando Seu Propósito, Método ESTRELA"</dd>
          <dt>Podcast</dt><dd>Estrelas em Foco</dd>
          <dt>Cargo partidário atual</dt><dd>Presidente das Mulheres pelo Novo, São Francisco do Sul</dd>
          <dt>Disponibilidade semanal</dt><dd>Segunda, terça e quarta: 100% campanha. Demais dias: salão pela manhã, disponível à noite.</dd>
        </dl>
      </>
    ),
  },
  {
    id: "quem-e",
    icon: "👤",
    title: "Quem é Cris Milli",
    teaser: "Trajetória pessoal, linha do tempo e as versões prontas da biografia pra cada canal",
    body: (
      <>
        <p>Cristianne Milli da Silva, 53 anos, natural de Capitão Leônidas Marques (PR). Reside há 9 anos no bairro Praia do Ervino, São Francisco do Sul (SC). Casada com Julio Cesar de Souza Pereira, mãe de Mariáh, Hadassa Ayumi e Kawa. Formada em Educação Física, Administração Esportiva e Teologia. Cabeleireira há mais de 12 anos, fundadora do movimento Encontro das Estrelas (150+ mulheres), criadora da mentoria "Desbloqueando Seu Propósito, Método ESTRELA", apresentadora do Podcast Estrelas em Foco e Presidente das Mulheres pelo Novo em São Francisco do Sul. Pré-candidata a Deputada Estadual pelo Partido Novo, número 30.180.</p>
        <p>História real: enfrentou dislexia e bullying na infância, criou três filhos praticamente sozinha após um divórcio difícil motivado por traição, viveu e trabalhou no Japão (inclusive vendendo pão e coxinha quando precisou), voltou ao Brasil grávida de risco pagando a própria passagem, foi pastora de igreja por anos, e perdeu a mãe há 4 meses, a dor mais recente e mais difícil de sua trajetória. Não vem da política, vem do povo, e essa é a base de toda a comunicação da campanha.</p>

        <h3>Linha do tempo</h3>
        <ul>
          <li>Infância em Capitão Leônidas Marques (PR): primeiras vendas, diagnóstico de dislexia, bullying.</li>
          <li>Juventude: primeiro emprego como cabeleireira; hotelaria, telebanco (HSBC), fábrica.</li>
          <li>Vida adulta: casamento, nascimento dos três filhos, divórcio difícil por traição.</li>
          <li>Período no Japão: trabalho e empreendedorismo (loja de cosméticos), vendas informais pro sustento da família.</li>
          <li>Retorno ao Brasil: gravidez de risco do filho Kawa; decisão de recomeçar perto dos pais.</li>
          <li>Chegada a São Francisco do Sul (há 9 anos): abertura do salão; reconstrução da vida e do negócio do zero.</li>
          <li>Há 2 anos: criação do Encontro das Estrelas.</li>
          <li>Entrada no Partido Novo: presidência das Mulheres pelo Novo em SFS.</li>
          <li>Há 4 meses: perda da mãe.</li>
          <li>Hoje: pré-candidatura a Deputada Estadual por Santa Catarina, número 30.180.</li>
        </ul>

        <h3>Versões prontas da biografia</h3>
        <p><b>Curta (redes sociais / assessoria):</b> "Cris Milli, 53 anos, é cabeleireira, mentora de mulheres e fundadora do movimento Encontro das Estrelas em São Francisco do Sul (SC). Criou três filhos sozinha, superou dislexia e bullying na infância, viveu e trabalhou no Japão e reconstruiu a vida do zero mais de uma vez. Há 9 anos em SFS, já impactou 150 mulheres com mentorias, encontros e o podcast Estrelas em Foco. Hoje é pré-candidata a Deputada Estadual pelo Partido Novo (30.180), não veio da política, veio do povo."</p>
        <p><b>Microbio (Instagram / cartão de visita, até 150 caracteres):</b> "Cabeleireira. Mentora de 150 mulheres. Mãe que criou 3 filhos sozinha. Agora, voz do povo na política. Deputada Estadual 30.180, Partido Novo."</p>
      </>
    ),
  },
  {
    id: "slogans",
    icon: "💬",
    title: "Slogan e Frases da Campanha",
    teaser: "Frases oficiais, bordões da comunicação e o que ela recusa em resposta a ataques",
    body: (
      <>
        <p><b>Slogan principal:</b></p>
        <ul>
          <li><b>"Eu não vim buscar a política. A política veio até mim."</b></li>
        </ul>
        <p><b>Frases de apoio:</b></p>
        <ul>
          <li><b>"A voz feminina que não vai se calar."</b> (bio oficial do Instagram)</li>
          <li>"Quando você reconstrói uma mulher, você reconstrói uma família."</li>
          <li>"Não vim por ambição. Vim por chamado."</li>
          <li>"Meu melhor capítulo começa agora."</li>
        </ul>
        <p><b>O que ela recusa (usar em resposta a ataques):</b></p>
        <ul>
          <li>Não compra voto.</li>
          <li>Não faz promessa que não pode cumprir.</li>
          <li>Não aceita mentira na política.</li>
          <li>Não é candidata de cota, é representação legítima.</li>
          <li>Não é política de carreira, vem do povo.</li>
        </ul>
      </>
    ),
  },
  {
    id: "bandeiras",
    icon: "🚩",
    title: "As 3 Bandeiras",
    teaser: "Mulher e Família · Empreendedorismo e Juventude · Mobilidade e Infraestrutura",
    body: (
      <ul>
        <li><b>Mulher e Família:</b> saúde mental feminina, segurança da mulher, delegacia da mulher eficaz em SFS. "Reconstruir a mulher é reconstruir a família, o bairro e a cidade."</li>
        <li><b>Empreendedorismo e Juventude:</b> crédito justo para mulheres, oportunidades pra jovens não precisarem sair de SFS pra trabalhar e estudar; diversificar a economia local, hoje concentrada em poucas empresas.</li>
        <li><b>Mobilidade e Infraestrutura:</b> transporte público funcional na Praia do Ervino e em SFS (linhas e horários acessíveis) e escola até o ensino médio nos bairros.</li>
      </ul>
    ),
  },
  {
    id: "diagnostico-eleitoral",
    icon: "🗳️",
    title: "Diagnóstico Eleitoral: SC e SFS",
    teaser: "Números oficiais TSE/TRE-SC/IBGE/Alesc: eleitorado, Partido Novo, viabilidade e metas de votos",
    body: (
      <>
        <div className="callout">Base: dados oficiais TSE, TRE-SC, IBGE e Alesc, consolidados em 29/07/2026. Documento de uso estratégico interno, recomenda-se atualização após as convenções partidárias (05/08) e o registro de candidaturas (15/08).</div>

        <p><b>Resumo executivo:</b></p>
        <ul>
          <li>Santa Catarina terá 5.725.753 eleitores aptos em 2026 (+4,3% vs. 2022), puxado pela migração para o litoral.</li>
          <li>A partir de 2026 a Alesc passa de 40 para 44 cadeiras. O quociente eleitoral por vaga tende a cair, cenário mais favorável a partidos menores como o Novo.</li>
          <li>O Novo elegeu apenas 1 deputado estadual em 2022 (Matheus Cadorin, Joinville, 12.390 votos, a menor votação entre os 40 eleitos), mas cresceu forte nas municipais de 2024.</li>
          <li>O Novo já confirmou 37 pré-candidaturas a deputado estadual em SC pra 2026 e aliou-se ao PL de Jorginho Mello pro governo do estado.</li>
          <li>São Francisco do Sul tem ~42-44 mil eleitores e nenhum vereador ou estrutura consolidada do Novo: um vácuo de representação que Cris Milli pode ocupar.</li>
          <li>A candidatura precisa de estratégia de expansão regional (Joinville, Araquari, Garuva, Itapoá, Balneário Barra do Sul) pra alcançar votação competitiva no sistema proporcional.</li>
        </ul>

        <h3>Eleitorado de Santa Catarina (2026)</h3>
        <table className="data-table">
          <tbody>
            <tr><td>Eleitorado total SC</td><td>5.725.753 (+236.095 vs. 2022, +4,3%)</td></tr>
            <tr><td>Eleitoras / eleitores</td><td>52,26% mulheres · 47,74% homens</td></tr>
            <tr><td>Faixa etária de maior concentração</td><td>40 a 44 anos: 593.960 pessoas (10,37%)</td></tr>
            <tr><td>Migração pra SC (nov/25–mai/26)</td><td>260.546 transferências, 60,5% de fora do estado</td></tr>
            <tr><td>Vagas na Alesc</td><td>40 (2022) → 44 (a partir de 2026)</td></tr>
            <tr><td>Votos pra eleger em 2022</td><td>~90-105 mil (quociente cheio); menos votado dos 40 entrou com 12.390</td></tr>
            <tr><td>Cláusula de barreira individual</td><td>Cada candidato precisa de ao menos 10% do quociente eleitoral em votos próprios</td></tr>
          </tbody>
        </table>

        <h3>Calendário eleitoral 2026</h3>
        <ul>
          <li>Convenções partidárias: 20 de julho a 5 de agosto.</li>
          <li>Registro oficial de candidaturas: até 15 de agosto.</li>
          <li>Início oficial da campanha (rua e internet): 16 de agosto.</li>
          <li>1º turno: domingo, 4 de outubro, das 8h às 17h.</li>
          <li>2º turno (cargos majoritários, se necessário): 25 de outubro.</li>
        </ul>

        <h3>O Partido Novo em Santa Catarina</h3>
        <ul>
          <li>Saltou de 6 municípios com candidatos (2020) pra 38 (2024); de 1 pra 3 prefeitos eleitos; de 10 pra 35 vereadores eleitos.</li>
          <li>Único deputado estadual eleito em 2022: Matheus Cadorin (Joinville), 12.390 votos, menor votação individual entre os 40 eleitos, e apenas 81 votos em Araquari, vizinha de SFS.</li>
          <li>37 pré-candidaturas a deputado estadual confirmadas pra 2026 (mais 17 a deputado federal): risco real de pulverização de votos dentro do próprio partido.</li>
          <li>Aliança formalizada com o PL de Jorginho Mello pro governo do estado: Adriano Silva (Novo, ex-prefeito de Joinville) é pré-candidato a vice-governador.</li>
          <li>São Francisco do Sul não elegeu nenhum vereador do Novo em 2024: Cris Milli não herda estrutura partidária local, mas também não disputa capital político interno, podendo se posicionar como a primeira liderança relevante da legenda na cidade.</li>
        </ul>

        <h3>São Francisco do Sul: diagnóstico local</h3>
        <table className="data-table">
          <tbody>
            <tr><td>População (Censo 2022)</td><td>~52 mil habitantes, 3º município mais populoso da região de Joinville</td></tr>
            <tr><td>Eleitorado (2024)</td><td>42.083 eleitores aptos (+8,35% vs. 2020)</td></tr>
            <tr><td>Biometria coletada</td><td>70,94% do eleitorado</td></tr>
            <tr><td>Perfil econômico</td><td>3º maior porto do estado; comércio, turismo e serviços de alojamento/alimentação</td></tr>
            <tr><td>Prefeito eleito (2024)</td><td>Godofredo (MDB), 52,85% dos votos válidos, 1º turno</td></tr>
          </tbody>
        </table>

        <h3>Viabilidade e metas de votos</h3>
        <table className="data-table">
          <tbody>
            <tr><td>Piso mínimo (cláusula de barreira)</td><td>~9 mil a 10,5 mil votos</td></tr>
            <tr><td>Candidatura competitiva dentro do Novo</td><td>12 mil a 20 mil votos</td></tr>
            <tr><td>Candidatura "puxadora" dentro do Novo</td><td>25 mil votos ou mais, exige forte presença fora de SFS</td></tr>
          </tbody>
        </table>
        <p>São Francisco do Sul sozinha não é suficiente pra eleger uma deputada estadual. Nenhum município da região elegeu alguém baseado só no eleitorado local em 2022. O caminho realista combina votação forte em SFS como base segura, expansão pra Joinville/Araquari/Garuva/Itapoá/Balneário Barra do Sul, e o desempenho agregado do Novo em todo o estado.</p>

        <h3>Recomendações imediatas</h3>
        <ul>
          <li>Encomendar pesquisa eleitoral (mesmo que regional/reduzida) pra calibrar rejeição, conhecimento de marca e potencial de voto.</li>
          <li>Mapear e articular com lideranças do Novo em Joinville, Araquari, Garuva e Itapoá antes das convenções.</li>
          <li>Construir agenda de presença física recorrente fora de SFS (pelo menos Joinville) a partir de agosto.</li>
          <li>Formalizar o Requerimento de Declaração de Elegibilidade e toda documentação de registro até 15/08.</li>
          <li>Negociar por escrito com a direção estadual do Novo a distribuição da cota de 30% do fundo eleitoral e tempo de propaganda pra candidatas mulheres.</li>
        </ul>
      </>
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
          <li>História de vida real e verificável, diferencial forte frente a discursos genéricos de campanha.</li>
          <li>Base de relacionamento consolidada: 9 anos de clientes no salão, 150+ mulheres do Encontro das Estrelas (~45 altamente engajadas), grupos de negócios, ouvintes do podcast, Mulheres pelo Novo SFS e a associação de bairro do Ervino (presidente Conrad).</li>
          <li>Comunicadora natural, confortável com vídeo, oratória e presença de palco.</li>
          <li>Inserção em reduto regional forte do Novo (Joinville/litoral norte), lançada ao lado de lideranças eleitas da região.</li>
        </ul>
        <p><b>Fraquezas</b></p>
        <ul>
          <li>Base de seguidores pequena pra escala de disputa estadual (~3 mil no Instagram).</li>
          <li>Sem site institucional até o momento, resolvido pelo escopo contratado.</li>
          <li>Zero verba de mídia paga contratada, crescimento depende de orgânico e boca a boca.</li>
          <li>Ainda aprendendo os processos técnicos e políticos de campanha (auto-percepção da própria candidata).</li>
        </ul>
        <p><b>Oportunidades</b></p>
        <ul>
          <li>Converter a base já engajada (Encontro das Estrelas, salão, podcast) em rede de mobilização eleitoral desde a semana 1.</li>
          <li>Usar a Associação de Moradores do Ervino e a rede Mulheres pelo Novo como canais de confiança já estabelecidos.</li>
          <li>Horário eleitoral gratuito (28/08–01/10) como caixa de ressonância gratuita pra narrativa já validada nas redes.</li>
          <li>Vácuo de representação do Novo no Litoral Norte fora de Joinville, espaço real pra virar referência regional da legenda.</li>
        </ul>
        <p><b>Riscos</b></p>
        <ul>
          <li>Janela de 50 dias é curta pra crescer alcance do zero.</li>
          <li>Concorrência interna: 37 pré-candidaturas do próprio Novo disputando o mesmo público simpatizante.</li>
          <li>Base geográfica concentrada em SFS, exige estratégia real de expansão regional pra viabilidade em eleição proporcional estadual.</li>
          <li>Fé e religião fazem parte real dos valores da candidata, comunicar com naturalidade, sem soar excludente pra quem não compartilha a mesma fé.</li>
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
      <p>Cris Milli não chega à política como estreante de discurso: chega como alguém que já reconstruiu a própria vida mais de uma vez e, há anos, ajuda outras mulheres a fazerem o mesmo através do Encontro das Estrelas. A narrativa central é a ponte entre o "antes" (mulher que se reconstruiu e mentora que transforma outras) e o "depois" (representante que leva essa mesma força pra dentro da Alesc). "Não vim da política. Vim do povo."</p>
    ),
  },
  {
    id: "framework",
    icon: "🧭",
    title: "Framework de Comunicação",
    teaser: "Sensibilizar → Motivar → Mobilizar",
    body: (
      <>
        <p>Sensibilização gera empatia e não pede voto; motivação apresenta as 3 bandeiras e credibilidade; mobilização converte confiança acumulada em ação: compartilhar, indicar, votar (30.180). Pular etapas é o erro mais comum em campanhas de estreantes.</p>
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
        <li><b>Trajetória & Propósito:</b> dislexia, criação dos filhos sozinha, Japão, recomeço em SFS, perda da mãe.</li>
        <li><b>Prova Social & Comunidade:</b> depoimentos e cases reais do Encontro das Estrelas (150+ mulheres).</li>
        <li><b>As 3 Bandeiras:</b> Mulher e Família / Empreendedorismo e Juventude / Mobilidade e Infraestrutura.</li>
        <li><b>Bastidores de Campanha:</b> agenda, salão, Mulheres pelo Novo SFS, aliança regional com o Novo em Joinville/litoral norte.</li>
        <li><b>Convocação:</b> presente só nas fases de Motivar e Mobilizar: comunidade de WhatsApp, compartilhamento, voto 30.180.</li>
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
        <li><b>Instagram:</b> canal principal de Sensibilização e Motivação; já ativo e crescendo.</li>
        <li><b>Facebook:</b> replicação institucional, público de mais idade.</li>
        <li><b>Comunidade de WhatsApp:</b> substitui o funil de tráfego pago; onde a Motivação vira lista qualificada e a Mobilização vira ação coordenada.</li>
        <li><b>Site oficial:</b> hub institucional, destino de todo link em bio.</li>
      </ul>
    ),
  },
  {
    id: "qa",
    icon: "📝",
    title: "Perguntas e Respostas Oficiais",
    teaser: "Q&A pronto pra entrevistas, e as histórias reais mais fortes da candidata",
    body: (
      <>
        <p><b>Quem é a Cris Milli?</b></p>
        <p>"Sou uma mulher que aprendeu a se levantar. Nasci no interior do Paraná, enfrentei dislexia, bullying, criei filhos sozinha, trabalhei no Japão, recomecei do zero mais de uma vez e cheguei em São Francisco do Sul há 9 anos para construir uma nova história. Sou cabeleireira, mentora, palestrante, fundadora do Encontro das Estrelas e agora pré-candidata a Deputada Estadual. Não vim da política, vim do povo."</p>
        <p><b>Por que as pessoas deveriam confiar em você?</b></p>
        <p>"Porque minha história fala antes de mim. Não prometo o que não posso cumprir. Não compro voto. Não sou cota de ninguém. Sou uma mulher real, com dores reais, que conhece de perto as necessidades de São Francisco do Sul. Minha trajetória é prova de que quando se tem fé, propósito e coragem, a mudança acontece."</p>
        <p><b>Histórias reais pra roteiros e discursos:</b></p>
        <ul>
          <li>Criou três filhos sozinha após divórcio difícil, mudou de estado e reconstruiu vida e negócio do zero em São Francisco do Sul.</li>
          <li>Trabalhou de tudo no Japão, inclusive vendendo pão e coxinha, pra sustentar a família, e voltou ao Brasil grávida de risco, pagando a própria passagem.</li>
          <li>Pelo Encontro das Estrelas, mulheres que chegaram destruídas emocionalmente reconstruíram relacionamentos, negócios e propósito de vida.</li>
        </ul>
      </>
    ),
  },
];

export default function Planejamento({ onOpenPlanViewer }) {
  const [openId, setOpenId] = useState(null);
  const openBlock = BLOCKS.find((b) => b.id === openId);

  return (
    <>
      <div className="view-intro">Base estratégica da campanha: dados oficiais, posicionamento, narrativa, bandeiras, diagnóstico eleitoral e framework de comunicação, construída a partir da Anamnese Política, do Perfil Estratégico, do Master File e do Diagnóstico Eleitoral. Clique em cada bloco pra ver o conteúdo completo.</div>

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
