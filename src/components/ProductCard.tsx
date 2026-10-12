import Link from "next/link";
import { Product } from "@/data/collection";
import { formatBRL } from "@/lib/format";
import { Placeholder } from "./Placeholder";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produto/${product.slug}`} className="group block">
      <div className="overflow-hidden">
        <div className="transition-opacity duration-500 group-hover:opacity-70">
          <Placeholder ratio="3:4" />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="nav">{product.name}</span>
        <span className="nav">{formatBRL(product.price)}</span>
      </div>
    </Link>
  );
}
