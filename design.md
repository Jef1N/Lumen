# Lumen — Design System & Direção de Arte
> Luz e sombra. Uma marca de streetwear cristã onde a foto carrega toda a cor, a tipografia carrega toda a estrutura, e a mensagem está presente sem nunca ser pregação.

**Tema base:** binário / invertível (canvas escuro para momentos editoriais, canvas claro para produto e compra)
**Atualizado:** 2026-10-12

---

## 0. Tese de design

A Lumen vive de uma tensão, e essa tensão é a direção de arte:

- **Sagrado × Street.** Mensagem cristocêntrica atemporal vestida em design contemporâneo. Quem passa vê estética primeiro; a mensagem chega depois, sem aviso.
- **Luz × Sombra.** O nome é "luz" (latim). O sistema é construído em contraste máximo — quase-preto e quase-branco — onde o branco é respiro e o preto é peso.
- **Artista × Loja.** Posicionamento de autor, não de varejo. Menos texto, mais presença. A interface recua para a obra aparecer.

Três regras inegociáveis herdadas dos references (Farfetch, YSL, Ferrari, Abel, Walden):

1. **A foto é a única cor.** A UI é 100% acromática. Qualquer acento cromático quebra o contrato.
2. **Geometria cortada.** `border-radius: 0` em tudo. `box-shadow: none` em tudo. Profundidade vem de foto full-bleed, inversão de valor e respiro — nunca de elevação.
3. **A tipografia é a arquitetura.** Hierarquia por peso, escala e tracking — nunca por cor ou caixa decorativa.

---

## 1. Tokens — Cores

Paleta acromática com leve temperatura quente (evita o clínico de hospital, aproxima do papel de revista). Sem nenhuma cor de marca. Estado interativo = inversão de valor / opacidade / underline.

| Nome | Valor | Token | Papel |
|------|-------|-------|-------|
| Ink | `#0A0A0A` | `--color-ink` | Texto primário no claro; canvas escuro; tinta absoluta que ancora o sistema |
| Carbon | `#151514` | `--color-carbon` | Superfície escura elevada — footer no escuro, drawer, bandas editoriais escuras (um passo acima do void para quebrar o vazio) |
| Paper | `#F4F3EF` | `--color-paper` | Canvas claro, fundo de produto, superfície dominante — branco quente de papel |
| Paper Pure | `#FFFFFF` | `--color-paper-pure` | Branco puro para áreas que precisam de brilho máximo (imagem de produto isolada) |
| Placeholder | `#D4D2CC` | `--color-placeholder` | **Preenchimento cinza chapado para imagens em contexto claro** (sem degradê) |
| Placeholder Ink | `#1A1A18` | `--color-placeholder-ink` | Placeholder de imagem em contexto escuro (sem degradê) |
| Line Light | `#E3E1DB` | `--color-line-light` | Hairline 1px sobre papel — divisores, bordas de input |
| Line Dark | `#2A2A28` | `--color-line-dark` | Hairline 1px sobre void — divisores no escuro |
| Muted Light | `#6A6963` | `--color-muted-light` | Texto secundário / metadado sobre papel |
| Muted Dark | `#8C8B86` | `--color-muted-dark` | Texto secundário / metadado sobre void |

> **Placeholder:** enquanto não houver fotos, todo slot de imagem é um retângulo `--color-placeholder` (ou `--color-placeholder-ink` sobre fundo escuro), chapado, sem degradê, sem borda, sem ícone. Mantém a proporção (ver §7). Trocamos por `<Image>` quando chegarem os arquivos.

### Superfícies

| Nível | Nome | Valor | Uso |
|-------|------|-------|-----|
| 0 claro | Paper | `#F4F3EF` | Canvas padrão de coleção, produto, checkout |
| 0 escuro | Void | `#0A0A0A` | Hero, manifesto, bandas cinematográficas |
| 1 escuro | Carbon | `#151514` | Footer, drawer de sacola, cartão editorial escuro |
| — linha | Line | `#E3E1DB` / `#2A2A28` | Separação estrutural (nunca sombra) |

---

## 2. Tokens — Tipografia

Sistema de **três vozes**, cada uma contando uma parte da marca. Fontes livres, deployáveis via `next/font/google` (zero custo de licença, performance máxima).

### 2.1 Voz STREET — grotesca (UI + corpo)
**`Hanken Grotesk`** — neo-grotesca quente e variável. Carrega navegação, corpo, nome de produto, descrição. Pesos 300 (headlines luminosas, airy) a 700 (ênfase rara). O cut 300 em tamanho grande é a assinatura "luz" da marca.
- Substituta: Inter, Söhne, Founders Grotesk
- Pesos: **300, 400, 500, 700**
- Tracking: display negativo (−0.01 a −0.02em); corpo neutro

### 2.2 Voz CÓDIGO — mono (labels funcionais)
**`Space Mono`** — monoespaçada com caráter editorial. Toda microtipografia funcional: nav, botões, preço, SKU, eyebrows, captions, labels de categoria, tags de coleção. **Sempre CAIXA ALTA, tracking +0.08 a +0.14em.** É o que dá à interface a cadência de label de galeria / etiqueta de drop — o toque "artista/streetwear".
- Substituta: JetBrains Mono, IBM Plex Mono, Geist Mono
- Pesos: **400, 700**
- Uso: uppercase, tracked, tamanhos pequenos (11–14px)

### 2.3 Voz SAGRADA — serif display (escritura + manifesto)
**`Fraunces`** — serif variável com alma editorial e gravidade atemporal (optical size). Usada **com parcimônia cirúrgica**: só em versículos bíblicos, no manifesto e em uma ou outra declaração editorial grande. É o contraponto sagrado/timeless ao street/now das outras duas vozes. Nunca em UI funcional.
- Substituta: Bodoni Moda, Newsreader, Instrument Serif
- Pesos: **300, 400** (+ itálico para versículo)
- Uso: headlines grandes em peso leve, versículo em itálico

> **Regra de ouro das três vozes:** nunca aplicar uma fonte uniformemente. Nav e preço são Mono; nome e descrição de produto são Hanken; versículo e manifesto são Fraunces. Esse contraste É a hierarquia.

### 2.4 Escala tipográfica

Fluida com `clamp()` (mobile → desktop). Base 16px.

| Papel | Família | Peso | Tamanho | Line-height | Tracking | Token |
|------|---------|------|---------|-------------|----------|-------|
| Display XL | Fraunces / Hanken | 300 | `clamp(2.75rem, 7vw, 6.5rem)` | 1.02 | −0.02em | `--text-display-xl` |
| Display | Fraunces / Hanken | 300 | `clamp(2rem, 4.5vw, 3.75rem)` | 1.05 | −0.015em | `--text-display` |
| Heading | Hanken | 400 | `clamp(1.5rem, 2.5vw, 2.25rem)` | 1.1 | −0.01em | `--text-heading` |
| Subheading | Hanken | 500 | `1.25rem` | 1.2 | 0 | `--text-subheading` |
| Body LG | Hanken | 300 | `1.125rem` | 1.5 | 0 | `--text-body-lg` |
| Body | Hanken | 400 | `1rem` | 1.55 | 0 | `--text-body` |
| Label | Space Mono | 400 | `0.75rem` | 1.2 | +0.12em | `--text-label` |
| Caption | Space Mono | 400 | `0.6875rem` | 1.4 | +0.1em | `--text-caption` |
| Verse | Fraunces italic | 400 | `clamp(1.25rem, 2vw, 1.75rem)` | 1.4 | 0 | `--text-verse` |

---

## 3. Tokens — Espaçamento, forma e linha

**Base:** 8px (passos de 4px disponíveis). **Densidade:** espaçosa (editorial).

| Token | Valor |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-24` | 96px |
| `--space-32` | 128px |
| `--space-40` | 160px |

- **Gap de seção:** `clamp(56px, 10vw, 160px)` — respiro é a ferramenta principal.
- **Border-radius:** `0` em absolutamente tudo (botões, cards, inputs, imagens, tags).
- **Sombra:** nenhuma. Elevação = inversão de valor + foto full-bleed + respiro.
- **Hairline:** 1px sólido `--color-line-*`. Nunca linha dupla, nunca decorativa.

---

## 4. Grid & Layout

- **Max-width de conteúdo textual:** 1440px (centralizado). **Imagem pode sangrar 100vw.**
- **Coluna de texto (manifesto, descrição):** máx. 60–68ch (~640–720px) — nunca largura total.
- **Grid:** 12 colunas, gutter 24px (desktop) / 16px (mobile), margem lateral `clamp(16px, 5vw, 64px)`.
- **Grid de produto:** 2 colunas (mobile) → 3 colunas (desktop). Com poucas peças, a coleção pode usar layout editorial assimétrico (uma peça em destaque largo + duas menores).
- **Ritmo da página:** banda full-bleed → respiro branco → label pequeno → próxima banda. Sem faixas de cor alternadas; o canvas muda só por inversão intencional (claro ↔ escuro).

**Breakpoints:** `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1440`.

---

## 5. Tom de voz & copy

- **Direto, sem enrolação.** Frase curta. Zero "fofura". A marca afirma, não explica.
- **Labels sempre em Mono CAIXA ALTA:** `COLEÇÃO`, `ADICIONAR À SACOLA`, `SANTIDADE — 01`, `R$ 150`.
- **Versículo como eyebrow editorial**, não como sermão: Fraunces itálico, discreto, perto da imagem. Ex.: *"Vós sois a luz do mundo"* — Mt 5.14, set pequeno em Mono como referência.
- **Nome de produto** em Hanken; **"over", "conjunto"** como categoria em Mono acima do nome (padrão PDP dos references).
- **Sem exclamação, sem emoji, sem promo-sticker.** A peça carrega a mensagem; a interface não grita.

---

## 6. Componentes

Todos: `radius 0`, `shadow none`, borda só hairline, estado por inversão/opacidade/underline.

### Announcement Bar
Faixa full-width sobre o canvas, 10–12px vertical. Texto centralizado em Mono 11px uppercase, tracking +0.1em. Sem fundo chapado colorido — herda void ou paper. Ex.: `LANÇAMENTO — COLEÇÃO SANTIDADE · ESTOQUE LIMITADO`.

### Header / Navegação
Transparente sobre hero; sólido (paper ou void) nas demais. Três zonas: esquerda links (`COLEÇÃO`, `SOBRE`) em Mono 12px uppercase; centro o **wordmark/logo Lumen** (entra o arquivo do usuário; placeholder = "LUMEN" em Hanken 500 tracked); direita `SACOLA (0)` em Mono + ícone. Altura ~64–72px. Sem sombra, sem borda (ou hairline na base quando sólido). Links: sem underline em repouso, underline 1px no hover.

### Wordmark Lockup
O logo flutua no espaço negativo — nunca em pílula/caixa. Branco sobre foto escura, ink sobre paper. Até chegar o arquivo: "LUMEN" em Hanken Grotesk 500, tracking +0.25em, uppercase.

### Hero Full-Bleed
Foto 100vw, altura 88–100vh. Sem radius, sem overlay tint (scrim sutil só se necessário para contraste de texto). Bloco de caption ancorado embaixo: eyebrow em Mono uppercase (nome da coleção) + título em Fraunces/Hanken 300 grande + ghost link Mono underline. Texto branco sobre foto escura.

### Editorial Caption / Verse Block
Bloco alinhado (bottom-left ou centralizado), largura máx. ~420px. Eyebrow Mono 12px uppercase → versículo em Fraunces itálico → referência em Mono caption. Sem fundo, sem borda.

### Product Tile (grid de coleção)
Foto em container (placeholder cinza chapado), 0 radius, 0 borda, 0 sombra. Abaixo, com gap 16px: categoria em Mono 11px uppercase (`OVER`), nome em Hanken 400 16px, preço em Mono 13px. Hover: imagem muda só opacidade (→0.88) ou scale 1.02 lento — nada mais se move. Sem badge, sem tag de desconto.

### PDP (Página de Produto)
Layout de duas zonas no desktop: **galeria à esquerda** (stack vertical de imagens full-height que sangram) + **coluna de info sticky à direita** (~420px). Info: categoria (Mono) → nome (Hanken) → preço (Mono) → seletor de variante → versículo da peça (Fraunces itálico) → descrição curta (Hanken 300) → CTA sólido. Mobile: galeria em cima, info embaixo, single column.

### Variant Selector
Variantes (ex.: Guarde o Azeite — **preto / off-white**; tamanhos) como chips retangulares: borda hairline, Mono 12px uppercase, estado selecionado = inversão (fundo ink, texto paper). Sem radius.

### Solid CTA Button
Fundo `--color-ink`, texto `--color-paper`. Mono 13px uppercase tracking +0.08em. Padding 14px × 32px. Radius 0. Hover: inverte (fundo paper, texto ink, borda hairline ink). Único controle de alta ênfase do sistema.

### Ghost Link
Texto Mono 12px uppercase, underline 1px. Sem fundo, sem borda, sem padding. Ação secundária / navegação editorial.

### Newsletter / Text Input
Fundo transparente, só borda inferior 1px hairline. Placeholder em Mono/Hanken muted. Sem focus ring colorido — a borda inferior escurece para ink no focus. CTA ao lado (ghost ou solid).

### Cart Drawer (Sacola)
Overlay lateral em Carbon (escuro) ou Paper. Lista de itens: thumb placeholder + nome (Hanken) + variante/qtd (Mono) + preço (Mono). Subtotal em Mono. CTA `IR PARA O CHECKOUT` sólido. Hairlines entre itens, sem sombra.

### Checkout
Página própria, canvas paper, duas colunas: **formulário à esquerda** (contato, entrega, endereço — inputs de borda inferior), **resumo do pedido à direita sticky** (itens, subtotal, frete, total em Mono). Etapa de pagamento isolada atrás de uma interface (`PaymentProvider`) — ver §9. Estado atual: botão final leva a confirmação placeholder / fallback WhatsApp até o gateway ser definido.

### Footer
Superfície Carbon (escuro) ou Paper. Colunas de links em Mono 12px uppercase. Captura de e-mail (próximo lançamento). Instagram. Hairline no topo. Fecha a página — no home escuro, pode ser o único bloco invertido (padrão Farfetch/YSL).

---

## 7. Direção de imagem & placeholders

- **Fotografia editorial** é todo o sistema visual: modelos em enquadramento médio/inteiro, pose editorial (não catálogo), luz direcional, paleta naturalmente dessaturada que conversa com a UI P&B. Still de produto isolado sobre paper/pure para PDP.
- **Full-bleed, 0 radius, 0 borda, 0 overlay decorativo.** A imagem é o componente.
- **Proporções padrão:**
  - Hero: `16:9` a `3:4` (mobile vertical)
  - Tile de coleção: `3:4` (retrato)
  - Still de produto (PDP): `4:5`
  - Editorial/lookbook: `3:2` ou full-bleed livre
- **Placeholder (fase atual):** retângulo `--color-placeholder` chapado respeitando a proporção acima, sem texto, sem ícone, sem degradê. Em fundo escuro, `--color-placeholder-ink`.

---

## 8. Movimento

Editorial e contido — nada de bounce/spring. Respeitar `prefers-reduced-motion`.

- **Reveal on scroll:** opacity 0→1 + translateY 16px→0, 700ms `cubic-bezier(0.16,1,0.3,1)`, stagger 60–80ms entre itens.
- **Imagem hover:** opacity →0.88 **ou** scale 1.02 em 600ms ease-out. Só um dos dois.
- **Transição de página:** fade 300ms (via `view-transitions` / framer-motion leve).
- **Nav/links:** underline que cresce da esquerda em 200ms.
- **Nunca:** sombra animada, parallax pesado, carrossel automático agressivo.

---

## 9. Stack & implementação

- **Framework:** Next.js (App Router) + TypeScript.
- **Estilo:** Tailwind CSS v4 (tokens via `@theme`, abaixo) + CSS vars.
- **Fontes:** `next/font/google` (Hanken Grotesk, Space Mono, Fraunces) — self-hosted automático, sem FOUT.
- **Animação:** framer-motion (leve) ou CSS puro + IntersectionObserver.
- **Dados de produto:** arquivo tipado local (`/data/collection.ts`) — sem CMS por ora; fácil de editar e migrar para CMS/e-commerce depois.
- **Carrinho:** estado client (Zustand ou Context) + persistência localStorage.
- **Pagamento:** **abstraído** atrás de uma interface `PaymentProvider` (`createCheckout()`, `confirm()`), com um `PlaceholderProvider` (confirma pedido / gera link WhatsApp) plugável por Mercado Pago / Stripe / Pagar.me depois — sem reescrever o fluxo.
- **Deploy:** Vercel (conectada). Domínio do usuário apontado via DNS quando disponível.
- **i18n:** PT por padrão (estrutura pronta para PT/EN se desejado).

### Arquitetura de páginas
`/` Home · `/colecao` Coleção (vitrine tipo e-commerce enxuta) · `/produto/[slug]` PDP · `/sobre` Manifesto (Lemos & Edi) · `/contato` Contato/Newsletter · `/sacola` + `/checkout`.

### Coleção inicial — Santidade
1. **Over "Jesus é Brasileiro"** — tecido branco, estampa de Jesus com camiseta do Brasil · ~R$125–150
2. **Over "Guarde o Azeite"** — variantes **preto / off-white**, pintura das 10 virgens na barra, monocromática · ~R$125–150
3. **Conjunto Santidade** — casaco + calça de moletom branco, lettering "Santidade" · ~R$300

---

## 10. Do's & Don'ts

### Do
- Rodar tudo em `--color-ink` e `--color-paper`; deixar a foto ser a única cor.
- Mono CAIXA ALTA tracked para todo label/nav/botão/preço — é a voz "drop/galeria".
- Fraunces só em versículo e manifesto — gravidade sagrada, uso cirúrgico.
- Radius 0, shadow none, hairline 1px — geometria cortada em todo componente.
- Respiro de seção `clamp(56px…160px)` como principal recurso de layout.
- Inverter canvas (claro↔escuro) só com intenção editorial; a costura é o design.
- Hero e tiles full-bleed, imagem toca a borda.

### Don't
- Nunca acento cromático, hue de status (sem verde/vermelho/azul de link).
- Nunca box-shadow, gradiente de UI, glow ou elevação.
- Nunca border-radius em nada.
- Nunca CTA colorido — só ink sólido ou ghost underline.
- Nunca Hanken 800+ gritando display; a voz "luz" é peso leve.
- Nunca Mono em caixa baixa; nunca versículo em Mono longo.
- Nunca texto sobre foto sem contraste testado (scrim sutil se preciso).
- Nunca badge de desconto / promo-sticker / emoji na UI.

---

## 11. Quick Start — Tokens

### CSS Custom Properties
```css
:root {
  /* Cores */
  --color-ink: #0A0A0A;
  --color-carbon: #151514;
  --color-paper: #F4F3EF;
  --color-paper-pure: #FFFFFF;
  --color-placeholder: #D4D2CC;
  --color-placeholder-ink: #1A1A18;
  --color-line-light: #E3E1DB;
  --color-line-dark: #2A2A28;
  --color-muted-light: #6A6963;
  --color-muted-dark: #8C8B86;

  /* Famílias */
  --font-sans: 'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Space Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  --font-serif: 'Fraunces', ui-serif, Georgia, serif;

  /* Escala de tipo */
  --text-display-xl: clamp(2.75rem, 7vw, 6.5rem);
  --text-display: clamp(2rem, 4.5vw, 3.75rem);
  --text-heading: clamp(1.5rem, 2.5vw, 2.25rem);
  --text-subheading: 1.25rem;
  --text-body-lg: 1.125rem;
  --text-body: 1rem;
  --text-label: 0.75rem;
  --text-caption: 0.6875rem;
  --text-verse: clamp(1.25rem, 2vw, 1.75rem);

  /* Tracking */
  --tracking-display: -0.02em;
  --tracking-label: 0.12em;

  /* Espaçamento */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px; --space-16: 64px;
  --space-24: 96px; --space-32: 128px; --space-40: 160px;
  --section-gap: clamp(56px, 10vw, 160px);

  /* Forma */
  --radius: 0px;
  --hairline: 1px;

  /* Layout */
  --max-content: 1440px;
  --max-text: 68ch;
}
```

### Tailwind v4 (`@theme`)
```css
@theme {
  --color-ink: #0A0A0A;
  --color-carbon: #151514;
  --color-paper: #F4F3EF;
  --color-paper-pure: #FFFFFF;
  --color-placeholder: #D4D2CC;
  --color-placeholder-ink: #1A1A18;
  --color-line-light: #E3E1DB;
  --color-line-dark: #2A2A28;
  --color-muted-light: #6A6963;
  --color-muted-dark: #8C8B86;

  --font-sans: 'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Space Mono', ui-monospace, monospace;
  --font-serif: 'Fraunces', ui-serif, Georgia, serif;

  --radius-none: 0px;
}
```
