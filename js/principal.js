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
    <div class="barra" aria-label="${inscritos} de ${projeto.totalVagas} vagas ocupadas">
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

  return estado.projetos.filter((projeto) => {
    const nomeCombina = prepararPesquisa(projeto.nome).includes(textoBuscado);
    const areaCombina = !elementos.area.value || projeto.area === elementos.area.value;
    const situacaoCombina = !elementos.situacao.value || projeto.situacao === elementos.situacao.value;

    return nomeCombina && areaCombina && situacaoCombina;
  });
}

function mostrarProjetos() {
  const projetosFiltrados = filtrarProjetos();
  const palavraProjeto = projetosFiltrados.length === 1 ? "projeto" : "projetos";

  elementos.quantidade.textContent = `${projetosFiltrados.length} ${palavraProjeto}`;

  if (projetosFiltrados.length === 0) {
    elementos.lista.innerHTML = `
      <p class="mensagem">Nenhum projeto foi encontrado. Tente mudar ou limpar os filtros.</p>
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

  // Se o projeto selecionado sumir com um filtro, seleciona o primeiro resultado.
  const selecionadoAindaAparece = projetosFiltrados.some(
    (projeto) => projeto.id === estado.projetoSelecionado
  );

  if (!selecionadoAindaAparece) {
    estado.projetoSelecionado = projetosFiltrados[0]?.id ?? null;
  }

  mostrarProjetos();
  mostrarDetalhes(estado.projetoSelecionado);

  const temFiltro = elementos.busca.value || elementos.area.value || elementos.situacao.value;
  elementos.aviso.textContent = temFiltro ? "A lista está mostrando os filtros escolhidos." : "Visão geral do semestre";
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

async function carregarDados() {
  mostrarCarregamento();

  try {
    const resposta = await fetch("dados/projetos.json");

    if (!resposta.ok) {
      throw new Error("Não foi possível abrir o arquivo de dados.");
    }

    const dados = await resposta.json();
    estado.projetos = dados.projetos;
    estado.inscricoes = dados.inscricoes;
    estado.projetoSelecionado = estado.projetos[0]?.id ?? null;

    encerrarCarregamento();
    mostrarResumo();
    preencherAreas();
    atualizarPainel();
  } catch (erro) {
    encerrarCarregamento();
    elementos.aviso.textContent = "Ocorreu um erro ao carregar os dados.";
    elementos.aviso.classList.add("erro");
    elementos.resumo.innerHTML = "";
    elementos.quantidade.textContent = "";
    elementos.lista.innerHTML = `
      <p class="mensagem erro">Confira se o projeto foi aberto com um servidor local e tente novamente.</p>
    `;
    elementos.detalhes.innerHTML = `
      <p class="mensagem erro">Os detalhes não puderam ser carregados.</p>
    `;
  }
}

// Eventos dos filtros.
elementos.busca.addEventListener("input", atualizarPainel);
elementos.area.addEventListener("change", atualizarPainel);
elementos.situacao.addEventListener("change", atualizarPainel);
elementos.limpar.addEventListener("click", limparFiltros);

// Um único evento atende todos os botões da lista.
elementos.lista.addEventListener("click", (evento) => {
  const botao = evento.target.closest("[data-projeto-id]");

  if (!botao) return;

  estado.projetoSelecionado = Number(botao.dataset.projetoId);
  mostrarProjetos();
  mostrarDetalhes(estado.projetoSelecionado);
});

carregarDados();
