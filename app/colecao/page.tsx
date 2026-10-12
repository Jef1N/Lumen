import type { Metadata } from "next";
import { PRODUCTS, COLLECTION } from "@/data/collection";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Placeholder } from "@/components/Placeholder";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Coleção — LUMEN",
};

export default function ColecaoPage() {
  return (
    <div data-header-theme="light" className="bg-paper">
      {/* Imagem editorial da coleção — largura cheia, altura reduzida */}
      <div style={{ height: "clamp(420px, 64vh, 760px)" }}>
        <Placeholder fill />
      </div>

      {/* Storytelling da coleção */}
      <Container>
        <div
          className="mx-auto max-w-xl text-center"
          style={{ paddingTop: "clamp(72px, 12vh, 140px)", paddingBottom: "clamp(72px, 12vh, 140px)" }}
        >
          <span className="label">{COLLECTION.name} — {COLLECTION.index}</span>
          <div className="mt-12 flex flex-col gap-8">
            {COLLECTION.story.map((p, i) => (
              <p key={i} style={{ fontSize: "var(--text-body)", lineHeight: 1.9, letterSpacing: "0.01em" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Container>

      {/* Grade de produtos */}
      <Container>
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
