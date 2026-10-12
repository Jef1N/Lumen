import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sobre — LUMEN",
};

export default function SobrePage() {
  return (
    <div className="bg-paper">
      {/* Declaração — texto pequeno, muito respiro */}
      <Container>
        <div
          className="mx-auto max-w-xl text-center"
          style={{ paddingTop: "clamp(180px, 26vh, 320px)", paddingBottom: "var(--section-gap)" }}
        >
          <p style={{ fontSize: "var(--text-body)", lineHeight: 1.9, letterSpacing: "0.01em" }}>
            Lumen significa luz. Uma marca de streetwear com mensagem
            cristocêntrica e design de autor — peças para usar no dia a dia,
            sem abrir mão do estilo.
          </p>
        </div>
      </Container>

      {/* Imagem editorial full-bleed */}
      <Reveal variant="mask">
        <Placeholder ratio="16:9" />
      </Reveal>

      {/* Fundadores — mínimo */}
      <Container>
        <div
          className="grid grid-cols-2 gap-x-10 gap-y-16"
          style={{ paddingTop: "var(--section-gap)", paddingBottom: "var(--section-gap)" }}
        >
          <Reveal>
            <Placeholder ratio="4:5" />
            <div className="mt-6">
              <span className="nav block">LEMOS</span>
              <span className="caption mt-2 block" style={{ opacity: 0.55 }}>DIREÇÃO CRIATIVA</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Placeholder ratio="4:5" />
            <div className="mt-6">
              <span className="nav block">EDI</span>
              <span className="caption mt-2 block" style={{ opacity: 0.55 }}>VENDAS & OPERAÇÃO</span>
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
