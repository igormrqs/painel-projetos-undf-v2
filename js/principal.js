const ATRASO_CARREGAMENTO = 1200;

// Dados que a página usa enquanto está aberta.
const estado = {
  projetos: [],
  inscricoes: [],
  projetoSelecionado: null,
  demonstracao: "normal"
};

// Elementos que serão alterados várias vezes.
const elementos = {
  aviso: document.querySelector("#aviso"),
  resumo: document.querySelector("#resumo"),
  busca: document.querySelector("#busca"),
  area: document.querySelector("#area"),
  situacao: document.querySelector("#situacao"),
  limpar: document.querySelector("#limpar"),
  quantidade: document.querySelector("#quantidade"),
  lista: document.querySelector("#lista-projetos"),
  detalhes: document.querySelector("#detalhes-projeto"),
  barraDemonstracao: document.querySelector("#barra-demonstracao")
};

// Evita que algum texto do JSON seja interpretado como parte do HTML.
function protegerTexto(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Remove acentos e letras maiúsculas somente para facilitar a pesquisa.
function prepararPesquisa(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Mantém o carregamento visível por tempo suficiente para ser percebido.
function esperar(tempo) {
  return new Promise((resolver) => setTimeout(resolver, tempo));
}

async function completarTempoDeCarregamento(inicio) {
  const tempoRestante = Math.max(ATRASO_CARREGAMENTO - (Date.now() - inicio), 0);
  await esperar(tempoRestante);
}

function pegarInscritos(projetoId) {
  return estado.inscricoes.filter((inscricao) => inscricao.projetoId === projetoId);
}

function classeDaSituacao(situacao) {
  return situacao.replaceAll(" ", "-");
}

function formatarData(data) {
  const dataCompleta = new Date(`${data}T12:00:00`);
  return dataCompleta.toLocaleDateString("pt-BR");
}

function criarBarra(projeto) {
  const inscritos = pegarInscritos(projeto.id).length;
  const porcentagem = Math.min((inscritos / projeto.totalVagas) * 100, 100);

  return `
    <div
      class="barra"
      role="progressbar"
      aria-label="Ocupação das vagas"
      aria-valuemin="0"
      aria-valuemax="${projeto.totalVagas}"
      aria-valuenow="${inscritos}"
      aria-valuetext="${inscritos} de ${projeto.totalVagas} vagas ocupadas"
    >
      <div class="barra-preenchida" style="width: ${porcentagem}%"></div>
    </div>
  `;
}

function criarEtiqueta(situacao) {
  return `<span class="etiqueta ${classeDaSituacao(situacao)}">${protegerTexto(situacao)}</span>`;
}

// Calcula os números mostrados no começo da página.
function mostrarResumo() {
  const projetosAbertos = estado.projetos.filter((projeto) => projeto.situacao !== "projeto encerrado");
  const projetosComVagas = estado.projetos.filter((projeto) => projeto.situacao === "com vagas");

  const vagasLivres = projetosComVagas.reduce((total, projeto) => {
    const quantidadeInscritos = pegarInscritos(projeto.id).length;
    return total + Math.max(projeto.totalVagas - quantidadeInscritos, 0);
  }, 0);

  const cartoes = [
    { titulo: "Projetos abertos", valor: projetosAbertos.length, texto: "Ativos neste semestre" },
    { titulo: "Inscrições recebidas", valor: estado.inscricoes.length, texto: "Em todos os projetos" },
    { titulo: "Projetos com vagas", valor: projetosComVagas.length, texto: "Aceitando inscrições" },
    { titulo: "Vagas restantes", valor: vagasLivres, texto: "Ainda disponíveis" }
  ];

  elementos.resumo.innerHTML = cartoes.map((cartao) => `
    <article class="cartao-resumo">
      <span>${cartao.titulo}</span>
      <strong>${cartao.valor}</strong>
      <small>${cartao.texto}</small>
    </article>
  `).join("");
}

function preencherAreas() {
  const areas = [...new Set(estado.projetos.map((projeto) => projeto.area))].sort();

  elementos.area.innerHTML = '<option value="">Todas as áreas</option>';

  areas.forEach((area) => {
    const opcao = document.createElement("option");
    opcao.value = area;
    opcao.textContent = area;
    elementos.area.appendChild(opcao);
  });
}

// Retorna somente os projetos que combinam com os três filtros.
function filtrarProjetos() {
  const textoBuscado = prepararPesquisa(elementos.busca.value.trim());
  const ordemSituacoes = {
    "com vagas": 1,
    "vagas esgotadas": 2,
    "projeto encerrado": 3
  };

  const projetosFiltrados = estado.projetos
    .filter((projeto) => {
      const nomeCombina = prepararPesquisa(projeto.nome).includes(textoBuscado);
      const areaCombina = !elementos.area.value || projeto.area === elementos.area.value;
      const situacaoCombina = !elementos.situacao.value || projeto.situacao === elementos.situacao.value;

      return nomeCombina && areaCombina && situacaoCombina;
    })
    .sort((primeiro, segundo) => {
      const diferencaSituacao = ordemSituacoes[primeiro.situacao] - ordemSituacoes[segundo.situacao];

      if (diferencaSituacao !== 0) return diferencaSituacao;

      return primeiro.nome.localeCompare(segundo.nome, "pt-BR");
    });

  // Permite mostrar o estado vazio sem alterar os dados ou os filtros.
  return estado.demonstracao === "vazio" ? [] : projetosFiltrados;
}

function listarFiltrosAtivos() {
  const filtros = [];
  const busca = elementos.busca.value.trim();

  if (busca) filtros.push(`busca “${busca}”`);
  if (elementos.area.value) filtros.push(elementos.area.value);
  if (elementos.situacao.value) filtros.push(elementos.situacao.value);

  return filtros;
}

function mostrarProjetos() {
  const projetosFiltrados = filtrarProjetos();
  const palavraProjeto = projetosFiltrados.length === 1 ? "projeto" : "projetos";

  elementos.quantidade.textContent = `${projetosFiltrados.length} ${palavraProjeto}`;

  if (projetosFiltrados.length === 0) {
    elementos.lista.innerHTML = `
      <div class="mensagem vazio">
        <span class="icone-mensagem" aria-hidden="true">⌕</span>
        <h3>Nenhum projeto foi encontrado</h3>
        <p>Tente mudar o termo de busca ou limpar os filtros para ver a lista novamente.</p>
        <button class="botao-limpar" type="button" data-acao="limpar-filtros">Limpar filtros</button>
      </div>
    `;
    return;
  }

  elementos.lista.innerHTML = projetosFiltrados.map((projeto) => {
    const inscritos = pegarInscritos(projeto.id).length;
    const selecionado = projeto.id === estado.projetoSelecionado;

    return `
      <button
        class="projeto-item ${selecionado ? "selecionado" : ""}"
        type="button"
        data-projeto-id="${projeto.id}"
        aria-pressed="${selecionado}"
        aria-controls="detalhes-projeto"
      >
        <span>
          <span class="projeto-nome">${protegerTexto(projeto.nome)}</span>
          <span class="projeto-area">${protegerTexto(projeto.area)}</span>
        </span>
        ${criarEtiqueta(projeto.situacao)}
        <span class="projeto-vagas">
          <span class="vagas-numero">
            <strong>${inscritos}/${projeto.totalVagas}</strong>
            <span>inscritos</span>
          </span>
          ${criarBarra(projeto)}
        </span>
      </button>
    `;
  }).join("");
}

function mostrarDetalhes(projetoId) {
  const projeto = estado.projetos.find((item) => item.id === projetoId);

  if (!projeto) {
    elementos.detalhes.innerHTML = `
      <p class="mensagem">Selecione um projeto para ver mais informações.</p>
    `;
    return;
  }

  const inscritos = pegarInscritos(projeto.id);

  const listaInscritos = inscritos.length > 0
    ? inscritos.map((inscrito) => `
        <div class="inscrito">
          <div>
            <strong>${protegerTexto(inscrito.nome)}</strong>
            <span>${protegerTexto(inscrito.curso)}</span>
          </div>
          <div class="inscrito-data">
            <strong>${protegerTexto(inscrito.turno)}</strong>
            <span>${formatarData(inscrito.data)}</span>
          </div>
        </div>
      `).join("")
    : '<p class="mensagem">Este projeto ainda não possui inscritos.</p>';

  elementos.detalhes.innerHTML = `
    <article class="detalhes-projeto">
      <h3>${protegerTexto(projeto.nome)}</h3>
      <div class="detalhes-meta">
        ${criarEtiqueta(projeto.situacao)}
        <span>${protegerTexto(projeto.area)}</span>
      </div>

      <div class="ocupacao">
        <div class="ocupacao-topo">
          <span>Ocupação das vagas</span>
          <strong>${inscritos.length} de ${projeto.totalVagas}</strong>
        </div>
        ${criarBarra(projeto)}
      </div>

      <h4 class="subtitulo">Inscritos (${inscritos.length})</h4>
      <div class="lista-inscritos">${listaInscritos}</div>
    </article>
  `;
}

function atualizarPainel() {
  const projetosFiltrados = filtrarProjetos();
  const filtrosAtivos = listarFiltrosAtivos();

  // Se o projeto selecionado sumir com um filtro, seleciona o primeiro resultado.
  const selecionadoAindaAparece = projetosFiltrados.some(
    (projeto) => projeto.id === estado.projetoSelecionado
  );

  if (!selecionadoAindaAparece) {
    estado.projetoSelecionado = projetosFiltrados[0]?.id ?? null;
  }

  mostrarProjetos();
  mostrarDetalhes(estado.projetoSelecionado);

  elementos.limpar.hidden = filtrosAtivos.length === 0;
  if (estado.demonstracao === "vazio") {
    elementos.aviso.textContent = "Demonstração: nenhum resultado";
  } else {
    elementos.aviso.textContent = filtrosAtivos.length
      ? `Filtros ativos: ${filtrosAtivos.join(" · ")} · ${projetosFiltrados.length} ${projetosFiltrados.length === 1 ? "resultado" : "resultados"}`
      : "Visão geral do semestre";
  }
}

function limparFiltros() {
  if (estado.demonstracao === "vazio") {
    estado.demonstracao = "normal";
    atualizarBotoesDemonstracao();
  }

  elementos.busca.value = "";
  elementos.area.value = "";
  elementos.situacao.value = "";
  atualizarPainel();
  elementos.busca.focus();
}

function bloquearFiltros(bloqueado) {
  elementos.busca.disabled = bloqueado;
  elementos.area.disabled = bloqueado;
  elementos.situacao.disabled = bloqueado;
  elementos.limpar.disabled = bloqueado;
}

// Mostra formas simples no lugar do conteúdo enquanto o JSON é aberto.
function mostrarCarregamento() {
  bloquearFiltros(true);
  elementos.limpar.hidden = true;

  elementos.aviso.classList.remove("erro");
  elementos.aviso.textContent = "Carregando projetos e inscrições...";
  elementos.quantidade.textContent = "Carregando...";

  elementos.resumo.setAttribute("aria-busy", "true");
  elementos.lista.setAttribute("aria-busy", "true");
  elementos.detalhes.setAttribute("aria-busy", "true");

  elementos.resumo.innerHTML = Array.from({ length: 4 }, () => `
    <div class="cartao-resumo cartao-carregando" aria-hidden="true">
      <span class="skeleton skeleton-titulo"></span>
      <span class="skeleton skeleton-valor"></span>
      <span class="skeleton skeleton-texto"></span>
    </div>
  `).join("");

  elementos.lista.innerHTML = `
    <div class="lista-carregando" aria-hidden="true">
      ${'<span class="skeleton skeleton-linha"></span>'.repeat(6)}
    </div>
  `;

  elementos.detalhes.innerHTML = `
    <div class="detalhes-carregando" aria-hidden="true">
      <span class="skeleton skeleton-detalhe-titulo"></span>
      <span class="skeleton skeleton-detalhe-texto"></span>
      <span class="skeleton skeleton-detalhe-bloco"></span>
    </div>
  `;
}

function encerrarCarregamento() {
  bloquearFiltros(false);

  elementos.resumo.setAttribute("aria-busy", "false");
  elementos.lista.setAttribute("aria-busy", "false");
  elementos.detalhes.setAttribute("aria-busy", "false");
}

function textoPreenchido(valor) {
  return typeof valor === "string" && valor.trim() !== "";
}

function dataValida(data) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) return false;

  const [ano, mes, dia] = data.split("-").map(Number);
  const dataConferida = new Date(Date.UTC(ano, mes - 1, dia));

  return dataConferida.getUTCFullYear() === ano
    && dataConferida.getUTCMonth() === mes - 1
    && dataConferida.getUTCDate() === dia;
}

// Confere os campos e as relações antes de mostrar os dados.
function validarDados(dados) {
  if (!dados || !Array.isArray(dados.projetos) || !Array.isArray(dados.inscricoes)) {
    throw new Error("O arquivo de dados está incompleto.");
  }

  const situacoesPermitidas = ["com vagas", "vagas esgotadas", "projeto encerrado"];

  const projetoInvalido = dados.projetos.some((projeto) => (
    !Number.isInteger(projeto.id)
    || !textoPreenchido(projeto.nome)
    || !textoPreenchido(projeto.area)
    || !Number.isInteger(projeto.totalVagas)
    || projeto.totalVagas <= 0
    || !Number.isInteger(projeto.inscricoesRecebidas)
    || projeto.inscricoesRecebidas < 0
    || !situacoesPermitidas.includes(projeto.situacao)
  ));

  const inscricaoInvalida = dados.inscricoes.some((inscricao) => (
    !Number.isInteger(inscricao.id)
    || !Number.isInteger(inscricao.projetoId)
    || !textoPreenchido(inscricao.nome)
    || !textoPreenchido(inscricao.email)
    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inscricao.email)
    || !/^\(\d{2}\) 9\d{4}-\d{4}$/.test(inscricao.telefone)
    || !textoPreenchido(inscricao.curso)
    || !textoPreenchido(inscricao.turno)
    || !textoPreenchido(inscricao.data)
    || !dataValida(inscricao.data)
  ));

  if (projetoInvalido || inscricaoInvalida) {
    throw new Error("Existem projetos ou inscrições com informações faltando.");
  }

  const idsProjetos = dados.projetos.map((projeto) => projeto.id);
  const idsInscricoes = dados.inscricoes.map((inscricao) => inscricao.id);
  const emails = dados.inscricoes.map((inscricao) => inscricao.email);
  const telefones = dados.inscricoes.map((inscricao) => inscricao.telefone);

  const existeDuplicidade = new Set(idsProjetos).size !== idsProjetos.length
    || new Set(idsInscricoes).size !== idsInscricoes.length
    || new Set(emails).size !== emails.length
    || new Set(telefones).size !== telefones.length;

  if (existeDuplicidade) {
    throw new Error("Existem identificadores ou contatos repetidos.");
  }

  const inscricaoSemProjeto = dados.inscricoes.some(
    (inscricao) => !idsProjetos.includes(inscricao.projetoId)
  );

  if (inscricaoSemProjeto) {
    throw new Error("Existe uma inscrição sem projeto correspondente.");
  }

  const ocupacaoInvalida = dados.projetos.some((projeto) => {
    const quantidade = dados.inscricoes.filter(
      (inscricao) => inscricao.projetoId === projeto.id
    ).length;

    if (quantidade !== projeto.inscricoesRecebidas || quantidade > projeto.totalVagas) {
      return true;
    }

    if (projeto.situacao === "com vagas" && quantidade >= projeto.totalVagas) {
      return true;
    }

    return projeto.situacao === "vagas esgotadas" && quantidade !== projeto.totalVagas;
  });

  if (ocupacaoInvalida) {
    throw new Error("A quantidade de inscrições não combina com as vagas ou a situação.");
  }
}

function mostrarErroCarregamento() {
  bloquearFiltros(true);
  elementos.aviso.textContent = "Ocorreu um erro ao carregar os dados.";
  elementos.aviso.classList.add("erro");
  elementos.quantidade.textContent = "Dados indisponíveis";

  elementos.resumo.innerHTML = Array.from({ length: 4 }, () => `
    <article class="cartao-resumo">
      <span>Indisponível</span>
      <strong>--</strong>
      <small>Não foi possível calcular</small>
    </article>
  `).join("");

  elementos.lista.innerHTML = `
    <div class="mensagem erro" role="alert">
      <span class="icone-mensagem" aria-hidden="true">!</span>
      <h3>Não foi possível carregar os projetos</h3>
      <p>Confira a conexão ou o arquivo de dados e tente novamente.</p>
      <button class="botao-tentar" type="button" data-acao="tentar-novamente">Tentar novamente</button>
    </div>
  `;

  elementos.detalhes.innerHTML = `
    <p class="mensagem erro">Os detalhes ficarão disponíveis quando os dados forem carregados.</p>
  `;

  elementos.lista.querySelector("[data-acao='tentar-novamente']")?.focus();
}

// Marca o botão que representa o estado exibido no momento.
function atualizarBotoesDemonstracao() {
  const botoes = elementos.barraDemonstracao.querySelectorAll("[data-demonstracao]");

  botoes.forEach((botao) => {
    const selecionado = botao.dataset.demonstracao === estado.demonstracao;
    botao.setAttribute("aria-pressed", String(selecionado));
  });
}

function mudarDemonstracao(valor) {
  estado.demonstracao = valor;
  atualizarBotoesDemonstracao();

  if (valor === "carregando") {
    mostrarCarregamento();
    return;
  }

  if (valor === "erro") {
    encerrarCarregamento();
    mostrarErroCarregamento();
    return;
  }

  if (estado.projetos.length === 0) {
    carregarDados();
    return;
  }

  encerrarCarregamento();
  mostrarResumo();
  atualizarPainel();
}

async function carregarDados() {
  const inicioCarregamento = Date.now();
  mostrarCarregamento();

  try {
    const resposta = await fetch("dados/projetos.json", { cache: "no-store" });

    if (!resposta.ok) {
      throw new Error("Não foi possível abrir o arquivo de dados.");
    }

    const dados = await resposta.json();
    validarDados(dados);
    await completarTempoDeCarregamento(inicioCarregamento);

    // Evita que uma busca já iniciada troque o estado escolhido na barra.
    if (estado.demonstracao === "carregando" || estado.demonstracao === "erro") return;

    estado.projetos = dados.projetos;
    estado.inscricoes = dados.inscricoes;
    estado.projetoSelecionado = null;

    encerrarCarregamento();
    mostrarResumo();
    preencherAreas();
    atualizarPainel();
  } catch (erro) {
    await completarTempoDeCarregamento(inicioCarregamento);

    if (estado.demonstracao === "carregando") return;

    encerrarCarregamento();
    mostrarErroCarregamento();
  }
}

// Eventos dos filtros.
elementos.busca.addEventListener("input", atualizarPainel);
elementos.area.addEventListener("change", atualizarPainel);
elementos.situacao.addEventListener("change", atualizarPainel);
elementos.limpar.addEventListener("click", limparFiltros);

// Um único evento atende todos os botões da lista.
elementos.lista.addEventListener("click", (evento) => {
  const acao = evento.target.closest("[data-acao]");

  if (acao?.dataset.acao === "tentar-novamente") {
    estado.demonstracao = "normal";
    atualizarBotoesDemonstracao();
    carregarDados();
    return;
  }

  if (acao?.dataset.acao === "limpar-filtros") {
    limparFiltros();
    return;
  }

  const botao = evento.target.closest("[data-projeto-id]");

  if (!botao) return;

  const projetoId = Number(botao.dataset.projetoId);

  estado.projetoSelecionado = projetoId;
  mostrarProjetos();
  mostrarDetalhes(projetoId);

  // A lista é recriada, então o foco precisa voltar para o botão selecionado.
  const novoBotao = elementos.lista.querySelector(`[data-projeto-id="${projetoId}"]`);
  novoBotao?.focus();
});

elementos.barraDemonstracao.addEventListener("click", (evento) => {
  const botao = evento.target.closest("[data-demonstracao]");

  if (botao) mudarDemonstracao(botao.dataset.demonstracao);
});

atualizarBotoesDemonstracao();
carregarDados();
