import type { Metadata } from "next";
import { PRODUCTS, COLLECTION } from "@/data/collection";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Coleção — LUMEN",
};

export default function ColecaoPage() {
  return (
    <div className="bg-paper">
      <Container>
        <div style={{ paddingTop: "clamp(160px, 22vh, 260px)", paddingBottom: "clamp(80px, 14vh, 160px)" }} className="text-center">
          <span className="label">{COLLECTION.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-24 sm:grid-cols-2 lg:grid-cols-3" style={{ paddingBottom: "var(--section-gap)" }}>
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
