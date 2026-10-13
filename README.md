# João Reis Eventos — Site Institucional

Site de apresentação dos serviços de **aluguel de mesas e cadeiras** e **cama elástica** da João Reis Eventos (Águas Lindas de Goiás e região), conforme o PRD em [`docs/PRD.md`](docs/PRD.md).

**Objetivo:** transformar visitantes em contatos interessados em fazer cotação pelo WhatsApp.

## Estrutura

```
joao-reis-eventos/
├── index.html        # Início: hero, atalhos de serviço, benefícios, prévia da galeria, depoimentos, CTA
├── servicos.html     # Mesas e cadeiras + Cama elástica + como funciona
├── galeria.html      # Galeria com filtros e lightbox
├── contato.html      # Formulário de orçamento + informações de contato
├── css/styles.css    # Identidade visual (carvão, amarelo, branco, verde WhatsApp)
├── js/main.js        # Menu mobile, filtros, lightbox, formulário → WhatsApp
├── img/              # Logo, hero e fotos reais do negócio (JPEG + SVG)
├── build-img.ps1     # Regenera as imagens SVG da galeria
├── server.ps1        # Servidor local para preview
└── docs/PRD.md       # Requisitos do projeto
```

## Como visualizar

Abra o `index.html` direto no navegador ou rode o servidor local:

```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
# depois acesse http://localhost:8761/
```

## Funcionalidades

- Layout responsivo (celular, tablet e computador).
- Botão flutuante de WhatsApp em todas as páginas + CTAs estratégicos.
- Formulário de orçamento que monta a mensagem e abre o WhatsApp (com validação e máscara de telefone).
- Galeria com filtros por categoria (mesas/cadeiras, cama elástica, eventos) e lightbox com teclado (← → Esc).
- Seção de depoimentos com avaliações reais do Google (nota 5,0).
- Links "Como chegar" para o Google Maps.
- Animações suaves de entrada, respeitando `prefers-reduced-motion`.

## ✅ Dados já aplicados (fonte: Google Maps — "João Reis - Aluguel de Mesas e Cadeiras")

| Item | Valor aplicado |
|---|---|
| **WhatsApp** | `js/main.js` → `WHATSAPP_NUMERO = '5561992937016'` |
| **Telefone** | (61) 99293-7016 (rodapés + cartão de contato) |
| **Endereço** | Conjunto A, Lote 48 — Setor 8, Águas Lindas de Goiás - GO, 72910-046 |
| **Horário** | Todos os dias, das 07:00 às 19:00 |
| **Google Maps** | Link "Como chegar" no rodapé e "Abrir no Google Maps" no `contato.html` |
| **Avaliações** | Seção de depoimentos no `index.html` (5,0 · 9 avaliações) |
| **Fotos reais** | `img/foto-cadeiras.jpg`, `img/foto-cadeiras-linhas.jpg`, `img/foto-cama-elastica.jpg`, `img/foto-estoque.jpg`, `img/hero.jpg` (extraídas do anúncio oficial e do listing do Maps) |
| **Redes sociais** | Removidas do rodapé (sem perfis confirmados — reintroducir se existirem) |

## ⚠️ Pendências antes de publicar (item 7 do PRD)

Nada de preço ou disponibilidade não confirmada é exibido no site. Faltam poucos dados:

| Item | Onde trocar |
|---|---|
| **Logo em boa resolução** | Substituir `img/logo.svg` (hoje é um monograma provisório inspirado no anúncio) |
| **Mais fotos reais** | As atuais vieram do anúncio/listing do Google Maps — trocar por fotos originais em melhor resolução quando disponíveis (mesmos nomes de arquivo) |
| **Redes sociais** | Se a empresa tiver Instagram/Facebook, adicionar links no rodapé |
| **Quantidades, modelos, dimensões e regras de entrega/montagem** | `servicos.html` — só adicionar quando confirmados pela empresa |

Fotos originais em boa resolução podem ser baixadas do app/perfil do Google Meu Negócio do próprio negócio (41 fotos no listing).

## Identidade visual

- **Preto carvão** `#131316` — fundo
- **Amarelo vibrante** `#ffd21f` — botões, destaques, pinceladas
- **Branco** `#ffffff` — textos e áreas de respiro
- **Verde WhatsApp** `#25d366` — exclusivo para ações de WhatsApp
- Fontes: **Archivo** (títulos), **Inter** (corpo), **Caveat** (detalhes manuscritos)

O diretório `img/_maps/` guarda os originais baixados do Google Maps (podem ser apagados antes de publicar). Os SVGs gerados por `build-img.ps1` continuam disponíveis como fallback.
