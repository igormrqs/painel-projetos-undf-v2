# Documentação — Painel de Projetos da UnDF

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
├── DOCUMENTACAO.md
├── css/
│   └── estilo.css
├── js/
│   └── principal.js
├── dados/
│   └── projetos.json
└── documentacao/
    └── relatorio_teste_usabilidade.pdf
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

O cabeçalho reúne:

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

O arquivo de wireframes mostra a estrutura da experiência com menos detalhes visuais.

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

## 16. Comandos úteis do Git

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

## 17. Especificação de design UX

### 17.1 Usuária e problema

A construção abaixo segue a ideia de persona comportamental descrita por [Nielsen (2013)](https://ixdf.org/literature/book/the-encyclopedia-of-human-computer-interaction-2nd-ed/personas). O nome serve apenas para tornar a usuária fácil de lembrar; as decisões de design vêm de seu comportamento, contexto, necessidades e relação com a tecnologia.

#### Base dos dados e situação da persona

**Renata é uma persona provisória.** Ela foi criada a partir do problema proposto, do fluxo atual com planilhas e das informações que o painel precisa exibir. Esses dados permitem formar uma hipótese de uso, mas ainda não substituem uma entrevista ou observação de uma coordenadora real.

O teste de usabilidade com Angela e Marcos ajudou a identificar problemas de entendimento da interface, como a abrangência da busca e a localização do turno. Como nenhum dos dois exerce a função de coordenador, esse teste melhora a tela, mas não valida sozinho o comportamento atribuído a Renata.

#### Persona provisória: Renata

**Papel e contexto:** Renata coordena o Laboratório de Inovação Digital, acompanha projetos do semestre e responde dúvidas de estudantes e professores. Trabalha principalmente no computador da universidade e pode consultar informações pelo celular quando está fora da sala.

**Comportamento:** ela recebe uma pergunta, abre a planilha conhecida, procura o projeto, aplica filtros, confere as inscrições e compara o total com as vagas. Antes de responder, costuma revisar os números para evitar passar uma informação errada.

**Características relevantes:** Renata é organizada e cuidadosa. Prefere processos previsíveis e mantém a planilha porque já conhece sua estrutura, mesmo percebendo que a consulta é lenta. Não precisa de muitos recursos de edição; precisa encontrar uma resposta confiável com poucas etapas.

**Histórico de trabalho:** ela conhece o funcionamento acadêmico dos projetos e sabe interpretar situação, vagas e inscrições. Sua dificuldade não está no conteúdo, mas em localizar e cruzar rapidamente informações espalhadas em muitas linhas.

**Emoções e relação com a tecnologia:** a planilha transmite familiaridade e sensação de controle, mas gera frustração quando uma resposta simples exige filtros, contagens e conferências. Renata tende a aceitar o painel se ele mostrar dados claros, explicar falhas e permitir que ela confirme a informação antes de responder.

#### Situação de uso

Pouco antes de uma reunião, Renata recebe a mensagem de um estudante perguntando se sua inscrição foi registrada e se o projeto ainda possui vagas. Ela tem poucos minutos para responder, está dividindo a atenção com outra atividade e precisa evitar consultar a linha errada ou informar uma contagem desatualizada.

No processo anterior, ela abre a planilha, procura o projeto, aplica filtros, conta inscrições e percorre outras linhas para localizar o estudante. O processo pode falhar quando o filtro permanece ativo, a contagem é feita na coluna errada ou os dados da pessoa ficam longe das informações do projeto.

#### Cenário de uso do painel

1. Renata abre o painel e confirma nos indicadores a situação geral do semestre.
2. Digita na busca uma informação que possui, como nome do projeto, nome do estudante, curso ou contato.
3. Usa área e situação quando precisa reduzir os resultados.
4. Seleciona o projeto e confere ocupação, situação e lista de inscritos.
5. Verifica curso, turno e data antes de responder ao estudante.
6. Se os dados não carregarem ou não houver resultado, lê a orientação exibida e decide se deve tentar novamente ou alterar a busca.

#### Decisões de design apoiadas pela persona

| Necessidade observada na hipótese | Decisão adotada no painel |
|---|---|
| entender a situação sem abrir várias planilhas | indicadores gerais aparecem primeiro |
| localizar dados mesmo quando a pergunta chega incompleta | busca consulta atributos de projetos e inscrições |
| reduzir resultados sem fazer contagens manuais | filtros de área e situação ficam próximos da lista |
| confirmar antes de responder | projeto e inscritos aparecem juntos, com detalhes sob demanda |
| perceber vagas e turnos rapidamente | situação e turno usam símbolo acompanhado de texto |
| confiar no comportamento da página | carregamento, ausência de resultados e erro possuem mensagens próprias |

#### Validação e atualização

Para validar a persona, o próximo passo é conversar com pelo menos uma coordenadora real e observar uma consulta comum. A validação deve confirmar de onde chegam as perguntas, quais dados ela possui no início, quanto tempo tem para responder, onde o processo com planilha falha e o que faz uma ferramenta parecer confiável.

Se esses dados contradisserem algum ponto, a persona e as prioridades da interface devem ser atualizadas. Assim, Renata permanece um instrumento de decisão, não uma biografia definitiva.

### 17.2 Arquitetura da Informação

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

### 17.3 Decisões de design

| Decisão | Motivo e problema atendido | Usabilidade, acessibilidade e responsividade |
|---|---|---|
| Quatro indicadores no começo | evita contagens manuais e mostra a situação geral | textos curtos; reorganização em duas ou uma coluna |
| Filtros próximos da lista | diminui o caminho entre a busca e o resultado | labels visíveis e controles nativos de formulário |
| Projeto inteiro como botão | aumenta a área de clique e deixa a seleção clara | funciona com teclado e possui `aria-pressed` |
| Situação escrita por extenso | evita depender somente da cor | melhora a leitura para pessoas com dificuldade de distinguir cores |
| Barra de ocupação com números | permite comparar rapidamente vagas e inscrições | possui texto e atributos de progressbar para leitores de tela |
| Detalhes separados da lista | mantém o resumo dos projetos limpo | no celular, os detalhes passam para baixo da lista |
| Skeleton no carregamento | mostra que o sistema está funcionando | possui `aria-busy` e respeita redução de movimento |
| Mensagens com símbolo e texto | diferencia vazio e erro sem depender apenas da cor | símbolos decorativos ficam ocultos de leitores de tela |
| Cores no `:root` | facilita mudanças de identidade visual | uma alteração central atualiza toda a página |

### 17.4 Estrutura dos dados

O arquivo `dados/projetos.json` possui dois conjuntos: `projetos` e `inscricoes`.

#### Campos de projeto

| Campo | Tipo | Uso |
|---|---|---|
| `id` | número inteiro | identifica o projeto e cria a relação com as inscrições |
| `nome` | texto | nome exibido na lista e consultado pela busca |
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
| `curso` | texto | curso exibido nos detalhes |
| `turno` | texto | turno exibido nos detalhes com símbolo de dia ou noite |
| `data` | texto no formato `AAAA-MM-DD` | data de cadastro |

Os contatos usam `example.com` e números de demonstração. Eles não representam pessoas reais.

Todos os campos dos projetos e das inscrições participam da busca. Quando uma informação de uma pessoa inscrita corresponde ao termo digitado, o painel mostra o projeto relacionado a ela.

A lista exibida na tela é criada a partir do JSON. Por isso, um novo projeto pode ser acrescentado sem criar um novo bloco no HTML ou alterar a estrutura do JavaScript. A validação também confere campos, tipos, IDs, contatos repetidos, datas, relações, vagas e situação.

## 18. Teste de usabilidade

O registro completo está no arquivo [Relatório de Teste de Usabilidade](documentacao/relatorio_teste_usabilidade.pdf).

### 18.1 Objetivo

O teste verificou se pessoas que não participaram do projeto conseguiam entender os indicadores, encontrar projetos e consultar os dados das inscrições sem receber orientação sobre onde clicar.

### 18.2 Participantes

Participaram Angela e Marcos, que não fizeram parte do desenvolvimento e não conheciam previamente o painel.

- Angela possui pouca familiaridade com tecnologia, usa principalmente o celular e utiliza o computador ocasionalmente no trabalho;
- Marcos possui muita familiaridade com computadores e sistemas digitais;
- nenhum dos dois possui conhecimento específico sobre gestão de projetos ou inscrições acadêmicas.

Os participantes foram escolhidos por estarem fora da equipe e possuírem níveis diferentes de familiaridade tecnológica.

### 18.3 Procedimento

Cada participante realizou duas tarefas com limite de 2 minutos. A contagem começou depois da leitura da tarefa e terminou quando todas as respostas foram informadas.

Angela utilizou um notebook com o navegador Chrome. Marcos utilizou um computador desktop com o navegador Brave. Durante as tarefas, eles falaram em voz alta e não receberam orientação sobre onde clicar.

### 18.4 Tarefas

**Tarefa 1:** informar quantos projetos estavam abertos e quantas inscrições foram recebidas. Depois, encontrar um projeto da área de Ciência da Computação com vagas e informar seu nome e a quantidade de vagas restantes.

**Tarefa 2:** localizar o projeto **Laboratório de narrativas públicas** e informar o nome, o curso, o turno e a data de cadastro de uma pessoa inscrita.

### 18.5 Resultados

| Participante | Tarefa | Tempo | Resultado | Principal observação |
|---|---:|---:|---|---|
| Angela | 1 | 43 s | concluiu | tentou pesquisar pela área e teve dúvida sobre a abrangência da busca |
| Angela | 2 | 50 s | concluiu | demorou para localizar a informação de turno |
| Marcos | 1 | 13 s | concluiu | realizou a tarefa sem dificuldade |
| Marcos | 2 | 15 s | concluiu | realizou a tarefa sem hesitação e sugeriu uma versão escura |

### 18.6 Síntese e mudanças realizadas

As quatro tarefas foram concluídas dentro do tempo máximo, resultando em uma taxa de conclusão de 100%. O tempo médio geral foi de 30,25 segundos por tarefa.

As observações levaram a duas mudanças no projeto:

- a busca passou a consultar diferentes atributos dos projetos e das inscrições;
- o turno recebeu um símbolo de dia ou noite acompanhado do texto correspondente.

A sugestão de uma versão escura foi registrada como uma possível melhoria futura.

## 19. Situação do GitHub e do deploy

Na revisão final feita em 20 de julho de 2026:

- a branch principal é `main`;
- o [repositório no GitHub](https://github.com/igormrqs/painel-projetos-undf-v2) está público;
- a Pull Request nº 1 foi criada por outro integrante, aprovada e mesclada;
- o GitHub Pages está configurado a partir da branch `main`;
- o [site publicado](https://igormrqs.github.io/painel-projetos-undf-v2/) abre normalmente sem exigir login.

Também foram conferidos o carregamento, o estado de erro com nova tentativa, o uso em telas menores e a ordem dos controles acessíveis pelo teclado.
