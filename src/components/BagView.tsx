"use client";

import Link from "next/link";
import { useCart, selectSubtotal } from "@/lib/cart";
import { formatBRL } from "@/lib/format";
import { Placeholder } from "./Placeholder";
import { Container, Label, Button, GhostLink } from "./ui";

export function BagView() {
  const { items, setQty } = useCart();
  const subtotal = useCart(selectSubtotal);

  return (
    <div className="bg-paper" style={{ paddingTop: "clamp(96px, 12vw, 160px)", paddingBottom: "var(--spacing-section)", minHeight: "70vh" }}>
      <Container>
        <Label style={{ color: "var(--color-muted-light)" }}>SACOLA</Label>

        {items.length === 0 ? (
          <div className="mt-12 flex flex-col items-start gap-6">
            <p style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "var(--text-display)" }}>
              Sua sacola está vazia.
            </p>
            <GhostLink href="/colecao">VER A COLEÇÃO</GhostLink>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-12">
            {/* Itens */}
            <div className="lg:col-span-8">
              {items.map((i) => (
                <div
                  key={i.key}
                  className="flex gap-6 border-t py-8"
                  style={{ borderColor: "var(--color-line-light)" }}
                >
                  <div className="w-28 shrink-0 md:w-32">
                    <Placeholder ratio="4:5" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="caption" style={{ color: "var(--color-muted-light)" }}>
                      {i.category}
                    </span>
                    <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "var(--text-subheading)" }}>
                      {i.name}
                    </span>
                    <span className="caption mt-1" style={{ color: "var(--color-muted-light)" }}>
                      {[i.variant, i.size].filter(Boolean).join(" · ")}
                    </span>
                    <div className="mt-auto flex items-center gap-6 pt-6">
                      <div className="flex items-center gap-4 border px-4 py-2" style={{ borderColor: "var(--color-line-light)" }}>
                        <button className="label hover:opacity-60" onClick={() => setQty(i.key, i.qty - 1)}>–</button>
                        <span className="label">{i.qty}</span>
                        <button className="label hover:opacity-60" onClick={() => setQty(i.key, i.qty + 1)}>+</button>
                      </div>
                      <button className="caption hover:opacity-60" style={{ color: "var(--color-muted-light)" }} onClick={() => setQty(i.key, 0)}>
                        REMOVER
                      </button>
                    </div>
                  </div>
                  <span className="label whitespace-nowrap">{formatBRL(i.price * i.qty)}</span>
                </div>
              ))}
              <div className="border-t" style={{ borderColor: "var(--color-line-light)" }} />
            </div>

            {/* Resumo */}
            <div className="lg:col-span-3 lg:col-start-10">
              <div className="lg:sticky lg:top-[92px]">
                <Label style={{ color: "var(--color-muted-light)" }}>RESUMO</Label>
                <div className="mt-6 flex items-center justify-between border-b py-4" style={{ borderColor: "var(--color-line-light)" }}>
                  <span className="label">SUBTOTAL</span>
                  <span className="label">{formatBRL(subtotal)}</span>
                </div>
                <p className="caption mt-4" style={{ color: "var(--color-muted-light)" }}>
                  FRETE CALCULADO NO CHECKOUT
                </p>
                <div className="mt-8">
                  <Button href="/checkout" full>IR PARA O CHECKOUT</Button>
                </div>
                <div className="mt-6">
                  <GhostLink href="/colecao">CONTINUAR COMPRANDO</GhostLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
