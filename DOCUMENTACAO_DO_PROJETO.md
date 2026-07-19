# Documentação do projeto — Painel de Projetos da UnDF

Documento atualizado em **19 de julho de 2026**.

## 1. Visão geral

O projeto é um painel para consultar os projetos disponíveis no Laboratório de Inovação Digital da UnDF.

Pelo painel, a pessoa pode:

- acompanhar os principais números do semestre;
- pesquisar usando qualquer informação dos projetos ou das inscrições;
- filtrar por área e situação;
- verificar a ocupação das vagas;
- selecionar um projeto;
- consultar as pessoas inscritas;
- testar os estados de carregamento, lista vazia e erro.

O sistema foi feito como uma página estática. Os dados ficam em um arquivo JSON e são carregados pelo JavaScript quando a página é aberta.

## 2. Links do projeto

### Código no GitHub

- Repositório: [igormrqs/painel-projetos-undf-v2](https://github.com/igormrqs/painel-projetos-undf-v2)
- Branch principal: `main`
- A documentação acompanha a versão atual da branch `main`.

### Modelos no Figma

- [Wireframes atualizados](https://www.figma.com/design/DYymTrvRTokcZHcvXSeIKD/Problema-3---Painel-Institucional-UnDF---Wireframe-UX?node-id=29-2)
- [Alta fidelidade atualizada](https://www.figma.com/design/PZYaysxMxybv0QleqMj6Oo/Problema-3---Painel-Institucional-UnDF---Alta-Fidelidade?node-id=55-2)

Nos dois arquivos do Figma existe uma página principal com a versão atual do projeto.

## 3. Tecnologias utilizadas

- HTML para a estrutura da página;
- CSS para cores, espaçamento, responsividade e estados visuais;
- JavaScript para carregar os dados e controlar a interação;
- JSON para armazenar projetos e inscrições;
- Google Fonts com as fontes Inter e Sora;
- Git e GitHub para o histórico e armazenamento do código;
- Figma para wireframes e modelos de alta fidelidade.

O projeto não utiliza bibliotecas JavaScript, banco de dados ou processo de instalação.

## 4. Estrutura dos arquivos

```text
painel-projetos-undf-v2/
├── index.html
├── README.md
├── DOCUMENTACAO_DO_PROJETO.md
├── css/
│   └── estilo.css
├── js/
│   └── principal.js
└── dados/
    └── projetos.json
```

### `index.html`

Contém a estrutura principal:

- cabeçalho e logo da UnDF;
- título do painel;
- aviso sobre o estado atual;
- resumo dos números;
- campos de busca e filtros;
- painel com a lista de projetos;
- painel com os detalhes;
- rodapé;
- barra **Testar tela**.

### `css/estilo.css`

Controla:

- cores do projeto;
- tipografia;
- cartões e painéis;
- filtros e botões;
- etiquetas de situação;
- barras de ocupação;
- carregamento com skeleton;
- mensagens de lista vazia e erro;
- foco de teclado;
- visual para tablet e celular;
- barra fixa de demonstração.

### `js/principal.js`

É responsável por:

- carregar o arquivo JSON;
- validar os dados básicos;
- calcular o resumo;
- preencher as áreas disponíveis;
- pesquisar e filtrar projetos;
- organizar os projetos por situação e nome;
- selecionar um projeto;
- mostrar os inscritos;
- limpar filtros;
- mostrar carregamento e erro;
- controlar os botões da barra de demonstração;
- devolver o foco ao projeto selecionado durante a navegação por teclado.

### `dados/projetos.json`

Armazena os projetos e as inscrições usados na demonstração.

## 5. Dados atuais

O arquivo possui:

| Informação | Quantidade |
|---|---:|
| Projetos | 10 |
| Inscrições | 42 |
| Projetos com vagas | 5 |
| Projetos com vagas esgotadas | 3 |
| Projetos encerrados | 2 |
| Áreas diferentes | 8 |
| Vagas restantes exibidas no resumo | 23 |

Os projetos são ordenados nesta sequência:

1. com vagas;
2. vagas esgotadas;
3. projeto encerrado.

Dentro de cada situação, os nomes são organizados em ordem alfabética.

## 6. Partes da interface

### Cabeçalho

O cabeçalho apresenta:

- logo clean da UnDF;
- três losangos azuis;
- nome UnDF em Sora;
- texto Universidade do Distrito Federal;
- título Painel de Projetos;
- identificação do Laboratório de Inovação Digital.

### Resumo

O resumo possui quatro indicadores:

- projetos abertos;
- inscrições recebidas;
- projetos com vagas;
- vagas restantes.

No computador, os quatro indicadores aparecem lado a lado. No tablet, aparecem em duas colunas. No celular, ficam empilhados.

### Filtros

Existem três formas de filtrar:

- busca pelos dados dos projetos e das inscrições;
- seleção da área;
- seleção da situação.

O botão **Limpar** só aparece quando existe algum filtro ativo.

A busca consulta informações como nome, área, situação, curso, turno, contato e data. Ela também ignora diferenças entre letras maiúsculas, minúsculas e acentos.

### Lista de projetos

Cada projeto aparece como um cartão selecionável com:

- nome;
- área;
- situação escrita por extenso;
- total de inscritos e vagas;
- barra de ocupação.

O projeto selecionado recebe fundo azul-claro e borda azul.

### Detalhes

O painel de detalhes mostra:

- nome do projeto;
- situação;
- área;
- ocupação das vagas;
- nomes dos inscritos;
- curso;
- turno;
- data da inscrição.

## 7. Estados da página

### Normal

Mostra os dados, permite filtrar e selecionar projetos.

### Carregando

Mostra blocos cinza no lugar das informações enquanto o JSON é aberto. Esses blocos são chamados de skeletons.

### Filtro ativo com resultado

Mostra o texto dos filtros ativos, a quantidade de resultados e o botão para limpar.

### Sem resultados

Mostra:

- símbolo `⌕`;
- mensagem de nenhum projeto encontrado;
- orientação para alterar a busca;
- botão para limpar os filtros.

### Erro

Mostra:

- símbolo `!`;
- aviso de falha no carregamento;
- orientação para conferir o arquivo ou a conexão;
- botão **Tentar novamente**;
- indicadores marcados como indisponíveis.

## 8. Como testar o projeto

Como os dados são carregados por `fetch`, o projeto deve ser aberto com um servidor local.

No terminal, dentro da pasta do projeto, execute:

```powershell
python -m http.server 8000
```

Depois, abra:

```text
http://localhost:8000
```

### Testar os estados sem alterar o código

Use a barra **Testar tela**, localizada na parte inferior:

- **Normal**;
- **Carregando**;
- **Sem resultados**;
- **Erro**.

### Forçar um estado pelo código

No arquivo `js/principal.js`, a função principal para trocar o estado é:

```javascript
mudarDemonstracao("normal");
mudarDemonstracao("carregando");
mudarDemonstracao("vazio");
mudarDemonstracao("erro");
```

As funções relacionadas são:

- `mostrarCarregamento()`;
- `mostrarErroCarregamento()`;
- `atualizarPainel()`;
- `mudarDemonstracao()`.

## 9. Acessibilidade

O projeto possui:

- link **Pular para o conteúdo**;
- foco visível em botões, campos, seleções e projetos;
- navegação usando `Tab` e `Shift + Tab`;
- ativação dos botões com teclado;
- mensagens com `aria-live`;
- uso de `aria-busy` durante o carregamento;
- uso de `aria-pressed` nos projetos e botões de demonstração;
- barras com `role="progressbar"` e valores acessíveis;
- símbolos acompanhados de texto nos estados vazio e erro;
- símbolos de dia e noite acompanhados do nome do turno;
- situações escritas por extenso, sem depender apenas de cores;
- redução da animação quando o sistema utiliza `prefers-reduced-motion`.

## 10. Responsividade

### Computador

- quatro indicadores lado a lado;
- filtros na mesma linha;
- lista e detalhes em duas colunas.

### Tablet — até 900 px

- indicadores em duas colunas;
- busca ocupa uma linha completa;
- lista e detalhes ficam empilhados.

### Celular — até 600 px

- cabeçalho empilhado;
- indicadores em uma coluna;
- filtros um abaixo do outro;
- projetos reorganizados para telas estreitas;
- barra de demonstração com rolagem horizontal quando necessário.

## 11. Identidade visual

### Fontes

- Inter: textos gerais da página;
- Sora: nome UnDF na logo.

### Cores principais

| Uso | Cor |
|---|---|
| Azul principal | `#1769aa` |
| Azul escuro | `#124f82` |
| Azul claro | `#eaf4fc` |
| Fundo | `#f3f6f9` |
| Texto | `#243447` |
| Texto secundário | `#596a7c` |
| Bordas | `#dce4ec` |
| Verde | `#237a4b` |
| Amarelo | `#8a6000` |
| Vermelho | `#a83b35` |

As cores ficam no começo de `css/estilo.css`, dentro de `:root`.

## 12. Modelos do Figma

### Wireframes

O arquivo de wireframes apresenta a estrutura da experiência com menos detalhes visuais.

Ele contém versões de computador e celular para:

1. carregando;
2. com dados;
3. filtro ativo com resultado;
4. sem resultados;
5. erro.

Também possui notas sobre estrutura, responsividade e acessibilidade.

### Alta fidelidade

O arquivo de alta fidelidade representa o visual atual do projeto, incluindo:

- cores finais;
- tipografia;
- logo clean;
- cartões;
- etiquetas;
- barras de ocupação;
- mensagens com símbolos;
- barra Testar tela;
- versões desktop e mobile dos cinco estados.

O arquivo também possui um guia visual com as cores e os principais elementos utilizados.

## 13. Onde alterar cada parte

### Alterar cores

Abra `css/estilo.css` e procure o bloco `:root`, no começo do arquivo.

### Alterar textos fixos

Abra `index.html` para mudar:

- título da página;
- nome do laboratório;
- rótulos dos filtros;
- títulos dos painéis;
- rodapé;
- nomes dos botões da barra de demonstração.

### Alterar textos gerados pelo sistema

Abra `js/principal.js` para mudar:

- textos do resumo;
- avisos de filtros;
- mensagens de carregamento;
- mensagem de lista vazia;
- mensagem de erro;
- detalhes dos projetos.

### Alterar projetos e inscrições

Abra `dados/projetos.json`.

### Alterar carregamento, vazio ou erro

Abra `js/principal.js` e procure:

- `mostrarCarregamento`;
- `mostrarProjetos`;
- `mostrarErroCarregamento`;
- `mudarDemonstracao`.

### Alterar a logo

A estrutura está no bloco `.logo` de `index.html`. O desenho e os tamanhos estão nas classes `.logo`, `.logo-marca` e `.logo-nome` de `css/estilo.css`.

## 14. Histórico do Git

O desenvolvimento foi dividido em commits graduais:

| Commit | Data | Descrição |
|---|---|---|
| `96a3ab7` | 17/07/2026 | começa a estrutura do painel |
| `bf9801b` | 17/07/2026 | monta o visual da página |
| `ff3b61f` | 18/07/2026 | adiciona os projetos e inscritos |
| `cf24ac4` | 18/07/2026 | faz os filtros e detalhes funcionarem |
| `e8dbdb2` | 18/07/2026 | melhora o carregamento da página |
| `699fb58` | 18/07/2026 | permite tentar carregar novamente |
| `49aa20d` | 18/07/2026 | melhora os filtros sem resultado |
| `4bf69b8` | 18/07/2026 | organiza a ordem dos projetos |
| `61bae98` | 18/07/2026 | melhora a acessibilidade da página |
| `a1da4cc` | 18/07/2026 | adiciona opções para testar a tela |
| `d18b542` | 18/07/2026 | melhora a logo no cabeçalho |
| `ae8ff12` | 18/07/2026 | adiciona símbolos nas mensagens |
| `72af1ba` | 18/07/2026 | atualiza as instruções do projeto |

## 15. Limites atuais

O projeto é uma demonstração local. Atualmente ele não possui:

- tela de login;
- banco de dados;
- cadastro real de projetos;
- envio de inscrições;
- painel administrativo;
- servidor próprio;
- alteração permanente dos dados pelo navegador.

As informações mudam quando o arquivo `dados/projetos.json` é editado.

## 16. Roteiro curto para apresentação

1. Explicar que o painel reúne projetos e inscrições do laboratório.
2. Mostrar os quatro números do resumo.
3. Pesquisar um projeto.
4. Aplicar os filtros de área e situação.
5. Selecionar um cartão e mostrar os detalhes.
6. Explicar as etiquetas e barras de ocupação.
7. Usar a barra Testar tela para mostrar carregamento, lista vazia e erro.
8. Demonstrar a navegação por teclado.
9. Mostrar os wireframes e a alta fidelidade no Figma.
10. Mostrar o histórico gradual de commits no GitHub.

## 17. Comandos úteis do Git

Ver o estado atual:

```powershell
git status
```

Ver o histórico resumido:

```powershell
git log --oneline
```

Baixar atualizações:

```powershell
git pull
```

Enviar commits:

```powershell
git push
```

Clonar o repositório em outro computador:

```powershell
git clone https://github.com/igormrqs/painel-projetos-undf-v2.git
```

## 18. Especificação de design UX

### 18.1 Usuária e problema

A persona usada no projeto é uma representação fictícia da coordenadora do Laboratório de Inovação Digital.

**Renata, coordenadora do laboratório**, acompanha os projetos do semestre e precisa responder estudantes e professores com rapidez. Ela costuma trabalhar no computador da universidade, mas também consulta informações pelo celular quando está fora da sala.

Antes de abrir o painel, ela normalmente:

1. recebe uma pergunta sobre um projeto ou candidato;
2. abre uma planilha com várias linhas;
3. procura o nome do projeto;
4. aplica filtros manualmente;
5. conta inscrições e compara o total com as vagas;
6. abre outras linhas para encontrar os dados dos estudantes.

Esse processo pode falhar porque a planilha exige muitas etapas, permite contagens incorretas e não destaca rapidamente os projetos com vagas. Como consequência, a coordenadora pode demorar para responder, deixar candidatos sem retorno ou perceber uma vaga disponível tarde demais.

Depois de consultar o painel, a expectativa é que ela consiga:

- entender a situação geral em poucos segundos;
- encontrar um projeto pelo nome;
- combinar filtros sem fazer contas manuais;
- verificar ocupação e situação;
- consultar os inscritos do projeto selecionado;
- saber o que fazer quando os dados não aparecem.

Essas necessidades definiram as prioridades da interface: resumo primeiro, filtros logo abaixo, projetos em seguida e detalhes sob demanda.

### 18.2 Arquitetura da Informação

```text
Painel de Projetos
├── Cabeçalho
│   ├── identificação da UnDF
│   └── identificação do laboratório
├── Estado atual da página
├── Resumo do semestre
│   ├── projetos abertos
│   ├── inscrições recebidas
│   ├── projetos com vagas
│   └── vagas restantes
├── Filtros
│   ├── busca por projetos e inscrições
│   ├── área
│   ├── situação
│   └── limpar filtros
├── Lista de projetos
│   └── nome, área, situação e ocupação
└── Detalhes do projeto selecionado
    ├── identificação e situação
    ├── ocupação das vagas
    └── estudantes inscritos
```

#### Hierarquia das informações

| Nível | Informações | Justificativa |
|---|---|---|
| Visível ao abrir | estado da página, quatro indicadores, filtros e projetos | responde rapidamente à situação geral do laboratório |
| Visível, mas secundário | área, situação e ocupação de cada projeto | ajuda a comparar projetos sem abrir todos os detalhes |
| Visível sob demanda | lista de inscritos, curso, turno e data | só é necessária depois que a coordenadora escolhe um projeto |

#### Relações entre os dados

- um projeto pode possuir várias inscrições;
- cada inscrição pertence a um único projeto pelo campo `projetoId`;
- a área permite agrupar projetos por tema;
- a situação indica se o projeto ainda aceita inscrições;
- a ocupação compara inscrições recebidas com vagas totais;
- os indicadores são calculados a partir de todos os projetos e inscrições;
- `inscricoesRecebidas` registra a contagem no projeto e é conferido com a lista de inscrições.

#### Estados da interface

| Estado | O que aparece | O que a usuária pode fazer |
|---|---|---|
| Carregando | aviso, skeletons e filtros desativados | aguardar a chegada dos dados |
| Com dados | indicadores, filtros, projetos e detalhes | buscar, filtrar e selecionar um projeto |
| Filtro com resultado | filtros ativos e quantidade encontrada | consultar os resultados ou limpar os filtros |
| Filtro sem resultado | símbolo, explicação e botão de limpeza | mudar a busca ou limpar os filtros |
| Erro | indicadores indisponíveis, explicação e nova tentativa | conferir a conexão e tentar novamente |

### 18.3 Decisões de design

| Decisão | Motivo e problema atendido | Usabilidade, acessibilidade e responsividade |
|---|---|---|
| Quatro indicadores no começo | evita contagens manuais e apresenta a situação geral | textos curtos; reorganização em duas ou uma coluna |
| Filtros próximos da lista | diminui o caminho entre a busca e o resultado | labels visíveis e controles nativos de formulário |
| Projeto inteiro como botão | aumenta a área de clique e deixa a seleção clara | funciona com teclado e possui `aria-pressed` |
| Situação escrita por extenso | evita depender somente da cor | melhora a leitura para pessoas com dificuldade de distinguir cores |
| Barra de ocupação com números | permite comparar rapidamente vagas e inscrições | possui texto e atributos de progressbar para leitores de tela |
| Detalhes separados da lista | mantém o resumo dos projetos limpo | no celular, os detalhes passam para baixo da lista |
| Skeleton no carregamento | mostra que o sistema está funcionando | possui `aria-busy` e respeita redução de movimento |
| Mensagens com símbolo e texto | diferencia vazio e erro sem depender apenas da cor | símbolos decorativos ficam ocultos de leitores de tela |
| Cores no `:root` | facilita mudanças de identidade visual | uma alteração central atualiza toda a página |

### 18.4 Estrutura dos dados

O arquivo `dados/projetos.json` possui dois conjuntos: `projetos` e `inscricoes`.

#### Campos de projeto

| Campo | Tipo | Uso |
|---|---|---|
| `id` | número inteiro | identifica o projeto e cria a relação com as inscrições |
| `nome` | texto | nome apresentado na lista e consultado pela busca |
| `area` | texto | preenche o filtro de área |
| `totalVagas` | número inteiro | informa o limite de vagas |
| `inscricoesRecebidas` | número inteiro | registra a quantidade de inscrições do projeto |
| `situacao` | texto padronizado | aceita `com vagas`, `vagas esgotadas` ou `projeto encerrado` |

#### Campos de inscrição

| Campo | Tipo | Uso |
|---|---|---|
| `id` | número inteiro | identifica a inscrição |
| `projetoId` | número inteiro | relaciona a inscrição ao projeto |
| `nome` | texto | identifica a pessoa inscrita |
| `email` | texto | contato fictício armazenado no mock |
| `telefone` | texto | contato fictício no formato `(61) 90000-0000` |
| `curso` | texto | curso apresentado nos detalhes |
| `turno` | texto | turno apresentado nos detalhes com símbolo de dia ou noite |
| `data` | texto no formato `AAAA-MM-DD` | data de cadastro |

Os contatos usam `example.com` e números de demonstração. Eles não representam pessoas reais.

Todos os campos dos projetos e das inscrições participam da busca. Quando uma informação de uma pessoa inscrita corresponde ao termo digitado, o painel mostra o projeto relacionado a ela.

A lista exibida na tela é criada a partir do JSON. Por isso, um novo projeto pode ser acrescentado sem criar um novo bloco no HTML ou alterar a estrutura do JavaScript. A validação também confere campos, tipos, IDs, contatos repetidos, datas, relações, vagas e situação.

## 19. Teste de usabilidade

### 19.1 Objetivo

O teste deve verificar se uma pessoa que não participou do projeto consegue entender os indicadores, encontrar um projeto e consultar seus inscritos sem receber orientação durante a tarefa.

### 19.2 Situação atual

Os resultados ainda precisam ser coletados com duas pessoas fora do grupo. Nenhum tempo, conclusão ou dificuldade foi preenchido antecipadamente.

### 19.3 Participantes

Para preservar a identidade, usar somente os códigos **P1** e **P2**.

| Participante | Relação com o grupo | Curso ou contexto | Familiaridade com painéis |
|---|---|---|---|
| P1 | preencher após o convite | preencher | preencher |
| P2 | preencher após o convite | preencher | preencher |

### 19.4 Ambiente

Registrar antes do teste:

- data e horário;
- presencial ou remoto;
- computador ou celular;
- tamanho aproximado da tela;
- sistema operacional;
- navegador e versão;
- existência de zoom ou recurso de acessibilidade ativo.

### 19.5 Tarefas

**Tarefa 1:** encontre os projetos da área Ciência da Computação que ainda possuem vagas e diga quantos projetos aparecem.

**Tarefa 2:** abra o projeto **Acessibilidade digital aplicada** e informe o curso, turno e data de cadastro da primeira pessoa inscrita.

As tarefas devem ser aplicadas para P1 e P2 sem indicar onde clicar.

### 19.6 Registro dos resultados

| Participante | Tarefa | Tempo | Concluiu? | Principal ponto de atrito | Observações |
|---|---|---:|---|---|---|
| P1 | 1 | preencher | preencher | preencher | preencher |
| P1 | 2 | preencher | preencher | preencher | preencher |
| P2 | 1 | preencher | preencher | preencher | preencher |
| P2 | 2 | preencher | preencher | preencher | preencher |

### 19.7 Síntese após o teste

Depois dos quatro registros, preencher:

- quantas tarefas foram concluídas;
- tempo médio de cada tarefa;
- dificuldade que apareceu mais vezes;
- diferença entre computador e celular, se houver;
- melhoria recomendada;
- alteração feita no projeto ou justificativa para não alterar.

## 20. Situação do GitHub e do deploy

Na revisão feita em 19 de julho de 2026:

- a branch principal era `main`;
- o código local e remoto estavam no commit `72af1ba`;
- o repositório ainda estava privado;
- ainda não existia Pull Request;
- ainda não existia aprovação de outro integrante;
- o GitHub Pages ainda não estava configurado.

Esses itens devem ser atualizados nesta documentação depois que as etapas forem realmente concluídas. Não devem ser marcados como prontos antes de existir evidência no GitHub.

## 21. Roteiro de apresentação — até 10 minutos

| Tempo | Parte |
|---:|---|
| 0:00–0:50 | problema atual e persona da coordenadora |
| 0:50–1:35 | arquitetura da informação e prioridades |
| 1:35–2:10 | wireframes, alta fidelidade e decisões visuais |
| 2:10–3:20 | estado normal e indicadores |
| 3:20–4:30 | busca, filtros combinados e limpeza |
| 4:30–5:20 | seleção do projeto e consulta aos inscritos |
| 5:20–6:30 | carregamento, sem resultados e erro real |
| 6:30–7:15 | tentativa de recuperação |
| 7:15–8:00 | responsividade e acessibilidade |
| 8:00–8:45 | resultados do teste de usabilidade |
| 8:45–9:30 | GitHub, Pull Request e deploy |
| 9:30–10:00 | encerramento e margem para perguntas |

## 22. Mudanças simples durante a apresentação

- mudar uma cor: bloco `:root` de `css/estilo.css`;
- mudar um texto fixo: `index.html`;
- mudar uma mensagem de estado: `js/principal.js`;
- adicionar um projeto: lista `projetos` de `dados/projetos.json`;
- alterar vagas: campo `totalVagas` do projeto;
- alterar a ordem: objeto `ordemSituacoes` de `filtrarProjetos()`;
- alterar o erro: função `mostrarErroCarregamento()`.

## 23. Checklist final

- [ ] preencher os resultados reais do teste de usabilidade;
- [ ] revisar o site somente com teclado;
- [ ] testar zoom de 200%;
- [ ] conferir o carregamento por pelo menos um segundo;
- [ ] simular falha real e recuperação;
- [ ] revisar as telas de 320 px a 1440 px;
- [ ] tornar o repositório público;
- [ ] criar Pull Request;
- [ ] obter revisão e aprovação de outro integrante;
- [ ] fazer o merge;
- [ ] configurar o GitHub Pages;
- [ ] registrar a URL pública no README e neste documento;
- [ ] abrir o deploy em janela anônima;
- [ ] ensaiar a apresentação em até 10 minutos.
