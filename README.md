# Painel de projetos da UnDF

Este projeto mostra os projetos disponíveis no Laboratório de Inovação Digital da UnDF.

Na página é possível:

- ver um resumo das vagas e inscrições;
- pesquisar um projeto pelo nome;
- filtrar os projetos por área e situação;
- selecionar um projeto para ver seus inscritos.

## Como abrir

Como os dados são lidos de um arquivo JSON, é preciso abrir o projeto usando um servidor local.

No terminal, entre nesta pasta e execute:

```powershell
python -m http.server 8000
```

Depois, abra `http://localhost:8000` no navegador.

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

O projeto foi feito apenas com HTML, CSS e JavaScript.
