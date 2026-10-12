import Link from "next/link";
import { PRODUCTS, COLLECTION } from "@/data/collection";
import { Placeholder } from "@/components/Placeholder";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Container, Label, GhostLink } from "@/components/ui";

export default function Home() {
  return (
    <>
      {/* HERO — full-bleed escuro, caption embaixo */}
      <section className="relative -mt-[68px] h-screen min-h-[640px] w-full bg-ink text-paper">
        <div className="absolute inset-0">
          <Placeholder fill tone="ink" label="HERO — EDITORIAL SANTIDADE" />
        </div>
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ paddingLeft: "clamp(16px, 5vw, 64px)", paddingRight: "clamp(16px, 5vw, 64px)", paddingBottom: "clamp(32px, 6vw, 72px)" }}
        >
          <Label style={{ color: "var(--color-muted-dark)" }}>
            COLEÇÃO {COLLECTION.name.toUpperCase()} — {COLLECTION.index}
          </Label>
          <h1
            className="mt-6 max-w-5xl"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: "var(--text-display-xl)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
            }}
          >
            Vós sois a luz do mundo.
          </h1>
          <div className="mt-8">
            <GhostLink href="/colecao">VER A COLEÇÃO</GhostLink>
          </div>
        </div>
      </section>

      {/* MANIFESTO — banda escura */}
      <section className="bg-ink text-paper" style={{ paddingTop: "var(--spacing-section)", paddingBottom: "var(--spacing-section)" }}>
        <Container>
          <Reveal>
            <Label style={{ color: "var(--color-muted-dark)" }}>O QUE É A LUMEN</Label>
            <p
              className="mt-8 max-w-4xl"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--text-display)", lineHeight: 1.15, letterSpacing: "-0.01em" }}
            >
              Peças que carregam a Palavra sem perder o estilo. Design de autor,
              material de verdade, mensagem cristocêntrica — para usar no rolê,
              no dia a dia, com orgulho.
            </p>
            <div className="mt-10">
              <GhostLink href="/sobre">A HISTÓRIA</GhostLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* COLEÇÃO — canvas claro */}
      <section className="bg-paper" style={{ paddingTop: "var(--spacing-section)", paddingBottom: "var(--spacing-section)" }}>
        <Container>
          <Reveal className="mb-16 flex items-end justify-between">
            <div>
              <Label style={{ color: "var(--color-muted-light)" }}>COLEÇÃO {COLLECTION.index}</Label>
              <h2 className="mt-4" style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--text-heading)" }}>
                {COLLECTION.name}
              </h2>
            </div>
            <div className="hidden md:block">
              <GhostLink href="/colecao">VER TUDO</GhostLink>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
            {PRODUCTS.map((p, idx) => (
              <Reveal key={p.slug} delay={idx * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* TEASER — banda escura antes do footer */}
      <section className="relative h-[70vh] min-h-[480px] w-full bg-ink text-paper">
        <div className="absolute inset-0">
          <Placeholder fill tone="ink" label="LOOKBOOK — EM BREVE" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ paddingLeft: "clamp(16px,5vw,64px)", paddingRight: "clamp(16px,5vw,64px)" }}>
          <Label style={{ color: "var(--color-muted-dark)" }}>PRÓXIMO CAPÍTULO</Label>
          <p
            className="mt-6 max-w-2xl"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontStyle: "italic", fontSize: "var(--text-display)", lineHeight: 1.1 }}
          >
            A luz não se acende para ficar escondida.
          </p>
          <div className="mt-8">
            <Link href="/contato" className="label border-b border-current pb-1 hover:opacity-60">
              ENTRAR NA LISTA
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
