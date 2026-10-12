import Link from "next/link";
import { Product } from "@/data/collection";
import { formatBRL } from "@/lib/format";
import { Placeholder } from "./Placeholder";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produto/${product.slug}`} className="group block">
      <div className="overflow-hidden">
        <div className="transition-opacity duration-500 group-hover:opacity-85">
          <Placeholder ratio="3:4" label={product.name.toUpperCase()} />
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
