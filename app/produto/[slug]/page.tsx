import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/data/collection";
import { Placeholder } from "@/components/Placeholder";
import { ProductDetail } from "@/components/ProductDetail";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produto — LUMEN" };
  return {
    title: `${product.name} — LUMEN`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="bg-paper">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Galeria — sangra à esquerda, empilhada */}
        <div className="flex flex-col gap-2 lg:gap-3">
          {Array.from({ length: product.gallery }).map((_, i) => (
            <Reveal key={i} variant="mask">
              <Placeholder
                ratio={i === 0 ? "4:5" : "3:2"}
                label={i === 0 ? product.name.toUpperCase() : `VISTA ${i + 1}`}
              />
            </Reveal>
          ))}
        </div>

        {/* Info — sticky à direita */}
        <ProductDetail product={product} />
      </div>
    </div>
  );
}
