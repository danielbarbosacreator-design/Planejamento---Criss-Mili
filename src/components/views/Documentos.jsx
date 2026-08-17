import { useState } from "react";

const DOCS = [
  {
    id: "anamnese",
    icon: "🪪",
    title: "Anamnese Política",
    teaser: "Perfil pessoal, desafios, trajetória, motivação, bandeiras e valores da pré-candidata",
    body: (
      <>
        <div className="callout">Anamnese Política, Cris Milli. Pré-candidata a Deputada Estadual, Partido Novo SC, número 30.180.</div>

        <h3>1. Perfil pessoal</h3>
        <p>Natural de Capitão Leônidas Marques, Paraná. Reside em São Francisco do Sul há 9 anos, tem 52 anos. Três filhos criados praticamente sozinha. Casada com Julio Cesar. Pais residem em SFS há 16 anos.</p>

        <h3>2. Desafios que formaram sua identidade</h3>
        <p>Dislexia diagnosticada, com dificuldade no aprendizado e bullying na infância. Criou três filhos sozinha. Perdeu negócios e reconstruiu do zero mais de uma vez. Divórcio difícil por traição. Mudou de cidade e estado para recomeçar. Perda da mãe há 4 meses, a maior dor recente.</p>

        <h3>3. Trajetória profissional</h3>
        <p>Cabeleireira desde jovem. Vendas desde a infância: catálogos, roupas, produtos importados do Paraguai. Recepcionista e coordenadora de eventos em hotéis. Atendente no HSBC, telebanco e vendas. Trabalhou no Japão, onde abriu loja de cosméticos. Retornou ao Brasil por gravidez de risco. Pastora de igreja por anos. Abriu salão em SFS há 9 anos. Mentora de mulheres. Fundadora do Encontro das Estrelas. Apresentadora do Podcast Estrelas em Foco.</p>

        <h3>4. Motivação para a política</h3>
        <p>Não buscou a política, foi convocada pelo propósito. Trabalha com mulheres há anos e conhece suas dores de perto. Voz ativa no movimento feminino de SFS. Acredita que mulher na política não é cota, é representação legítima.</p>

        <h3>5. Slogan e posicionamento</h3>
        <ul>
          <li>"Eu não vim buscar a política. A política veio até mim."</li>
          <li>"A voz feminina que veio para ficar."</li>
        </ul>

        <h3>6. Três bandeiras principais</h3>
        <ul>
          <li><b>Mulher e Família:</b> saúde mental feminina, segurança da mulher, delegacia da mulher eficaz em SFS. Reconstruir a mulher é reconstruir a família, o bairro e a cidade.</li>
          <li><b>Empreendedorismo e Juventude:</b> trazer oportunidades para que jovens não precisem sair de SFS para trabalhar e estudar. Diversificar a economia local além das poucas empresas existentes hoje.</li>
          <li><b>Mobilidade e Infraestrutura:</b> melhorar transporte público em SFS, com linhas de ônibus funcionais e horários acessíveis, além de escola até o ensino médio nos bairros.</li>
        </ul>

        <h3>7. Valores inegociáveis</h3>
        <p>Fé em Deus acima de tudo. Família como base. Verdade e transparência sempre. Não compra votos. Não faz promessas que não pode cumprir. Não aceita mentira na política.</p>

        <h3>8. Base de apoio atual</h3>
        <p>Mais de 120 mulheres passaram pelo Encontro das Estrelas. Aproximadamente 45 mulheres altamente engajadas. Influência direta estimada em 100 ou mais pessoas. Canais: salão, grupos de negócios, podcast, redes sociais.</p>

        <h3>9. O que a diferencia das outras candidatas</h3>
        <p>História real de superação, não é política de carreira. Conhece a dor do povo por ter vivido. Trabalha com mulheres há anos, não é discurso, é prática. Empatia, transparência e propósito genuíno. Voz treinada: mentora, palestrante, apresentadora.</p>

        <h3>10. Disponibilidade para campanha</h3>
        <p>Segunda, terça e quarta, 100% dedicadas à campanha. Outros dias, atendimento no salão e disponível à noite. Família 100% alinhada e encorajando.</p>

        <h3>11. Visão de futuro</h3>
        <p>Em 4 anos: reeleição como Deputada Estadual consolidada. Em 8 anos: posição ainda mais sólida na política de SC.</p>

        <h3>12. O que poderia tirar da campanha</h3>
        <p>Apenas algo muito sério na saúde da família. Nada relacionado à política ou pressão externa.</p>
      </>
    ),
  },
  {
    id: "perfil",
    icon: "👤",
    title: "Perfil Estratégico",
    teaser: "História de vida completa, atuação com mulheres, causas, percepção pessoal e frases",
    body: (
      <>
        <div className="callout">Perfil Estratégico, pré-candidata Cris Milli.</div>

        <h3>1. Dados pessoais</h3>
        <dl className="fact-grid">
          <dt>Nome completo</dt><dd>Cristianne Milli da Silva</dd>
          <dt>Nome público</dt><dd>Cris Milli</dd>
          <dt>Idade</dt><dd>53 anos</dd>
          <dt>Naturalidade</dt><dd>Capitão Leônidas Marques, Paraná</dd>
          <dt>Tempo de residência em SFS</dt><dd>9 anos</dd>
          <dt>Estado civil</dt><dd>Casada, cônjuge Julio Cesar de Souza Pereira</dd>
          <dt>Filhos</dt><dd>Mariáh Matoso, Hadassa Ayumi e Kawa</dd>
          <dt>Religião</dt><dd>Cristã</dd>
          <dt>Bairro</dt><dd>Praia do Ervino</dd>
        </dl>

        <h3>2. História de vida</h3>
        <p>Nasceu em Capitão Leônidas Marques, Paraná. Desde criança demonstrou vocação para vendas: vendia roupinhas de boneca, catálogos Avon, Boticário e Natura, e fazia viagens ao Paraguai para comprar produtos e revender no Brasil. Seu pai brincava que ela tinha "sangue de turco".</p>
        <p>Enfrentou dislexia diagnosticada, o que gerou dificuldades no aprendizado e bullying na infância. Criou três filhos praticamente sozinha. Passou por divórcio difícil por traição, o que a motivou a recomeçar em uma nova cidade. Viveu e trabalhou no Japão, onde aprendeu muito sobre organização e desenvolvimento. Retornou ao Brasil por gravidez de risco do filho Kawa. Perdeu sua mãe há poucos meses, o momento mais difícil recente de sua vida.</p>
        <p>Chegou a São Francisco do Sul há 9 anos buscando recomeço, proximidade com os pais e qualidade de vida para os filhos.</p>

        <h3>3. Trajetória profissional</h3>
        <p>Profissão principal: cabeleireira e mentora de mulheres, mais de 12 anos de atuação.</p>
        <p>Início: primeiro emprego como cabeleireira ainda jovem. Passou por diversas áreas: recepcionista e coordenadora de eventos em hotéis, atendente no HSBC telebanco, trabalhou em fábrica, vendeu pão e coxinha quando necessário, foi pastora de igreja por anos, trabalhou e empreendeu no Japão.</p>
        <p>Principais conquistas: abriu salão em São Francisco do Sul há 9 anos. Fundou o movimento Encontro das Estrelas. Criou a mentoria "Desbloqueando Seu Propósito, Método ESTRELA". Lançou o Podcast Estrelas em Foco. Assumiu a Presidência das Mulheres pelo Novo em SFS. Assumiu pré-candidatura a Deputada Estadual pelo Partido Novo SC.</p>
        <p>Experiência empreendedora: vendas desde a infância, loja de cosméticos no Japão, salão em Curitiba, salão em SFS, mentoria e movimento de mulheres.</p>

        <h3>4. Atuação com mulheres</h3>
        <p>Começou naturalmente dentro do salão, ouvindo histórias, aconselhando e apoiando clientes por 9 anos. Percebeu que seu impacto ia muito além dos cabelos.</p>
        <p>Faz mentoria individual e em grupo, palestras, encontros presenciais, podcast e conteúdo digital. Mais de 150 mulheres já passaram pelo movimento, com aproximadamente 45 altamente engajadas. Principal resultado: reconstrução de autoestima, empoderamento e autonomia feminina.</p>

        <h3>5. Encontro das Estrelas</h3>
        <p>Surgiu há 2 anos a partir de um desejo do coração de criar um espaço de conexão genuína entre mulheres. Objetivo: fortalecer mulheres emocionalmente, espiritualmente e praticamente. Mais de 150 mulheres participaram, com encontros presenciais, mentorias, podcast e ações comunitárias. Impacto: mulheres que reconstruíram relacionamentos, negócios e propósito de vida.</p>

        <h3>6. Formação e capacitação</h3>
        <p>Formação acadêmica em Educação Física, Administração Esportiva e Teologia. Experiência pastoral: pastoreou igrejas por anos no Brasil e no Japão. Participação em congressos, eventos do Partido Novo e formações de liderança feminina.</p>

        <h3>7. Valores e princípios</h3>
        <p>Valores inegociáveis: fé em Deus, família, verdade, transparência e serviço. Família é a base de tudo, uma mulher estruturada estrutura sua família e transforma sua comunidade. Trabalho com dignidade e propósito, trabalhou em tudo que foi necessário sem perder a essência. Fé inegociável, Deus acima de todas as coisas. Empreendedorismo como caminho para a autonomia e liberdade. Política como serviço público genuíno: veio para servir, não para se servir. O que não aceita: mentira, compra de votos, promessas que não pode cumprir e mulheres sendo usadas como cota.</p>

        <h3>8. Visão de mundo e propósito</h3>
        <p>O que incomoda: falta de transporte público eficiente no Ervino, ausência de escola até o ensino médio no bairro, delegacia da mulher fraca, insegurança nas ruas, jovens precisando sair de SFS para trabalhar e estudar.</p>
        <p>Por que entrou na política: não escolheu, foi convocada pelo propósito. Acredita que tem uma voz ativa e potente no meio das mulheres e que essa voz precisa estar onde as decisões são tomadas.</p>

        <h3>9. Causas que defende</h3>
        <ul>
          <li><b>Mulheres:</b> saúde mental, segurança, delegacia da mulher eficaz, voz real na política.</li>
          <li><b>Empreendedorismo:</b> crédito justo para mulheres, oportunidades para jovens, diversificação econômica em SFS.</li>
          <li><b>Família:</b> fortalecimento da estrutura familiar como base da sociedade.</li>
          <li><b>Educação:</b> escola de qualidade no bairro, acesso ao ensino médio local.</li>
          <li><b>Mobilidade:</b> transporte público funcional na Praia do Ervino e em SFS.</li>
          <li><b>Segurança:</b> policiamento efetivo e proteção para famílias e mulheres.</li>
        </ul>

        <h3>10. Base de relacionamento</h3>
        <p>Clientes do salão, 9 anos de relacionamento próximo. Mulheres do Encontro das Estrelas, mais de 150. Grupos de negócios. Ouvintes do Podcast Estrelas em Foco. Mulheres pelo Novo SFS. Lideranças do Partido Novo SC. Associação de bairro, com Conrad como presidente da associação do Ervino. Comunidade da Praia do Ervino.</p>

        <h3>11. Percepção pessoal</h3>
        <p>Como as pessoas a descrevem: corajosa, determinada, empática, verdadeira e inspiradora. Pontos fortes: oratória, conexão com pessoas, história de vida poderosa, autenticidade, fé inabalável. Ponto de melhoria: está aprendendo os processos políticos e técnicos da campanha. Diferencial: vem do povo, conhece a dor real, não é política de carreira.</p>

        <h3>12. Disponibilidade para campanha</h3>
        <p>Segunda, terça e quarta, 100% dedicadas à campanha. Demais dias, atendimento no salão e disponível à noite. Família 100% alinhada e apoiando.</p>

        <h3>13. Imagem e comunicação</h3>
        <p>Confortável com vídeos: sim, palestrante e comunicadora natural. Experiência com redes sociais: sim, Instagram ativo e crescendo. Fotos profissionais: sim, sessão de fotos realizada. Como quer ser vista: a voz feminina real, com propósito, que veio para ficar e representar de verdade.</p>

        <h3>14. Histórias reais</h3>
        <ul>
          <li>Criou três filhos sozinha após divórcio difícil, mudou de estado e reconstruiu sua vida e negócio do zero em SFS.</li>
          <li>Trabalhou de tudo no Japão, inclusive vendendo pão e coxinha, para sustentar a família, e voltou ao Brasil grávida de risco pagando a própria passagem.</li>
          <li>Através do Encontro das Estrelas, mulheres que chegaram destruídas emocionalmente encontraram propósito, reconstruíram relacionamentos e abriram negócios.</li>
        </ul>

        <h3>15. Frases que a representam</h3>
        <ul>
          <li>"Eu não vim buscar a política. A política veio até mim."</li>
          <li>"A voz feminina que não vai se calar."</li>
          <li>"Quando você reconstrói uma mulher, você reconstrói uma família."</li>
          <li>"Não vim por ambição. Vim por chamado."</li>
          <li>"Meu melhor capítulo começa agora."</li>
        </ul>

        <h3>Perguntas e respostas finais</h3>
        <p><b>Quem é a Cris Milli?</b><br />"Sou uma mulher que aprendeu a se levantar. Nasci no interior do Paraná, enfrentei dislexia, bullying, criei filhos sozinha, trabalhei no Japão, recomecei do zero mais de uma vez e cheguei em São Francisco do Sul há 9 anos para construir uma nova história. Sou cabeleireira, mentora, palestrante, fundadora do Encontro das Estrelas e agora pré-candidata a Deputada Estadual. Não vim da política, vim do povo."</p>
        <p><b>Por que as pessoas deveriam confiar em você?</b><br />"Porque minha história fala antes de mim. Não prometo o que não posso cumprir. Não compro voto. Não sou cota de ninguém. Sou uma mulher real, com dores reais, que conhece de perto as necessidades de São Francisco do Sul. Minha trajetória é prova de que quando se tem fé, propósito e coragem, a mudança acontece."</p>
      </>
    ),
  },
  {
    id: "masterfile",
    icon: "📋",
    title: "Master File Estratégico",
    teaser: "Fonte única de verdade: ficha de dados, biografia oficial, linha do tempo e Q&A base",
    body: (
      <>
        <div className="callout">Documento de referência oficial de campanha, uso interno da equipe: assessoria de imprensa, redação, design, mídias sociais, discursos. Versão 1.0, consolidada em 29 de julho de 2026.</div>

        <h3>1. Ficha oficial de dados</h3>
        <p>Todo material de campanha (site, redes sociais, santinho, release de imprensa, roteiro de vídeo, entrevista) deve usar exclusivamente os números e datas abaixo.</p>
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
          <dt>Estado civil</dt><dd>Casada</dd>
          <dt>Cônjuge</dt><dd>Julio Cesar de Souza Pereira</dd>
          <dt>Filhos</dt><dd>Mariáh Matoso, Hadassa Ayumi e Kawa</dd>
          <dt>Religião</dt><dd>Cristã</dd>
          <dt>Formação acadêmica</dt><dd>Educação Física, Administração Esportiva e Teologia</dd>
          <dt>Profissão principal</dt><dd>Cabeleireira e mentora de mulheres</dd>
          <dt>Tempo de atuação profissional</dt><dd>Mais de 12 anos</dd>
          <dt>Tempo de salão em SFS</dt><dd>9 anos</dd>
          <dt>Movimento fundado</dt><dd>Encontro das Estrelas (há 2 anos)</dd>
          <dt>Mulheres impactadas (total)</dt><dd>150 mulheres</dd>
          <dt>Mulheres altamente engajadas</dt><dd>45 mulheres</dd>
          <dt>Influência direta estimada</dt><dd>100 ou mais pessoas</dd>
          <dt>Mentoria própria</dt><dd>"Desbloqueando Seu Propósito, Método ESTRELA"</dd>
          <dt>Podcast</dt><dd>Estrelas em Foco</dd>
          <dt>Cargo partidário atual</dt><dd>Presidente das Mulheres pelo Novo, SFS</dd>
          <dt>Perda recente</dt><dd>Falecimento da mãe há 4 meses</dd>
          <dt>Disponibilidade semanal</dt><dd>Segunda, terça e quarta: 100% campanha. Demais dias: salão pela manhã, disponível à noite.</dd>
        </dl>

        <h3>2. Biografia oficial</h3>
        <p><b>Versão longa (site, release, material institucional):</b> Cris Milli nasceu em Capitão Leônidas Marques, no Paraná, e desde criança já revelava vocação para o trabalho e as vendas, vendendo roupinhas de boneca, catálogos de cosméticos e produtos trazidos do Paraguai. Enfrentou dislexia diagnosticada na infância, o que trouxe dificuldades de aprendizado e episódios de bullying, mas encontrou na determinação sua marca pessoal.</p>
        <p>Adulta, formou-se em Educação Física, Administração Esportiva e Teologia, e construiu uma trajetória profissional plural: foi recepcionista e coordenadora de eventos em hotéis, atendente de telebanco, trabalhou em fábrica, vendeu pão e coxinha quando foi preciso, atuou como pastora de igreja e empreendeu no Japão, onde viveu, trabalhou e abriu uma loja de cosméticos.</p>
        <p>Passou por um divórcio difícil, motivado por traição, e criou os três filhos, Mariáh, Hadassa e Kawa, praticamente sozinha. Há 9 anos, buscando recomeço e qualidade de vida para a família, chegou a São Francisco do Sul, onde abriu seu salão de cabeleireira e reconstruiu a vida do zero.</p>
        <p>Foi dentro do salão que Cris percebeu o alcance do seu propósito: ouvindo, aconselhando e apoiando mulheres por 9 anos, criou o movimento Encontro das Estrelas, a mentoria "Desbloqueando Seu Propósito, Método ESTRELA" e o podcast Estrelas em Foco. Já são 150 mulheres impactadas, 45 delas profundamente engajadas em um trabalho de reconstrução de autoestima, autonomia e propósito.</p>
        <p>Há quatro meses, viveu a perda da mãe, o momento mais difícil de sua trajetória recente, e transformou a dor em ainda mais clareza sobre o motivo de estar na política: servir, não se servir. Hoje, como presidente das Mulheres pelo Novo em São Francisco do Sul, Cris Milli é pré-candidata a Deputada Estadual por Santa Catarina pelo Partido Novo, levando para a política a mesma prática de escuta, verdade e reconstrução que já exerce há anos.</p>
        <p><b>Versão curta (redes sociais, assessoria de imprensa, apresentação rápida):</b> Cris Milli, 53 anos, é cabeleireira, mentora de mulheres e fundadora do movimento Encontro das Estrelas em São Francisco do Sul (SC). Criou três filhos sozinha, superou dislexia e bullying na infância, viveu e trabalhou no Japão e reconstruiu a vida do zero mais de uma vez. Há 9 anos em SFS, já impactou 150 mulheres com mentorias, encontros e o podcast Estrelas em Foco. Hoje é pré-candidata a Deputada Estadual pelo Partido Novo (30.180), não veio da política, veio do povo.</p>
        <p><b>Microbio (Instagram / cartão de visita, até 150 caracteres):</b> "Cabeleireira. Mentora de 150 mulheres. Mãe que criou 3 filhos sozinha. Agora, voz do povo na política. Deputada Estadual 30.180, Partido Novo."</p>

        <h3>3. Linha do tempo de vida</h3>
        <ul>
          <li>Infância em Capitão Leônidas Marques (PR): primeiras vendas, diagnóstico de dislexia, episódios de bullying.</li>
          <li>Juventude: primeiro emprego como cabeleireira, passagem por hotelaria, telebanco (HSBC) e fábrica.</li>
          <li>Vida adulta: casamento, nascimento dos três filhos, divórcio difícil por traição.</li>
          <li>Período no Japão: trabalho e empreendedorismo (loja de cosméticos), vendas informais para sustento da família.</li>
          <li>Retorno ao Brasil: gravidez de risco do filho Kawa, decisão de recomeçar perto dos pais.</li>
          <li>Chegada a São Francisco do Sul (há 9 anos): abertura do salão, reconstrução da vida e do negócio do zero.</li>
          <li>Há 2 anos: criação do Encontro das Estrelas.</li>
          <li>Consolidação: mentoria "Método ESTRELA", podcast Estrelas em Foco, 150 mulheres impactadas.</li>
          <li>Entrada no Partido Novo: presidência das Mulheres pelo Novo em SFS.</li>
          <li>Há 4 meses: perda da mãe.</li>
          <li>Atualidade: pré-candidatura a Deputada Estadual por Santa Catarina, número 30.180.</li>
        </ul>

        <h3>4. Posicionamento estratégico</h3>
        <p><b>Slogan principal:</b> "Eu não vim buscar a política. A política veio até mim."</p>
        <p><b>Slogans de apoio:</b></p>
        <ul>
          <li>"A voz feminina que não vai se calar."</li>
          <li>"Quando você reconstrói uma mulher, você reconstrói uma família."</li>
          <li>"Não vim por ambição. Vim por chamado."</li>
          <li>"Meu melhor capítulo começa agora."</li>
        </ul>
        <p><b>Três bandeiras da candidatura:</b></p>
        <ul>
          <li><b>Mulher e Família:</b> saúde mental feminina, segurança da mulher e delegacia da mulher eficaz em São Francisco do Sul.</li>
          <li><b>Empreendedorismo e Juventude:</b> crédito justo para mulheres, oportunidades para jovens permanecerem em SFS para trabalhar e estudar, diversificação da economia local.</li>
          <li><b>Mobilidade e Infraestrutura:</b> transporte público funcional, linhas e horários acessíveis, escola até o ensino médio nos bairros, com foco na Praia do Ervino.</li>
        </ul>
        <p><b>Valores inegociáveis:</b> fé em Deus acima de tudo, família como base de tudo, verdade e transparência sempre, trabalho com dignidade e propósito, empreendedorismo como caminho de autonomia.</p>
        <p><b>O que ela recusa (usar em resposta a ataques):</b></p>
        <ul>
          <li>Não compra voto.</li>
          <li>Não faz promessa que não pode cumprir.</li>
          <li>Não aceita mentira na política.</li>
          <li>Não é candidata de cota, é representação legítima.</li>
          <li>Não é política de carreira, vem do povo.</li>
        </ul>

        <h3>5. Diferenciais competitivos</h3>
        <ul>
          <li>História real de superação, verificável e coerente, não construída para a campanha.</li>
          <li>Base de relacionamento pré-existente e ativa: 150 mulheres, salão com 9 anos de clientela, podcast rodando.</li>
          <li>Prática antes do discurso: já exerce o trabalho de reconstrução feminina há anos, antes de ser candidata.</li>
          <li>Comunicadora natural: palestrante, mentora, apresentadora de podcast, trânsito confortável em vídeo e redes.</li>
          <li>Rede local consolidada: associação de bairro do Ervino (Conrad, presidente), Mulheres pelo Novo SFS, lideranças partidárias em SC.</li>
        </ul>
        <p><b>Pontos de atenção (uso interno da equipe, não divulgar):</b> curva de aprendizado dos processos técnicos e institucionais da política, mitigar com preparação intensiva de assessoria. Base geográfica concentrada em São Francisco do Sul, exige estratégia de expansão regional (Joinville, Araquari, Garuva) para viabilidade em eleição proporcional estadual. Narrativa de "voz feminina" precisa equilíbrio para também dialogar com eleitorado masculino, sem perder identidade.</p>

        <h3>6. Base de apoio e canais</h3>
        <ul>
          <li>Clientes do salão, relacionamento de 9 anos.</li>
          <li>Mulheres do Encontro das Estrelas, 150 mulheres, 45 altamente engajadas.</li>
          <li>Ouvintes do podcast Estrelas em Foco.</li>
          <li>Grupos de negócios e empreendedorismo feminino.</li>
          <li>Mulheres pelo Novo, São Francisco do Sul.</li>
          <li>Lideranças do Partido Novo em Santa Catarina.</li>
          <li>Associação de moradores da Praia do Ervino (presidente: Conrad).</li>
          <li>Comunidade da Praia do Ervino.</li>
        </ul>

        <h3>7. Histórias para uso em conteúdo e discursos</h3>
        <ul>
          <li>Criou três filhos sozinha após divórcio difícil, mudou de estado e reconstruiu vida e negócio do zero em São Francisco do Sul.</li>
          <li>Trabalhou de tudo no Japão, inclusive vendendo pão e coxinha, para sustentar a família, e voltou ao Brasil grávida de risco, pagando a própria passagem.</li>
          <li>Pelo Encontro das Estrelas, mulheres que chegaram destruídas emocionalmente reconstruíram relacionamentos, negócios e propósito de vida.</li>
        </ul>
        <p><b>Perguntas e respostas oficiais:</b></p>
        <p><b>Quem é a Cris Milli?</b><br />"Sou uma mulher que aprendeu a se levantar. Nasci no interior do Paraná, enfrentei dislexia, bullying, criei filhos sozinha, trabalhei no Japão, recomecei do zero mais de uma vez e cheguei em São Francisco do Sul há 9 anos para construir uma nova história. Sou cabeleireira, mentora, palestrante, fundadora do Encontro das Estrelas e agora pré-candidata a Deputada Estadual. Não vim da política, vim do povo."</p>
        <p><b>Por que as pessoas deveriam confiar em você?</b><br />"Porque minha história fala antes de mim. Não prometo o que não posso cumprir. Não compro voto. Não sou cota de ninguém. Sou uma mulher real, com dores reais, que conhece de perto as necessidades de São Francisco do Sul. Minha trajetória é prova de que quando se tem fé, propósito e coragem, a mudança acontece."</p>

        <h3>8. Governança deste documento</h3>
        <p>Este Master File é a fonte única de verdade sobre biografia, dados numéricos e narrativa oficial da candidatura. Qualquer atualização de número, data ou fato deve ser feita primeiro aqui, e só depois replicada para site, redes sociais, assessoria de imprensa e peças gráficas. Versão 1.0, consolidada em 29 de julho de 2026, responsabilidade da equipe de estratégia de campanha.</p>
      </>
    ),
  },
  {
    id: "diagnostico-eleitoral-doc",
    icon: "🗳️",
    title: "Diagnóstico Eleitoral",
    teaser: "Números oficiais TSE, TRE-SC, IBGE e Alesc: eleitorado, Partido Novo, viabilidade e metas",
    body: (
      <>
        <div className="callout">Diagnóstico eleitoral completo, Santa Catarina e São Francisco do Sul. Base: dados oficiais TSE, TRE-SC, IBGE e Alesc, julho de 2026. Documento consolidado em 29 de julho de 2026, recomenda-se atualização após o fechamento das convenções partidárias (5 de agosto) e o registro oficial de candidaturas (15 de agosto).</div>

        <h3>Sumário executivo</h3>
        <ul>
          <li>Santa Catarina terá 5.725.753 eleitores aptos em 2026, crescimento de 4,3% em relação a 2022, impulsionado pela migração para o litoral do estado.</li>
          <li>A partir de 2026, a Alesc passa de 40 para 44 cadeiras, por determinação constitucional ligada ao aumento de deputados federais. Isso reduz o quociente eleitoral necessário para eleger um deputado estadual em relação a 2022.</li>
          <li>O Partido Novo elegeu apenas 1 deputado estadual em 2022 (Matheus Cadorin, Joinville, 12.390 votos, a menor votação individual entre os 40 eleitos), mas cresceu de forma expressiva nas eleições municipais de 2024 em todo o estado, especialmente na região de Joinville.</li>
          <li>O Novo já confirmou 37 pré-candidaturas a deputado estadual em SC para 2026 e formalizou aliança com o PL de Jorginho Mello para o governo do estado. O ex-prefeito de Joinville, Adriano Silva (Novo), é o pré-candidato a vice na chapa governista.</li>
          <li>São Francisco do Sul tem cerca de 42 a 44 mil eleitores e nenhum vereador ou força institucional consolidada do Partido Novo, um vácuo de representação que Cris Milli pode ocupar como referência regional da legenda.</li>
          <li>A candidatura precisa de uma estratégia de expansão regional além de SFS (Joinville, Araquari, Garuva, Itapoá, Balneário Barra do Sul) para atingir uma votação competitiva dentro do sistema proporcional.</li>
        </ul>

        <h3>1. Panorama eleitoral de Santa Catarina, 2026</h3>
        <p><b>1.1 Eleitorado do estado</b></p>
        <table className="data-table">
          <tbody>
            <tr><td>Eleitorado total SC (2026)</td><td>5.725.753 eleitores</td></tr>
            <tr><td>Crescimento vs. 2022</td><td>+236.095 eleitores (+4,3%), SC tinha 5.489.658 em 2022</td></tr>
            <tr><td>Participação no eleitorado nacional</td><td>≈ 3,6% do total do Brasil (158,7 milhões)</td></tr>
            <tr><td>Eleitoras (mulheres)</td><td>2.992.155 (52,26% do eleitorado)</td></tr>
            <tr><td>Eleitores (homens)</td><td>2.733.597 (47,74% do eleitorado)</td></tr>
            <tr><td>Faixa etária de maior concentração</td><td>40 a 44 anos: 593.960 pessoas (10,37%)</td></tr>
            <tr><td>Eleitores com biometria coletada</td><td>5.135.536 (89,69%)</td></tr>
            <tr><td>Migração para SC (nov/2025 a mai/2026)</td><td>260.546 transferências de domicílio eleitoral, 60,5% vindas de outros estados (RS, PR, SP à frente)</td></tr>
          </tbody>
        </table>
        <p className="pbm-note" style={{ background: "transparent", color: "var(--gray-text)", padding: 0 }}>Fonte: TSE / TRE-SC, consolidação do eleitorado, julho de 2026.</p>

        <p><b>1.2 Maiores colégios eleitorais do estado</b></p>
        <p>Entre os dez maiores municípios em número de eleitores, destaque para a concentração de força eleitoral no eixo Joinville, Florianópolis e Blumenau, que juntos representam uma parcela decisiva dos votos válidos estaduais.</p>
        <table className="data-table">
          <tbody>
            <tr><td>Joinville</td><td>441.735 eleitores</td></tr>
            <tr><td>Florianópolis</td><td>420.430 eleitores</td></tr>
            <tr><td>Blumenau</td><td>268.254 eleitores</td></tr>
            <tr><td>São José</td><td>194.697 eleitores</td></tr>
            <tr><td>Itajaí</td><td>182.124 eleitores</td></tr>
            <tr><td>Chapecó</td><td>163.650 eleitores</td></tr>
          </tbody>
        </table>

        <p><b>1.3 Calendário eleitoral 2026</b></p>
        <ul>
          <li>Convenções partidárias para oficializar candidaturas: 20 de julho a 5 de agosto de 2026.</li>
          <li>Registro oficial de candidaturas na Justiça Eleitoral: até 15 de agosto de 2026.</li>
          <li>Início oficial da campanha (rua e internet): 16 de agosto de 2026.</li>
          <li>1º turno: domingo, 4 de outubro de 2026, das 8h às 17h.</li>
          <li>2º turno (cargos majoritários, se necessário): 25 de outubro de 2026.</li>
        </ul>

        <p><b>1.4 Regras do jogo para deputado estadual</b></p>
        <p>A eleição para deputado estadual é proporcional: o eleitor vota no candidato, mas o que decide quem se elege é o desempenho total do partido. Não existem mais coligações para cargos proporcionais desde 2020, cada partido concorre com sua própria votação.</p>
        <table className="data-table">
          <tbody>
            <tr><td>Vagas na Alesc (2022)</td><td>40 deputados estaduais</td></tr>
            <tr><td>Vagas na Alesc (a partir de 2026)</td><td>44 deputados estaduais, aumento definido pela Constituição Federal, vinculado ao crescimento da bancada federal de SC</td></tr>
            <tr><td>Votos para eleger um deputado em 2022</td><td>Estimativa de mercado entre 90 mil e 105 mil votos para quociente cheio; o menos votado dos 40 eleitos entrou com 12.390 votos via quociente partidário</td></tr>
            <tr><td>Cláusula de barreira individual</td><td>Cada candidato precisa de ao menos 10% do quociente eleitoral em votos próprios para poder ocupar a vaga conquistada pelo partido</td></tr>
            <tr><td>Caminho mais comum para partidos pequenos</td><td>Não depende de um único "puxador de votos": o que importa é a soma de votos de todos os candidatos do partido atingir o quociente eleitoral do estado</td></tr>
          </tbody>
        </table>
        <div className="callout">Leitura estratégica: o aumento de 40 para 44 cadeiras tende a reduzir o quociente eleitoral necessário por vaga em 2026, um cenário estruturalmente mais favorável a partidos de menor porte, como o Novo, do que foi 2022.</div>

        <p><b>1.5 Corrida ao Governo do Estado, cenário de fundo</b></p>
        <p>O governador Jorginho Mello (PL), que busca reeleição, aparece com folga na liderança em todas as pesquisas divulgadas até julho de 2026 (patamares entre 46% e 54,2% em cenários estimulados, com aprovação de gestão entre 64% e 75%). João Rodrigues (PSD) aparece em segundo lugar, na faixa de 18% a 22%, e Gelson Merísio (PSB) surge como o nome de centro-esquerda com maior rejeição entre os testados.</p>
        <p>Esse cenário de vantagem consolidada do PL e de Jorginho Mello é relevante para a candidatura porque o Partido Novo formalizou aliança com o governador para 2026: o ex-prefeito de Joinville, Adriano Silva (Novo), é o pré-candidato a vice-governador na chapa governista. Isso projeta o Novo para dentro do palanque estadual dominante, um ativo de visibilidade e capilaridade que a candidatura de Cris Milli pode aproveitar.</p>

        <p><b>1.6 Financiamento e cotas de gênero, regras 2026</b></p>
        <ul>
          <li>Partidos são obrigados a destinar ao menos 30% do Fundo Especial de Financiamento de Campanha (FEFC) a candidaturas femininas, na mesma proporção do total de candidaturas mulheres lançadas.</li>
          <li>Se o partido lança 50% de candidatas mulheres, 50% do fundo eleitoral e do tempo de rádio/TV devem ir para elas. A distribuição interna do Novo em SC será um ponto de atenção e negociação da campanha.</li>
          <li>O TSE ampliou em 2026 o uso do fundo eleitoral para custear ações de prevenção à violência política de gênero e contratação de segurança para candidatas, sem contar essas despesas dentro da cota mínima de 30%.</li>
          <li>Fraude de cota de gênero é crime eleitoral: votação inexpressiva, prestação de contas zerada ou ausência de atos de campanha de uma candidata "laranja" podem gerar inelegibilidade. Reforça a importância de a campanha de Cris Milli ser real, visível e documentada desde o início.</li>
        </ul>

        <h3>2. O Partido Novo em Santa Catarina</h3>
        <p><b>2.1 Trajetória recente</b></p>
        <p>O Novo teve um salto de desempenho nas eleições municipais de 2024 em Santa Catarina. Em 2020, o partido tinha candidatos em apenas 6 municípios catarinenses; em 2024, ampliou para 38 cidades. O partido elegeu 3 prefeitos em 2024 (ante 1 em 2020) e saltou de 10 para 35 vereadores eleitos no estado, incluindo cadeiras em Joinville, Blumenau, Balneário Camboriú, Itapema, Jaraguá do Sul, São José, Tijucas, entre outras.</p>
        <p>Apesar desse crescimento, São Francisco do Sul não está entre os municípios onde o Novo elegeu vereadores em 2024, um dado relevante para o posicionamento de Cris Milli como pioneira e referência local da legenda.</p>

        <p><b>2.2 Representação atual na Alesc</b></p>
        <table className="data-table">
          <tbody>
            <tr><td>Deputado estadual eleito em 2022</td><td>Matheus Cadorin, único representante do Novo na Assembleia Legislativa de SC</td></tr>
            <tr><td>Origem</td><td>Joinville, ex-diretor executivo dos Bombeiros Voluntários de Joinville</td></tr>
            <tr><td>Votação obtida</td><td>12.390 votos, a menor votação individual entre os 40 deputados eleitos em 2022, eleito via quociente partidário</td></tr>
            <tr><td>Desempenho na região litorânea</td><td>Muito baixo fora de Joinville, por exemplo apenas 81 votos em Araquari, município vizinho de São Francisco do Sul</td></tr>
            <tr><td>Pautas defendidas no mandato</td><td>Empreendedorismo, desburocratização, redução de impostos, transparência (autor do 1º projeto de lei do Brasil redigido com apoio de IA)</td></tr>
          </tbody>
        </table>
        <div className="callout">Leitura estratégica: o Novo elegeu seu único deputado com votação relativamente baixa e concentrada quase exclusivamente na capital regional (Joinville). Isso expõe uma lacuna real: o partido não tem, hoje, nenhuma liderança consolidada no Litoral Norte fora da própria Joinville, espaço que Cris Milli pode ocupar como a referência da legenda na região.</div>

        <p><b>2.3 O Novo rumo a 2026</b></p>
        <ul>
          <li>37 pré-candidaturas a deputado estadual já confirmadas pelo Novo em Santa Catarina para 2026, além de 17 pré-candidaturas a deputado federal.</li>
          <li>Aliança formalizada com o PL de Jorginho Mello para o Governo do Estado: Adriano Silva (Novo, ex-prefeito de Joinville) é pré-candidato a vice-governador na chapa governista.</li>
          <li>Lideranças estaduais do partido incluem o deputado estadual Matheus Cadorin, os deputados federais Gilson Marques e Marcel van Hattem, e a prefeita de Joinville, Rejane Gambin.</li>
          <li>O grande volume de pré-candidaturas (37 para 44 vagas) tende a pulverizar votos dentro do próprio partido, reforça a importância de Cris Milli construir uma base de votos própria e não depender apenas do desempenho de outros nomes da legenda.</li>
        </ul>

        <h3>3. Região Norte e Litoral Norte de Santa Catarina</h3>
        <p><b>3.1 Eleitorado da região</b></p>
        <table className="data-table">
          <tbody>
            <tr><td>Joinville</td><td>441.735 eleitores (maior colégio eleitoral do estado)</td></tr>
            <tr><td>São Francisco do Sul</td><td>≈ 42 a 44 mil eleitores</td></tr>
            <tr><td>Jaraguá do Sul</td><td>130.874 eleitores</td></tr>
            <tr><td>Guaramirim</td><td>33.660 eleitores</td></tr>
            <tr><td>Itapoá</td><td>população de referência ≈ 21 mil habitantes (2020), eleitorado em forte expansão</td></tr>
            <tr><td>Balneário Barra do Sul</td><td>população de referência ≈ 15 mil habitantes (2022)</td></tr>
          </tbody>
        </table>
        <p><b>3.2 O que a eleição de 2022 mostrou sobre a região</b></p>
        <p>Na eleição de 2022, a região Norte de Santa Catarina elegeu 6 deputados estaduais, sendo 3 apenas em Joinville: Sargento Lima (PL, 71.185 votos), Fernando Krelling (MDB, 54.320 votos, reeleito) e Matheus Cadorin (Novo, 12.390 votos, eleito por quociente partidário). Na região de Jaraguá do Sul, também se elegeram Antídio Lunelli (MDB, 74.500 votos), Maurício Eskudlark (PL, 65.638 votos) e Vicente Caropreso (PSDB).</p>
        <p>O padrão observado é claro: fora dos nomes já consolidados de MDB e PL, que dominam a região historicamente, o Novo entrou com folga bem mais estreita, o que confirma a lacuna de representação disponível para uma candidatura nova e bem trabalhada dentro do próprio partido.</p>

        <h3>4. São Francisco do Sul, diagnóstico local</h3>
        <p><b>4.1 Dados do município</b></p>
        <table className="data-table">
          <tbody>
            <tr><td>População (Censo 2022)</td><td>≈ 52 mil habitantes, 3º município mais populoso da região de Joinville</td></tr>
            <tr><td>Eleitorado (2024)</td><td>42.083 eleitores aptos</td></tr>
            <tr><td>Crescimento do eleitorado</td><td>+8,35% frente a 2020; a tendência para 2026 é de eleitorado ainda maior, acompanhando o crescimento populacional do litoral</td></tr>
            <tr><td>Biometria coletada</td><td>70,94% do eleitorado (29.854 eleitores)</td></tr>
            <tr><td>Vagas na Câmara Municipal</td><td>13 vereadores</td></tr>
            <tr><td>Perfil econômico</td><td>3º maior porto do estado, forte peso do comércio, turismo e serviços de alojamento/alimentação</td></tr>
          </tbody>
        </table>
        <p><b>4.2 Resultado da eleição municipal de 2024</b></p>
        <p>Godofredo (MDB) foi eleito prefeito de São Francisco do Sul em primeiro turno, com 52,85% dos votos válidos, superando Renato (PL), com 43,89%. A eleição para a Câmara Municipal consolidou uma composição fragmentada, com vereadores eleitos por PODE, União Brasil, PSD, MDB, PP e PL. O Partido Novo não elegeu nenhum vereador no município.</p>
        <div className="callout">Leitura estratégica: a ausência de qualquer vereador ou estrutura consolidada do Novo em São Francisco do Sul confirma que Cris Milli não herda, e também não disputa, capital político local dentro do próprio partido. Ela pode se posicionar como a primeira liderança relevante do Novo na cidade, o que é um ativo, mas também significa que toda a estrutura de campanha (cabos eleitorais, coordenadores de bairro, rede de apoio) precisa ser construída praticamente do zero a partir da base pessoal que ela já tem: salão, Encontro das Estrelas, podcast.</div>

        <h3>5. Diagnóstico estratégico para a candidatura</h3>
        <p><b>5.1 Viabilidade, leitura realista</b></p>
        <ul>
          <li>São Francisco do Sul sozinha, com seus ~42 a 44 mil eleitores, não é suficiente para eleger uma deputada estadual, mesmo em um cenário extremamente favorável de mobilização. Nenhum município da região elegeu um deputado estadual baseado apenas no próprio eleitorado local em 2022.</li>
          <li>O caminho realista passa por votação forte e concentrada em SFS como base segura, combinada com expansão de presença em Joinville, Araquari, Garuva, Itapoá e Balneário Barra do Sul, e o desempenho agregado do Partido Novo em todo o estado, que decide quantas cadeiras a legenda vai ocupar.</li>
          <li>O precedente de Matheus Cadorin, eleito com 12.390 votos, a menor votação entre os 40 eleitos em 2022, mostra que não é indispensável ser a maior "puxadora de votos" pessoal, mas é indispensável ultrapassar a cláusula de barreira individual (10% do quociente eleitoral) e contribuir de forma relevante para a soma de votos do partido.</li>
          <li>Com a Alesc passando de 40 para 44 cadeiras em 2026, o quociente eleitoral por vaga tende a cair, um cenário estruturalmente mais favorável do que em 2022 para partidos de porte médio como o Novo.</li>
        </ul>

        <p><b>5.2 Meta de votos, cenários de referência</b></p>
        <table className="data-table">
          <tbody>
            <tr><td>Piso mínimo de viabilidade (cláusula de barreira)</td><td>Aproximadamente 10% do quociente eleitoral estadual, historicamente entre 9 mil e 10,5 mil votos, ajustado para baixo em 2026 pelo aumento de cadeiras</td></tr>
            <tr><td>Patamar de candidatura competitiva dentro do Novo</td><td>Faixa de 12 mil a 20 mil votos, tomando como referência o padrão do único eleito do partido em 2022</td></tr>
            <tr><td>Patamar de candidatura "puxadora" dentro do Novo</td><td>25 mil votos ou mais, só alcançável com forte presença fora de SFS</td></tr>
          </tbody>
        </table>
        <div className="callout">Estes números são estimativas de planejamento a partir de dados históricos (2022) e das mudanças estruturais para 2026. Não substituem uma pesquisa eleitoral proprietária, que a campanha deve encomendar assim que possível para calibrar metas por município e por bairro.</div>

        <p><b>5.3 Pontos fortes a explorar</b></p>
        <ul>
          <li>Vácuo de representação do Novo no Litoral Norte fora de Joinville, espaço real para Cris Milli se tornar a referência regional do partido.</li>
          <li>Aliança do Novo com o PL de Jorginho Mello, favorito à reeleição, com aprovação entre 64% e 75%, projeta a legenda para dentro do palanque estadual dominante, com potencial ganho de visibilidade e recursos de campanha.</li>
          <li>Momentum de crescimento do Novo em SC (de 10 para 35 vereadores eleitos entre 2020 e 2024) mostra um partido em ascensão, não estagnado.</li>
          <li>Regras de cota de gênero (mínimo de 30% do fundo eleitoral para candidatas mulheres) tornam o protagonismo de Cris Milli dentro do partido tanto uma obrigação legal quanto uma oportunidade de recursos, se a legenda cumprir a regra investindo de verdade nas candidaturas femininas.</li>
        </ul>

        <p><b>5.4 Riscos e desafios a endereçar</b></p>
        <ul>
          <li>Pulverização interna: 37 pré-candidaturas do Novo a deputado estadual concorrendo pelos mesmos votos do partido. Cris Milli precisa de uma identidade e uma base de votos claramente diferenciada das demais candidaturas da legenda.</li>
          <li>Ausência de estrutura local do partido em SFS: toda a militância e capilaridade de campanha na cidade precisa ser construída a partir da base pessoal dela (salão, Encontro das Estrelas, podcast), não herdada de uma máquina partidária.</li>
          <li>Necessidade de expansão geográfica real para Joinville e municípios vizinhos, sem isso, o teto de votos fica baixo demais para viabilizar a eleição, mesmo em cenário favorável de quociente partidário.</li>
          <li>Curva de aprendizado dos processos técnicos e legais da campanha, já identificada no Perfil Estratégico, ainda mais relevante dado o ambiente de regras específicas de 2026 (cotas, prestação de contas, fundo eleitoral).</li>
        </ul>

        <p><b>5.5 Recomendações imediatas</b></p>
        <ul>
          <li>Encomendar pesquisa eleitoral qualitativa e quantitativa (mesmo que em escala reduzida ou regional) para calibrar rejeição, conhecimento de marca e potencial de voto em SFS e municípios vizinhos.</li>
          <li>Mapear e iniciar articulação com lideranças do Novo em Joinville, Araquari, Garuva e Itapoá, antes das convenções partidárias (20/07 a 05/08).</li>
          <li>Construir agenda de presença física recorrente fora de SFS (pelo menos Joinville) a partir de agosto, para gerar reconhecimento de rosto e nome antes da fase decisiva da campanha.</li>
          <li>Formalizar imediatamente o Requerimento de Declaração de Elegibilidade e toda a documentação de registro de candidatura, dado o prazo de 15 de agosto de 2026.</li>
          <li>Negociar formalmente com a direção estadual do Novo a distribuição da cota de 30% do fundo eleitoral e do tempo de propaganda destinado a candidatas mulheres, documentando o pedido por escrito.</li>
        </ul>

        <h3>6. Fontes consultadas</h3>
        <p>Este diagnóstico foi construído a partir de fontes oficiais e de credibilidade nacional, priorizando dados primários sempre que disponíveis:</p>
        <ul>
          <li>Tribunal Superior Eleitoral (TSE): consolidação do eleitorado 2026, resoluções eleitorais, regras de cota de gênero e fundo eleitoral.</li>
          <li>Tribunal Regional Eleitoral de Santa Catarina (TRE-SC): dados do eleitorado estadual e municipal, resultados oficiais das eleições de 2022 e 2024.</li>
          <li>Instituto Brasileiro de Geografia e Estatística (IBGE): dados populacionais de São Francisco do Sul e municípios da região.</li>
          <li>Assembleia Legislativa de Santa Catarina (Alesc): composição da Casa, histórico de deputados eleitos, biografia de Matheus Cadorin.</li>
          <li>Veículos de imprensa de credibilidade nacional e estadual: ND+, Poder360, NSC Total, CNN Brasil, Gazeta do Povo, CartaCapital, para pesquisas eleitorais, resultados consolidados e contexto político.</li>
          <li>Site oficial do Partido Novo: pré-candidaturas confirmadas para 2026 e perfil de lideranças eleitas.</li>
        </ul>
      </>
    ),
  },
  {
    id: "plano-comunicacao",
    icon: "🎯",
    title: "Plano Estratégico de Comunicação",
    teaser: "Funil Sensibilizar, Motivar, Mobilizar: diagnóstico SWOT, canais, entregáveis e indicadores",
    body: (
      <>
        <div className="callout">Plano Estratégico de Comunicação, Campanha Cris Millis 2026, Deputada Estadual SC. Partido Novo (30), São Francisco do Sul / Litoral Norte de SC. Período de execução: 16 de agosto a 2 de outubro de 2026. Documento complementar à proposta "Comunicação Estratégica para Campanha Eleitoral 2026" (#2026-FA26), preparado por Pro Creator.</div>

        <h3>1. Sumário executivo</h3>
        <p>A candidatura de Cris Millis parte de uma base pouco comum entre pré-candidaturas de primeira viagem: uma marca pessoal já construída como mentora de propósito e palestrante, com comunidade própria (Clube Estrelas) e produto de conteúdo consolidado (Além Espelho, Podcast Estrelas). O desafio estratégico não é criar uma audiência do zero, é converter uma audiência de mentoria em capital político em 50 dias, sem verba de tráfego pago, dentro do calendário eleitoral oficial do TSE.</p>
        <p>Este plano aplica o funil de comunicação eleitoral Sensibilizar, Motivar, Mobilizar (referência: Marcelo Vitorino, Academia Vitorino & Mendonça) sobre o período contratado, integrando os entregáveis já vendidos (planejamento, redes sociais, site, fotos e vídeos) a cada fase, e aponta as decisões e inputs que ainda precisam vir da candidata.</p>

        <h3>2. Contexto eleitoral</h3>
        <p>A nominata do Partido Novo para deputado estadual em Santa Catarina foi lançada oficialmente em 4 de julho de 2026, no 7º Encontro Estadual do partido em Joinville, ao lado de outros 36 pré-candidatos ao cargo, entre eles nomes fortes da região de Cris: Neto Petters (Joinville) e o deputado estadual Matheus Cadorin (Joinville, buscando reeleição). O evento também contou com o governador Jorginho Mello, o pré-candidato ao Senado Deltan Dallagnol, os deputados federais Gilson Marques e Marcel van Hattem, e a prefeita de Joinville, Rejane Gambin.</p>
        <p>Isso posiciona Cris dentro de um núcleo regional forte do Novo no litoral norte e Joinville, um ativo estratégico de aliança que deve ser explorado, não um detalhe de rodapé.</p>
        <table className="data-table">
          <tbody>
            <tr><td>16/08/2026</td><td>Início oficial da propaganda eleitoral (ruas e internet), início do escopo contratado</td></tr>
            <tr><td>28/08 a 01/10/2026</td><td>Horário eleitoral gratuito no rádio e TV (fora do escopo contratado, mas deve estar alinhado à narrativa das redes)</td></tr>
            <tr><td>02/10/2026</td><td>Encerramento do escopo contratado, véspera da eleição</td></tr>
            <tr><td>04/10/2026</td><td>1º turno, eleição proporcional que decide tudo neste dia (não há 2º turno para este cargo)</td></tr>
          </tbody>
        </table>

        <h3>3. Diagnóstico estratégico</h3>
        <p><b>Forças</b></p>
        <ul>
          <li>Marca pessoal pré-existente e monetizada (mentoria, palestras, comunidade paga), rara entre pré-candidatos de primeira viagem, que normalmente partem do zero.</li>
          <li>Comunidade própria ativa (Clube Estrelas), infraestrutura de mobilização que substitui parcialmente a ausência de verba de tráfego pago.</li>
          <li>Inserção em reduto regional forte do partido (Joinville/litoral norte), com lideranças eleitas e pré-candidatas de peso na mesma região.</li>
          <li>Pauta de "voz feminina" já presente na bio, ponto de partida para narrativa, ainda que precise de concretização.</li>
        </ul>
        <p><b>Fraquezas</b></p>
        <ul>
          <li>Base de seguidores pequena para a escala de uma disputa estadual (~3 mil) e proporção baixa de engajamento aparente frente ao volume de posts.</li>
          <li>Sem site institucional até o momento, resolvido pelo escopo contratado, mas precisa ir ao ar cedo para não ficar atrás do calendário.</li>
          <li>Zero verba de mídia paga contratada, todo o crescimento depende de orgânico e boca a boca.</li>
        </ul>
        <p><b>Oportunidades</b></p>
        <ul>
          <li>Reposicionar o produto de mentoria ("transformação pessoal") como "transformação pública", mesma metodologia de conexão, novo objeto.</li>
          <li>Cross-promotion com colegas de chapa da região (Joinville/litoral norte) para ampliar alcance combinado sem custo de mídia.</li>
          <li>Horário eleitoral gratuito (28/08 a 01/10) como caixa de ressonância gratuita para a narrativa já validada nas redes.</li>
        </ul>
        <p><b>Riscos</b></p>
        <ul>
          <li>Janela de 50 dias é curta para crescer alcance do zero, reforça a importância de ativar a comunidade já existente desde a semana 1, não esperar a fase de Mobilizar.</li>
          <li>Concorrência interna por atenção e palanque: são 37 pré-candidaturas do próprio Novo disputando o mesmo público simpatizante em SC.</li>
          <li>"Voz feminina que não vai se calar" é uma promessa forte. Sem 2 a 3 bandeiras concretas por trás dela, vira slogan vazio e abre espaço para desgaste. Precisa de validação de pauta com a candidata.</li>
        </ul>

        <h3>4. Posicionamento e narrativa central</h3>
        <p>Proposta de posicionamento: Cris Millis não chega à política como estreante, chega como alguém que já treinou centenas de pessoas a mudar de vida, e agora aplica essa mesma capacidade de mobilização a um projeto público. A narrativa central sugerida é a ponte entre o "antes" (mentora que transforma indivíduos) e o "depois" (representante que transforma uma região).</p>
        <p>Isso resolve, ao mesmo tempo, dois problemas: dá prova concreta à promessa de "voz feminina" (ela já lidera uma comunidade de mulheres) e produz conteúdo sem depender de agenda político-partidária tradicional, podendo usar cases reais do Clube Estrelas como prova social recorrente.</p>

        <h3>5. Framework de comunicação: Sensibilizar, Motivar, Mobilizar</h3>
        <p>O funil de Marcelo Vitorino organiza a comunicação eleitoral em etapas com propósitos distintos: sensibilização gera empatia e não pede voto; motivação apresenta propostas e credibilidade; mobilização converte confiança acumulada em ação, compartilhar, indicar, votar. Pular etapas (pedir voto antes de gerar identificação) é o erro mais comum em campanhas de estreantes, e o principal risco a evitar aqui, dado o histórico de Cris como criadora de conteúdo, onde CTAs diretos já fazem parte do hábito de publicação.</p>
        <table className="data-table">
          <tbody>
            <tr><td><b>Sensibilizar</b><br />16/08 a 05/09 (semanas 1 a 3)</td><td>Objetivo: gerar empatia e identificação, apresentar a origem, a história e as dores que motivaram a candidatura.<br />CTA dominante: nenhum pedido de voto direto, curtir, comentar, seguir, conhecer a história.</td></tr>
            <tr><td><b>Motivar</b><br />06/09 a 19/09 (semanas 4 e 5)</td><td>Objetivo: transformar identificação em confiança, mostrar propostas, credibilidade e prova social.<br />CTA dominante: compartilhar propostas, entrar na comunidade de WhatsApp, indicar a candidata.</td></tr>
            <tr><td><b>Mobilizar</b><br />20/09 a 02/10 (semanas 6 e 7, intensidade dobrada)</td><td>Objetivo: converter confiança em voto e em rede de apoio ativa (cabo eleitoral digital).<br />CTA dominante: votar dia 4/10, levar 3 pessoas, compartilhar agenda de eventos, contagem regressiva.</td></tr>
          </tbody>
        </table>

        <h3>6. Pilares de conteúdo</h3>
        <ul>
          <li><b>Trajetória & Propósito:</b> a origem, por que decidiu candidatar-se, a virada de mentora para candidata.</li>
          <li><b>Prova Social & Comunidade:</b> depoimentos e cases do Clube Estrelas e Além Espelho traduzidos como capacidade de liderança e mobilização real.</li>
          <li><b>Pautas Regionais:</b> turismo, meio ambiente/pesca (Praia do Ervino/São Francisco do Sul) e empreendedorismo local, conteúdo específico a validar com a candidata.</li>
          <li><b>Bastidores de Campanha:</b> agenda, eventos, aliança regional com outras lideranças do Novo em Joinville/litoral norte.</li>
          <li><b>Convocação:</b> presente apenas nas fases de Motivar e Mobilizar, comunidade de WhatsApp, compartilhamento, contagem regressiva, voto.</li>
        </ul>

        <h3>7. Canais e papel de cada um</h3>
        <ul>
          <li><b>Instagram:</b> canal principal de Sensibilização e Motivação, formato feed, stories e reels.</li>
          <li><b>Facebook:</b> replicação de conteúdo institucional, público mais próximo do eleitor de mais idade na região.</li>
          <li><b>Comunidade de WhatsApp:</b> substitui o funil de tráfego pago, é onde a Motivação vira lista qualificada e a Mobilização vira ação coordenada (compartilhar, levar gente para votar).</li>
          <li><b>Site oficial:</b> hub institucional, destino de todo link em bio e em peças de Motivação/Mobilização, reforça credibilidade para quem chega via indicação de terceiros.</li>
          <li><b>Horário eleitoral gratuito (rádio/TV):</b> fora do escopo contratado, mas a narrativa exibida ali deve espelhar o que já rodou nas redes, para reforço de mensagem, não fragmentação.</li>
        </ul>

        <h3>8. Entregáveis contratados integrados ao funil</h3>
        <table className="data-table">
          <tbody>
            <tr><td>Planejamento de conteúdos</td><td>Base para as 3 fases, é aqui que narrativa, pautas e bandeiras são fixadas antes de qualquer publicação.</td></tr>
            <tr><td>Site oficial</td><td>Lançar até o fim da semana 1 (Sensibilizar). Vira o hub para onde toda peça de Motivação e Mobilização direciona tráfego orgânico.</td></tr>
            <tr><td>Sessão de fotos com IA</td><td>Semana 1, padroniza identidade visual antes do primeiro post de apresentação.</td></tr>
            <tr><td>Sessão fotográfica profissional (Joinville)</td><td>Semanas 1 e 2, banco de imagem para site, materiais institucionais e horário eleitoral gratuito.</td></tr>
            <tr><td>Produção de vídeo (por vídeo)</td><td>Priorizar entregas nas fases de Motivar e Mobilizar, depoimentos, propostas e CTA de reta final valem mais em vídeo do que em imagem estática.</td></tr>
            <tr><td>Gestão de redes sociais</td><td>Contínua nas 3 fases, mas cadência e tom mudam conforme o calendário editorial.</td></tr>
          </tbody>
        </table>

        <h3>9. Aliança regional, oportunidade tática</h3>
        <p>A região de Joinville/litoral norte reúne, dentro do próprio Novo, uma prefeita em exercício (Rejane Gambin), um deputado estadual buscando reeleição (Matheus Cadorin) e outras pré-candidaturas relevantes (Neto Petters). Uma agenda de aparições conjuntas ou menções cruzadas nas redes, sem custo adicional de mídia, pode ampliar o alcance orgânico de Cris para além da sua base atual de 3 mil seguidores, emprestando capital de reputação de quem já tem eleitorado consolidado na região.</p>

        <h3>10. Gestão de risco e crise</h3>
        <ul>
          <li>Protocolo de resposta rápida definido antes do início do período eleitoral: quem aprova o quê, tempo máximo de resposta a crise (recomendado: 2h para reconhecimento público, 24h para posição formal).</li>
          <li>Evitar entrar em polêmicas nacionais/partidárias que não sejam pauta local, desvia atenção da narrativa de propósito e pautas regionais que são o diferencial da candidata.</li>
          <li>Toda promessa de campanha ("voz feminina", pautas regionais) precisa de lastro concreto antes de virar mensagem pública recorrente, para não ficar exposta a cobrança de adversários por falta de conteúdo.</li>
        </ul>

        <h3>11. Indicadores por fase</h3>
        <table className="data-table">
          <tbody>
            <tr><td><b>Sensibilizar</b></td><td>KPI principal: taxa de engajamento (comentário + salvamento) e crescimento líquido de seguidores. Mede se a história está gerando identificação real, não só alcance passivo.</td></tr>
            <tr><td><b>Motivar</b></td><td>KPI principal: entradas na comunidade de WhatsApp e cliques no site. Sem mídia paga, a lista de WhatsApp é o ativo que substitui o funil de tráfego pago.</td></tr>
            <tr><td><b>Mobilizar</b></td><td>KPI principal: compartilhamentos, alcance orgânico via stories de terceiros e presença em eventos. A reta final se ganha com coeficiente viral (boca a boca digital), não com novo público frio.</td></tr>
          </tbody>
        </table>

        <h3>12. Inputs necessários da candidata / próximos passos</h3>
        <ul>
          <li>Validação de 2 a 3 bandeiras/pautas concretas (regionais e estaduais) para sustentar a narrativa além do slogan.</li>
          <li>Agenda de compromissos presenciais confirmados para o período 16/08 a 02/10, para alimentar calendário editorial e produção de vídeo.</li>
          <li>Banco de depoimentos do Clube Estrelas/Além Espelho autorizados para uso como prova social na campanha.</li>
          <li>Autorização de uso de imagem para sessão de fotos com IA e definição de cenários prioritários.</li>
          <li>Confirmação de disponibilidade para captações de vídeo priorizadas nas fases de Motivar e Mobilizar (semanas 4 a 7).</li>
          <li>Alinhamento com lideranças regionais do Novo (Joinville/litoral norte) sobre possíveis ações conjuntas de comunicação.</li>
        </ul>
      </>
    ),
  },
];

export default function Documentos({ onOpenOriginalPlan }) {
  const [openId, setOpenId] = useState(null);
  const openDoc = DOCS.find((d) => d.id === openId);

  return (
    <>
      <div className="view-intro">Todos os documentos oficiais da campanha, na íntegra: anamnese política, perfil estratégico, master file, diagnóstico eleitoral e plano estratégico de comunicação. Clique em cada bloco para ver o conteúdo completo.</div>

      <div className="plan-block-grid">
        {DOCS.map((d) => (
          <div className="plan-block-card" key={d.id} onClick={() => setOpenId(d.id)}>
            <div className="pb-icon">{d.icon}</div>
            <h4>{d.title}</h4>
            <div className="pb-teaser">{d.teaser}</div>
            <div className="open-hint">Clique para abrir →</div>
          </div>
        ))}
        {onOpenOriginalPlan && (
          <div className="plan-block-card pb-outline" onClick={onOpenOriginalPlan}>
            <div className="pb-icon">📄</div>
            <h4>Plano Estratégico (PDF original)</h4>
            <div className="pb-teaser">Versão digitalizada do documento original em páginas</div>
            <div className="open-hint">Clique para abrir →</div>
          </div>
        )}
      </div>

      {openDoc && (
        <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) setOpenId(null); }}>
          <div className="modal plan-block-modal">
            <div className="pbm-head">
              <span className="pb-icon">{openDoc.icon}</span>
              <h3>{openDoc.title}</h3>
            </div>
            <div className="plan-prose">{openDoc.body}</div>
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
