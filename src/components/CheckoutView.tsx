"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, selectSubtotal } from "@/lib/cart";
import { formatBRL } from "@/lib/format";
import { paymentProvider, type CustomerInfo } from "@/lib/payment";
import { Container, Label, Button, GhostLink } from "./ui";

const FIELDS: {
  name: keyof CustomerInfo;
  label: string;
  type?: string;
  span?: "full" | "half";
  required?: boolean;
}[] = [
  { name: "name", label: "NOME COMPLETO", span: "full", required: true },
  { name: "email", label: "E-MAIL", type: "email", span: "half", required: true },
  { name: "phone", label: "TELEFONE", type: "tel", span: "half", required: true },
  { name: "cep", label: "CEP", span: "half", required: true },
  { name: "address", label: "ENDEREÇO", span: "full", required: true },
  { name: "number", label: "NÚMERO", span: "half", required: true },
  { name: "complement", label: "COMPLEMENTO", span: "half" },
  { name: "city", label: "CIDADE", span: "half", required: true },
  { name: "state", label: "ESTADO", span: "half", required: true },
];

const EMPTY: CustomerInfo = {
  name: "", email: "", phone: "", cep: "", address: "",
  number: "", complement: "", city: "", state: "",
};

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

    if (res.status === "redirect") {
      window.location.href = res.url;
      return;
    }
    if (res.status === "error") {
      setResult(res.message);
      return;
    }
    // pending (placeholder atual)
    setResult(res.message);
    if (res.whatsappUrl) setWhatsapp(res.whatsappUrl);
    clear();
  }

  // Confirmação pós-pedido
  if (result) {
    return (
      <div className="bg-paper" style={{ paddingTop: "clamp(120px, 16vw, 220px)", paddingBottom: "var(--spacing-section)", minHeight: "70vh" }}>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Label style={{ color: "var(--color-muted-light)" }}>PEDIDO RECEBIDO</Label>
            <p className="mt-8" style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "var(--text-display)", lineHeight: 1.1 }}>
              {result}
            </p>
            <div className="mt-10 flex flex-col items-center gap-5">
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
      <div className="bg-paper" style={{ paddingTop: "clamp(120px, 16vw, 220px)", paddingBottom: "var(--spacing-section)", minHeight: "70vh" }}>
        <Container>
          <div className="flex flex-col items-start gap-6">
            <Label style={{ color: "var(--color-muted-light)" }}>CHECKOUT</Label>
            <p style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "var(--text-display)" }}>
              Sua sacola está vazia.
            </p>
            <GhostLink href="/colecao">VER A COLEÇÃO</GhostLink>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-paper" style={{ paddingTop: "clamp(96px, 12vw, 160px)", paddingBottom: "var(--spacing-section)" }}>
      <Container>
        <Label style={{ color: "var(--color-muted-light)" }}>CHECKOUT</Label>
        <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Formulário */}
          <form onSubmit={onSubmit} className="lg:col-span-7">
            <span className="caption" style={{ color: "var(--color-muted-light)" }}>CONTATO & ENTREGA</span>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8">
              {FIELDS.map((f) => (
                <label key={f.name} className={f.span === "full" ? "col-span-2" : "col-span-2 sm:col-span-1"}>
                  <span className="caption block" style={{ color: "var(--color-muted-light)" }}>
                    {f.label}{f.required ? "" : " (OPCIONAL)"}
                  </span>
                  <input
                    type={f.type ?? "text"}
                    required={f.required}
                    value={form[f.name] ?? ""}
                    onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                    className="mt-2 w-full bg-transparent pb-2 outline-none"
                    style={{ borderBottom: "1px solid var(--color-line-light)", fontFamily: "var(--font-sans)", fontSize: "var(--text-body)" }}
                  />
                </label>
              ))}
            </div>

            {/* Pagamento (abstraído) */}
            <div className="mt-12 border-t pt-8" style={{ borderColor: "var(--color-line-light)" }}>
              <span className="caption" style={{ color: "var(--color-muted-light)" }}>PAGAMENTO</span>
              <p className="mt-4 max-w-md" style={{ fontWeight: 300, color: "var(--color-muted-light)" }}>
                O pagamento online está sendo configurado. Ao confirmar, seu pedido
                é registrado e a finalização é combinada com a gente.
              </p>
            </div>

            <div className="mt-10">
              <Button type="submit" full disabled={submitting}>
                {submitting ? "PROCESSANDO…" : "CONFIRMAR PEDIDO"}
              </Button>
            </div>
          </form>

          {/* Resumo sticky */}
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-[92px]">
              <span className="caption" style={{ color: "var(--color-muted-light)" }}>SEU PEDIDO</span>
              <div className="mt-6 flex flex-col gap-5">
                {items.map((i) => (
                  <div key={i.key} className="flex items-start justify-between gap-4">
                    <div>
                      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>{i.name}</span>
                      <span className="caption block mt-1" style={{ color: "var(--color-muted-light)" }}>
                        {[i.variant, i.size, `x${i.qty}`].filter(Boolean).join(" · ")}
                      </span>
                    </div>
                    <span className="label whitespace-nowrap">{formatBRL(i.price * i.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between border-t py-5" style={{ borderColor: "var(--color-line-light)" }}>
                <span className="label">SUBTOTAL</span>
                <span className="label">{formatBRL(subtotal)}</span>
              </div>
              <p className="caption" style={{ color: "var(--color-muted-light)" }}>
                FRETE A COMBINAR · ESTOQUE LIMITADO
              </p>
              <div className="mt-6">
                <Link href="/sacola" className="caption hover:opacity-60" style={{ color: "var(--color-muted-light)" }}>
                  ← EDITAR SACOLA
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
