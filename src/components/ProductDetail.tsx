"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/data/collection";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { Button, VerseBlock } from "@/components/ui";

export function ProductDetail({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [variant, setVariant] = useState(product.variants?.[0]?.id);
  const [size, setSize] = useState<string>();
  const [error, setError] = useState(false);

  const variantLabel = product.variants?.find((v) => v.id === variant)?.label;

  function handleAdd() {
    if (!size) {
      setError(true);
      return;
    }
    add({
      slug: product.slug,
      name: product.name,
      category: product.category,
      price: product.price,
      variant: variantLabel,
      size,
    });
  }

  return (
    <div className="lg:sticky lg:top-[68px] lg:h-fit">
      <div
        className="flex flex-col"
        style={{
          paddingLeft: "clamp(16px, 5vw, 80px)",
          paddingRight: "clamp(16px, 5vw, 80px)",
          paddingTop: "clamp(48px, 7vw, 96px)",
          paddingBottom: "clamp(48px, 7vw, 96px)",
        }}
      >
        <Link href="/colecao" className="caption mb-10 hover:opacity-60" style={{ color: "var(--color-muted-light)" }}>
          ← COLEÇÃO SANTIDADE
        </Link>

        <span className="caption" style={{ color: "var(--color-muted-light)" }}>
          {product.category}
        </span>
        <h1 className="mt-2" style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--text-display)", lineHeight: 1.05 }}>
          {product.name}
        </h1>
        <span className="label mt-4">{formatBRL(product.price)}</span>

        {/* Versículo da peça */}
        <div className="my-10 border-y py-8" style={{ borderColor: "var(--color-line-light)" }}>
          <VerseBlock verse={product.verse} reference={product.verseRef} />
        </div>

        <p className="max-w-md" style={{ fontWeight: 300, fontSize: "var(--text-body-lg)", lineHeight: 1.6 }}>
          {product.description}
        </p>

        {/* Variantes */}
        {product.variants && (
          <div className="mt-10">
            <span className="caption" style={{ color: "var(--color-muted-light)" }}>COR</span>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVariant(v.id)}
                  className="label border px-5 py-3 transition-colors duration-200"
                  style={
                    variant === v.id
                      ? { background: "var(--color-ink)", color: "var(--color-paper)", borderColor: "var(--color-ink)" }
                      : { borderColor: "var(--color-line-light)" }
                  }
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tamanhos */}
        <div className="mt-8">
          <span className="caption" style={{ color: "var(--color-muted-light)" }}>TAMANHO</span>
          <div className="mt-3 flex flex-wrap gap-3">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSize(s);
                  setError(false);
                }}
                className="label border px-5 py-3 transition-colors duration-200"
                style={
                  size === s
                    ? { background: "var(--color-ink)", color: "var(--color-paper)", borderColor: "var(--color-ink)" }
                    : { borderColor: "var(--color-line-light)" }
                }
              >
                {s}
              </button>
            ))}
          </div>
          {error && (
            <p className="caption mt-3" style={{ color: "var(--color-ink)" }}>
              SELECIONE UM TAMANHO
            </p>
          )}
        </div>

        <div className="mt-10">
          <Button full onClick={handleAdd}>
            ADICIONAR À SACOLA
          </Button>
        </div>

        <p className="caption mt-5" style={{ color: "var(--color-muted-light)" }}>
          ESTOQUE LIMITADO · ENQUANTO DURAR A COLEÇÃO
        </p>
      </div>
    </div>
  );
}
