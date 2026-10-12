import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { Container, Label, VerseBlock, GhostLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sobre — LUMEN",
  description:
    "Lumen nasceu da parceria entre Lemos e Edi: camisetas para a igreja que não têm cara de camiseta de igreja. Design de autor, mensagem cristocêntrica.",
};

export default function SobrePage() {
  return (
    <div className="bg-paper">
      {/* Abertura */}
      <section style={{ paddingTop: "clamp(96px, 14vw, 200px)", paddingBottom: "var(--spacing-section)" }}>
        <Container>
          <Label style={{ color: "var(--color-muted-light)" }}>SOBRE A LUMEN</Label>
          <h1
            className="mt-8 max-w-4xl"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "var(--text-display-xl)", lineHeight: 1.02, letterSpacing: "-0.02em" }}
          >
            Luz é para ser vista.
          </h1>
          <p className="mt-10 max-w-2xl" style={{ fontWeight: 300, fontSize: "var(--text-body-lg)", lineHeight: 1.6 }}>
            Lumen significa luz, em latim. Uma marca de streetwear cristã com um
            propósito simples: propagar a Palavra sem abrir mão do estilo.
          </p>
        </Container>
      </section>

      {/* Imagem editorial full-bleed */}
      <Placeholder ratio="3:2" label="EDITORIAL — LUMEN" />

      {/* Manifesto */}
      <section style={{ paddingTop: "var(--spacing-section)", paddingBottom: "var(--spacing-section)" }}>
        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <Label style={{ color: "var(--color-muted-light)" }}>O MANIFESTO</Label>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <Reveal>
                <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--text-heading)", lineHeight: 1.3 }}>
                  A Lumen nasceu da vontade de produzir camisetas para a igreja
                  que não tivessem cara de camiseta de igreja ou de congresso.
                  Peças que você veste no dia a dia, no rolê, com orgulho.
                </p>
                <p className="mt-8 max-w-xl" style={{ fontWeight: 300, fontSize: "var(--text-body-lg)", lineHeight: 1.6, color: "var(--color-muted-light)" }}>
                  Cada peça carrega uma mensagem bíblica e cristocêntrica, vestida
                  em um design que se destaca primeiro pela estética. Quem passa
                  vê a peça — e leva a mensagem junto, sem perceber. O melhor
                  design, o melhor material, o melhor posicionamento.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Fundadores — banda escura */}
      <section className="bg-ink text-paper" style={{ paddingTop: "var(--spacing-section)", paddingBottom: "var(--spacing-section)" }}>
        <Container>
          <Label style={{ color: "var(--color-muted-dark)" }}>QUEM FAZ</Label>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
            <Reveal>
              <div className="mb-6 w-full md:w-2/3">
                <Placeholder ratio="4:5" tone="ink" label="LEMOS" />
              </div>
              <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "var(--text-subheading)" }}>
                Lemos
              </h3>
              <span className="caption" style={{ color: "var(--color-muted-dark)" }}>
                DESIGNER & DIRETOR CRIATIVO
              </span>
              <p className="mt-4 max-w-sm" style={{ fontWeight: 300, color: "var(--color-muted-dark)" }}>
                Responsável pelas peças e pela estratégia da marca.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="mb-6 w-full md:w-2/3">
                <Placeholder ratio="4:5" tone="ink" label="EDI" />
              </div>
              <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "var(--text-subheading)" }}>
                Edi
              </h3>
              <span className="caption" style={{ color: "var(--color-muted-dark)" }}>
                FINANCEIRO & VENDAS
              </span>
              <p className="mt-4 max-w-sm" style={{ fontWeight: 300, color: "var(--color-muted-dark)" }}>
                À frente da operação, das vendas e do que mantém a marca de pé.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Versículo de fecho */}
      <section style={{ paddingTop: "var(--spacing-section)", paddingBottom: "var(--spacing-section)" }}>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <VerseBlock
              verse="Assim brilhe também a vossa luz diante dos homens, para que vejam as vossas boas obras."
              reference="Mateus 5.16"
            />
            <div className="mt-10">
              <GhostLink href="/colecao">VER A COLEÇÃO</GhostLink>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
