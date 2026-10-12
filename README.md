# LUMEN

Site institucional + vitrine de coleção da **Lumen** — streetwear cristão de autor.
Luz e sombra: interface acromática, foto carrega a cor, tipografia carrega a estrutura.

A direção de arte completa está em [`design.md`](./design.md).

## Stack
- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** (tokens em `app/globals.css` → `@theme`)
- Fontes via `next/font`: Hanken Grotesk · Space Mono · Fraunces
- Carrinho: **Zustand** + persistência em localStorage
- Deploy: **Vercel**

## Rodar localmente
```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # build de produção
```

## Estrutura
```
app/                 # rotas (App Router)
  page.tsx           # Home
  colecao/           # vitrine da coleção
  produto/[slug]/    # página de produto (PDP)
  sobre/ contato/    # institucional
  sacola/ checkout/  # carrinho e checkout
src/
  components/        # UI e layout
  data/collection.ts # coleção Santidade (editável à mão)
  lib/cart.ts        # estado do carrinho
  lib/payment.ts     # camada de pagamento abstraída
```

## Conteúdo
- **Imagens:** no momento são placeholders cinza chapado. Substituir `Placeholder`
  por `next/image` quando as fotos chegarem (manter as proporções do `design.md`).
- **Logo:** o wordmark "LUMEN" no header/footer é placeholder tipográfico até o
  arquivo da marca ser integrado.
- **Produtos:** editar `src/data/collection.ts`.

## Pagamento
O checkout fala apenas com a interface `PaymentProvider` (`src/lib/payment.ts`).
Hoje usa o `PlaceholderProvider` (registra o pedido / gera link de WhatsApp).
Para conectar um gateway real (Mercado Pago, Stripe, Pagar.me…):
1. Implementar um novo provider que satisfaça `PaymentProvider`.
2. Trocar `export const paymentProvider = ...` no fim do arquivo.
3. Preencher as variáveis de ambiente (ver `.env.example`).

O fluxo de UI não muda.
