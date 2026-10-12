"use client";

import { useCart, selectSubtotal } from "@/lib/cart";
import { formatBRL } from "@/lib/format";
import { Placeholder } from "./Placeholder";
import { Container, Button, GhostLink } from "./ui";

export function BagView() {
  const { items, setQty } = useCart();
  const subtotal = useCart(selectSubtotal);

  return (
    <div className="bg-paper" style={{ paddingTop: "clamp(140px, 18vh, 220px)", paddingBottom: "var(--section-gap)", minHeight: "80vh" }}>
      <Container>
        <div className="mb-16 text-center">
          <span className="label">SACOLA</span>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-8 text-center">
            <span className="caption" style={{ opacity: 0.55 }}>SUA SACOLA ESTÁ VAZIA</span>
            <GhostLink href="/colecao">VER A COLEÇÃO</GhostLink>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {items.map((i) => (
                <div key={i.key} className="flex gap-8 border-t py-10" style={{ borderColor: "var(--color-line)" }}>
                  <div className="w-28 shrink-0 md:w-36"><Placeholder ratio="4:5" /></div>
                  <div className="flex flex-1 flex-col">
                    <span className="nav">{i.name}</span>
                    <span className="caption mt-3" style={{ opacity: 0.55 }}>{[i.variant, i.size].filter(Boolean).join(" · ")}</span>
                    <div className="mt-auto flex items-center gap-8 pt-8">
                      <div className="flex items-center gap-5 border px-5 py-3" style={{ borderColor: "var(--color-line)" }}>
                        <button className="nav" onClick={() => setQty(i.key, i.qty - 1)}>–</button>
                        <span className="nav">{i.qty}</span>
                        <button className="nav" onClick={() => setQty(i.key, i.qty + 1)}>+</button>
                      </div>
                      <button className="caption link-underline" style={{ opacity: 0.55 }} onClick={() => setQty(i.key, 0)}>REMOVER</button>
                    </div>
                  </div>
                  <span className="nav whitespace-nowrap">{formatBRL(i.price * i.qty)}</span>
                </div>
              ))}
              <div className="border-t" style={{ borderColor: "var(--color-line)" }} />
            </div>

            <div className="lg:col-span-3 lg:col-start-10">
              <div className="lg:sticky lg:top-28">
                <div className="flex items-center justify-between border-b py-5" style={{ borderColor: "var(--color-line)" }}>
                  <span className="nav">SUBTOTAL</span>
                  <span className="nav">{formatBRL(subtotal)}</span>
                </div>
                <div className="mt-10">
                  <Button href="/checkout" full>IR PARA O CHECKOUT</Button>
                </div>
                <div className="mt-8 text-center">
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
