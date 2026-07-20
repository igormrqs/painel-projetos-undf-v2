# Painel de projetos da UnDF

Este projeto apresenta os projetos disponíveis no Laboratório de Inovação Digital da UnDF. Os dados são lidos de um arquivo JSON e exibidos em um painel simples para consulta.

Os nomes, e-mails e telefones usados na demonstração são fictícios. Os e-mails utilizam o domínio reservado `example.com`.

## Links

- [Repositório no GitHub](https://github.com/igormrqs/painel-projetos-undf-v2)
- [Site publicado](https://igormrqs.github.io/painel-projetos-undf-v2/)
- [Wireframes no Figma](https://www.figma.com/design/DYymTrvRTokcZHcvXSeIKD/Problema-3---Painel-Institucional-UnDF---Wireframe-UX?node-id=29-2)
- [Alta fidelidade no Figma](https://www.figma.com/design/PZYaysxMxybv0QleqMj6Oo/Problema-3---Painel-Institucional-UnDF---Alta-Fidelidade?node-id=55-2)

## O que é possível fazer

- ver um resumo das vagas e inscrições;
- pesquisar por qualquer informação dos projetos e das inscrições;
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

No carregamento normal, o painel mantém o skeleton visível por pelo menos 1,2 segundo antes de mostrar os dados.

## Acessibilidade

O painel possui alguns cuidados para facilitar a navegação:

- link para pular direto ao conteúdo usando o teclado;
- destaque visível no elemento que está com foco;
- textos que informam mudanças nos filtros e no carregamento;
- barras de ocupação identificadas para leitores de tela;
- símbolos acompanhados de texto nos estados vazio e de erro;
- símbolo de dia ou noite acompanhado do nome de cada turno;
- animação de carregamento desativada quando o sistema pede menos movimento.

## Organização das pastas

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

## Tecnologias usadas

- HTML;
- CSS;
- JavaScript;
- JSON para armazenar os projetos e as inscrições.

O projeto não precisa de bibliotecas ou instalações adicionais.
