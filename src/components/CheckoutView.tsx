"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, selectSubtotal } from "@/lib/cart";
import { formatBRL } from "@/lib/format";
import { paymentProvider, type CustomerInfo } from "@/lib/payment";
import { Container, Button, GhostLink } from "./ui";

const FIELDS: { name: keyof CustomerInfo; label: string; type?: string; required?: boolean }[] = [
  { name: "name", label: "NOME COMPLETO", required: true },
  { name: "email", label: "E-MAIL", type: "email", required: true },
  { name: "phone", label: "TELEFONE", type: "tel", required: true },
  { name: "cep", label: "CEP", required: true },
  { name: "address", label: "ENDEREÇO", required: true },
  { name: "number", label: "NÚMERO", required: true },
  { name: "complement", label: "COMPLEMENTO" },
  { name: "city", label: "CIDADE", required: true },
  { name: "state", label: "ESTADO", required: true },
];

const EMPTY: CustomerInfo = { name: "", email: "", phone: "", cep: "", address: "", number: "", complement: "", city: "", state: "" };

export function CheckoutView() {
  const { items, clear } = useCart();
  const subtotal = useCart(selectSubtotal);
  const [form, setForm] = useState<CustomerInfo>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [whatsapp, setWhatsapp] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await paymentProvider.createCheckout({ items, customer: form, subtotal });
    setSubmitting(false);
    if (res.status === "redirect") { window.location.href = res.url; return; }
    setResult(res.message);
    if (res.status === "pending" && res.whatsappUrl) setWhatsapp(res.whatsappUrl);
    if (res.status === "pending") clear();
  }

  if (result) {
    return (
      <div className="bg-paper" style={{ paddingTop: "clamp(160px, 22vh, 280px)", paddingBottom: "var(--section-gap)", minHeight: "80vh" }}>
        <Container>
          <div className="mx-auto max-w-md text-center">
            <span className="label">PEDIDO RECEBIDO</span>
            <p className="mt-10" style={{ fontSize: "var(--text-body)", lineHeight: 1.9 }}>{result}</p>
            <div className="mt-12 flex flex-col items-center gap-6">
              {whatsapp && <Button href={whatsapp}>FINALIZAR NO WHATSAPP</Button>}
              <GhostLink href="/colecao">VOLTAR À COLEÇÃO</GhostLink>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-paper" style={{ paddingTop: "clamp(160px, 22vh, 280px)", paddingBottom: "var(--section-gap)", minHeight: "80vh" }}>
        <Container>
          <div className="flex flex-col items-center gap-8 text-center">
            <span className="caption" style={{ opacity: 0.55 }}>SUA SACOLA ESTÁ VAZIA</span>
            <GhostLink href="/colecao">VER A COLEÇÃO</GhostLink>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-paper" style={{ paddingTop: "clamp(140px, 18vh, 220px)", paddingBottom: "var(--section-gap)" }}>
      <Container>
        <div className="mb-16 text-center">
          <span className="label">CHECKOUT</span>
        </div>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <form onSubmit={onSubmit} className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
              {FIELDS.map((f) => (
                <label key={f.name} className="col-span-2 sm:col-span-1">
                  <span className="caption block" style={{ opacity: 0.55 }}>{f.label}{f.required ? "" : " (OPCIONAL)"}</span>
                  <input
                    type={f.type ?? "text"}
                    required={f.required}
                    value={form[f.name] ?? ""}
                    onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                    className="mt-3 w-full bg-transparent pb-3 outline-none"
                    style={{ borderBottom: "1px solid var(--color-line)", fontSize: "var(--text-body)" }}
                  />
                </label>
              ))}
            </div>

            <p className="mt-16 max-w-md" style={{ fontSize: "var(--text-body)", lineHeight: 1.8, opacity: 0.65 }}>
              O pagamento online está sendo configurado. Ao confirmar, seu pedido é registrado e a finalização é combinada com a gente.
            </p>

            <div className="mt-12">
              <Button type="submit" full disabled={submitting}>
                {submitting ? "PROCESSANDO…" : "CONFIRMAR PEDIDO"}
              </Button>
            </div>
          </form>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <div className="flex flex-col gap-6">
                {items.map((i) => (
                  <div key={i.key} className="flex items-start justify-between gap-4">
                    <div>
                      <span className="nav">{i.name}</span>
                      <span className="caption mt-2 block" style={{ opacity: 0.55 }}>{[i.variant, i.size, `x${i.qty}`].filter(Boolean).join(" · ")}</span>
                    </div>
                    <span className="nav whitespace-nowrap">{formatBRL(i.price * i.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex items-center justify-between border-t py-5" style={{ borderColor: "var(--color-line)" }}>
                <span className="nav">SUBTOTAL</span>
                <span className="nav">{formatBRL(subtotal)}</span>
              </div>
              <div className="mt-8">
                <Link href="/sacola" className="caption link-underline" style={{ opacity: 0.55 }}>EDITAR SACOLA</Link>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
