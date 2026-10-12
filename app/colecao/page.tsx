import type { Metadata } from "next";
import { PRODUCTS, COLLECTION } from "@/data/collection";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Container, Label, VerseBlock } from "@/components/ui";

export const metadata: Metadata = {
  title: "Coleção Santidade — LUMEN",
  description: COLLECTION.statement,
};

export default function ColecaoPage() {
  return (
    <div className="bg-paper">
      {/* Cabeçalho editorial da coleção */}
      <section style={{ paddingTop: "clamp(96px, 14vw, 200px)", paddingBottom: "var(--spacing-section)" }}>
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <Label style={{ color: "var(--color-muted-light)" }}>
                COLEÇÃO {COLLECTION.index}
              </Label>
              <h1
                className="mt-6"
                style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--text-display-xl)", lineHeight: 1.02, letterSpacing: "-0.02em" }}
              >
                {COLLECTION.name}
              </h1>
              <p className="mt-8 max-w-xl" style={{ fontWeight: 300, fontSize: "var(--text-body-lg)" }}>
                {COLLECTION.statement}
              </p>
            </div>
            <div className="md:col-span-4 md:col-start-9 md:self-end">
              <VerseBlock
                verse="A vossa luz brilhe diante dos homens."
                reference="Mt 5.16"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Grid de produtos */}
      <section style={{ paddingBottom: "var(--spacing-section)" }}>
        <Container>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
            {PRODUCTS.map((p, idx) => (
              <Reveal key={p.slug} delay={idx * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
