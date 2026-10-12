"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useCart, selectSubtotal } from "@/lib/cart";
import { formatBRL } from "@/lib/format";
import { Placeholder } from "./Placeholder";

export function CartDrawer() {
  const { items, isOpen, close, setQty } = useCart();
  const subtotal = useCart(selectSubtotal);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Fecha a sacola ao trocar de rota
  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <>
      {/* Scrim */}
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-ink/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Painel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-carbon text-paper transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: "var(--ease-editorial)", transitionDuration: "400ms" }}
        aria-label="Sacola"
      >
        <div
          className="flex items-center justify-between border-b px-6 py-5"
          style={{ borderColor: "var(--color-line-dark)" }}
        >
          <span className="label">SACOLA</span>
          <button className="label hover:opacity-60" onClick={close}>
            FECHAR
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="label" style={{ color: "var(--color-muted-dark)" }}>
              SUA SACOLA ESTÁ VAZIA
            </p>
            <Link href="/colecao" onClick={close} className="label border-b border-current pb-1 hover:opacity-60">
              VER COLEÇÃO
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              {items.map((i) => (
                <div
                  key={i.key}
                  className="flex gap-4 border-b py-6"
                  style={{ borderColor: "var(--color-line-dark)" }}
                >
                  <div className="w-20 shrink-0">
                    <Placeholder ratio="4:5" tone="ink" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="caption" style={{ color: "var(--color-muted-dark)" }}>
                      {i.category}
                    </span>
                    <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                      {i.name}
                    </span>
                    <span className="caption mt-1" style={{ color: "var(--color-muted-dark)" }}>
                      {[i.variant, i.size].filter(Boolean).join(" · ")}
                    </span>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-3">
                        <button className="label hover:opacity-60" onClick={() => setQty(i.key, i.qty - 1)}>
                          –
                        </button>
                        <span className="label">{i.qty}</span>
                        <button className="label hover:opacity-60" onClick={() => setQty(i.key, i.qty + 1)}>
                          +
                        </button>
                      </div>
                      <span className="label">{formatBRL(i.price * i.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t px-6 py-6" style={{ borderColor: "var(--color-line-dark)" }}>
              <div className="mb-5 flex items-center justify-between">
                <span className="label">SUBTOTAL</span>
                <span className="label">{formatBRL(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={close}
                className="label flex w-full items-center justify-center border border-paper bg-paper text-ink transition-colors duration-200 hover:bg-transparent hover:text-paper"
                style={{ padding: "16px 32px" }}
              >
                IR PARA O CHECKOUT
              </Link>
              <p className="caption mt-4 text-center" style={{ color: "var(--color-muted-dark)" }}>
                FRETE CALCULADO NO CHECKOUT
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
