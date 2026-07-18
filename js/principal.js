// Dados que a página usa enquanto está aberta.
const estado = {
  projetos: [],
  inscricoes: [],
  projetoSelecionado: null,
  carregando: true
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
  detalhes: document.querySelector("#detalhes-projeto")
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
  const projetosAbertos = estado.projetos.filter((projeto) => projeto.situacao !== "encerrado");
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
    "encerrado": 3
  };

  return estado.projetos
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
  elementos.aviso.textContent = filtrosAtivos.length
    ? `Filtros ativos: ${filtrosAtivos.join(" · ")} · ${projetosFiltrados.length} ${projetosFiltrados.length === 1 ? "resultado" : "resultados"}`
    : "Visão geral do semestre";
}

function limparFiltros() {
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
  estado.carregando = true;
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
  estado.carregando = false;
  bloquearFiltros(false);

  elementos.resumo.setAttribute("aria-busy", "false");
  elementos.lista.setAttribute("aria-busy", "false");
  elementos.detalhes.setAttribute("aria-busy", "false");
}

// Confere o básico antes de usar as informações do arquivo.
function validarDados(dados) {
  if (!dados || !Array.isArray(dados.projetos) || !Array.isArray(dados.inscricoes)) {
    throw new Error("O arquivo de dados está incompleto.");
  }

  const projetoInvalido = dados.projetos.some((projeto) => (
    projeto.id == null || !projeto.nome || !projeto.area || !projeto.totalVagas || !projeto.situacao
  ));

  const inscricaoInvalida = dados.inscricoes.some((inscricao) => (
    inscricao.id == null || inscricao.projetoId == null || !inscricao.nome
  ));

  if (projetoInvalido || inscricaoInvalida) {
    throw new Error("Existem projetos ou inscrições com informações faltando.");
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
      <h3>Não foi possível carregar os projetos</h3>
      <p>Confira a conexão ou o arquivo de dados e tente novamente.</p>
      <button class="botao-tentar" type="button" data-acao="tentar-novamente">Tentar novamente</button>
    </div>
  `;

  elementos.detalhes.innerHTML = `
    <p class="mensagem erro">Os detalhes ficarão disponíveis quando os dados forem carregados.</p>
  `;
}

async function carregarDados() {
  mostrarCarregamento();

  try {
    const resposta = await fetch("dados/projetos.json", { cache: "no-store" });

    if (!resposta.ok) {
      throw new Error("Não foi possível abrir o arquivo de dados.");
    }

    const dados = await resposta.json();
    validarDados(dados);
    estado.projetos = dados.projetos;
    estado.inscricoes = dados.inscricoes;
    estado.projetoSelecionado = null;

    encerrarCarregamento();
    mostrarResumo();
    preencherAreas();
    atualizarPainel();
  } catch (erro) {
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

carregarDados();
