# Painel de projetos da UnDF

Este projeto apresenta os projetos disponíveis no Laboratório de Inovação Digital da UnDF. Os dados são lidos de um arquivo JSON e exibidos em um painel simples para consulta.

## O que é possível fazer

- ver um resumo das vagas e inscrições;
- pesquisar um projeto pelo nome;
- filtrar os projetos por área e situação;
- acompanhar a ocupação das vagas;
- selecionar um projeto para ver seus inscritos;
- testar os estados de carregamento, lista vazia e erro.

## Como abrir

Como os dados são lidos de um arquivo JSON, é preciso usar um servidor local.

No terminal, entre na pasta do projeto e execute:

```powershell
python -m http.server 8000
```

Depois, abra `http://localhost:8000` no navegador.

## Testando os estados da tela

Na parte inferior da página existe uma barra chamada **Testar tela**. Ela permite mostrar quatro situações sem alterar o arquivo de dados:

- **Normal:** mostra os projetos e permite usar os filtros;
- **Carregando:** mantém os cartões de carregamento visíveis;
- **Sem resultados:** mostra a mensagem usada quando nenhum projeto é encontrado;
- **Erro:** mostra a mensagem de falha e o botão para tentar novamente.

Essa barra ajuda durante a apresentação e também facilita a conferência de cada estado da página.

## Acessibilidade

O painel possui alguns cuidados para facilitar a navegação:

- link para pular direto ao conteúdo usando o teclado;
- destaque visível no elemento que está com foco;
- textos que informam mudanças nos filtros e no carregamento;
- barras de ocupação identificadas para leitores de tela;
- símbolos acompanhados de texto nos estados vazio e de erro;
- animação de carregamento desativada quando o sistema pede menos movimento.

## Organização das pastas

```text
painel-projetos-undf-v2/
├── index.html
├── css/
│   └── estilo.css
├── js/
│   └── principal.js
└── dados/
    └── projetos.json
```

## Tecnologias usadas

- HTML;
- CSS;
- JavaScript;
- JSON para armazenar os projetos e as inscrições.

O projeto não precisa de bibliotecas ou instalações adicionais.
