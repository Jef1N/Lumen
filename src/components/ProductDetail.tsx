"use client";

import { useState } from "react";
import { Product } from "@/data/collection";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui";

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
    <div className="lg:sticky lg:top-0 lg:h-screen lg:self-start">
      <div
        className="flex h-full flex-col justify-center"
        style={{
          paddingLeft: "clamp(20px, 6vw, 96px)",
          paddingRight: "clamp(20px, 6vw, 96px)",
          paddingTop: "clamp(64px, 10vh, 120px)",
          paddingBottom: "clamp(64px, 10vh, 120px)",
        }}
      >
        <h1 className="nav" style={{ fontSize: "1rem", letterSpacing: "0.14em" }}>{product.name}</h1>
        <span className="nav mt-5">{formatBRL(product.price)}</span>

        {/* Cor */}
        {product.variants && (
          <div className="mt-14">
            <span className="caption" style={{ opacity: 0.55 }}>COR</span>
            <div className="mt-4 flex flex-wrap gap-3">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVariant(v.id)}
                  className="nav border px-5 py-3 transition-colors duration-300"
                  style={
                    variant === v.id
                      ? { background: "var(--color-ink)", color: "var(--color-paper)", borderColor: "var(--color-ink)" }
                      : { borderColor: "var(--color-line)" }
                  }
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tamanho */}
        <div className="mt-10">
          <span className="caption" style={{ opacity: 0.55 }}>TAMANHO</span>
          <div className="mt-4 flex flex-wrap gap-3">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => { setSize(s); setError(false); }}
                className="nav border px-5 py-3 transition-colors duration-300"
                style={
                  size === s
                    ? { background: "var(--color-ink)", color: "var(--color-paper)", borderColor: "var(--color-ink)" }
                    : { borderColor: "var(--color-line)" }
                }
              >
                {s}
              </button>
            ))}
          </div>
          {error && <p className="caption mt-4" style={{ opacity: 0.55 }}>SELECIONE UM TAMANHO</p>}
        </div>

        <div className="mt-14">
          <Button full onClick={handleAdd}>ADICIONAR À SACOLA</Button>
        </div>

        {/* Descrição — pequena, discreta */}
        <p className="mt-14 max-w-sm" style={{ fontSize: "var(--text-body)", lineHeight: 1.7, opacity: 0.7 }}>
          {product.description}
        </p>
      </div>
    </div>
  );
}
