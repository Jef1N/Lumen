import Link from "next/link";
import { Product } from "@/data/collection";
import { formatBRL } from "@/lib/format";
import { Placeholder } from "./Placeholder";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produto/${product.slug}`} className="group block">
      <div className="relative overflow-hidden">
        <div
          className="transition-transform duration-[900ms] group-hover:scale-[1.04]"
          style={{ transitionTimingFunction: "var(--ease-editorial)" }}
        >
          <Placeholder ratio="3:4" label={product.name.toUpperCase()} />
        </div>
        {/* Overlay "VER PEÇA" — desliza de baixo no hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden">
          <div
            className="translate-y-full bg-ink/90 px-4 py-3 text-center transition-transform duration-500 group-hover:translate-y-0"
            style={{ transitionTimingFunction: "var(--ease-editorial)" }}
          >
            <span className="label" style={{ color: "var(--color-paper)" }}>
              VER PEÇA
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div>
          <span className="caption block" style={{ color: "var(--color-muted-light)" }}>
            {product.category}
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
            {product.name}
          </span>
        </div>
        <span className="label whitespace-nowrap">{formatBRL(product.price)}</span>
      </div>
    </Link>
  );
}
