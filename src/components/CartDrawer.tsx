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
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => { close(); }, [pathname, close]);

  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 z-50 transition-opacity duration-500 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        style={{ background: "rgba(0,0,0,0.4)" }}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-ink text-paper transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ transitionTimingFunction: "var(--ease-editorial)", transitionDuration: "500ms" }}
        aria-label="Sacola"
      >
        <div className="flex items-center justify-between px-6 py-6">
          <span className="nav">SACOLA</span>
          <button className="nav link-underline" onClick={close}>FECHAR</button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <span className="caption" style={{ opacity: 0.55 }}>SUA SACOLA ESTÁ VAZIA</span>
            <Link href="/colecao" onClick={close} className="nav link-underline">VER COLEÇÃO</Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6" data-lenis-prevent>
              {items.map((i) => (
                <div key={i.key} className="flex gap-5 border-t py-6" style={{ borderColor: "var(--color-line-dark)" }}>
                  <div className="w-20 shrink-0"><Placeholder ratio="4:5" tone="ink" /></div>
                  <div className="flex flex-1 flex-col">
                    <span className="nav">{i.name}</span>
                    <span className="caption mt-2" style={{ opacity: 0.55 }}>{[i.variant, i.size].filter(Boolean).join(" · ")}</span>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center gap-4">
                        <button className="nav" onClick={() => setQty(i.key, i.qty - 1)}>–</button>
                        <span className="nav">{i.qty}</span>
                        <button className="nav" onClick={() => setQty(i.key, i.qty + 1)}>+</button>
                      </div>
                      <span className="nav">{formatBRL(i.price * i.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t px-6 py-6" style={{ borderColor: "var(--color-line-dark)" }}>
              <div className="mb-6 flex items-center justify-between">
                <span className="nav">SUBTOTAL</span>
                <span className="nav">{formatBRL(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={close}
                className="nav flex w-full items-center justify-center border border-paper bg-paper text-ink transition-colors duration-300 hover:bg-transparent hover:text-paper"
                style={{ padding: "18px 40px" }}
              >
                IR PARA O CHECKOUT
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
