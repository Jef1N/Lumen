import type { Metadata } from "next";
import { ABOUT } from "@/data/collection";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sobre — LUMEN",
};

export default function SobrePage() {
  return (
    <div data-header-theme="light" className="bg-paper">
      {/* Abertura — declaração em Didone + história */}
      <Container>
        <div
          className="mx-auto max-w-2xl text-center"
          style={{ paddingTop: "clamp(180px, 26vh, 320px)", paddingBottom: "var(--section-gap)" }}
        >
          <p className="wordmark" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.2 }}>
            {ABOUT.lead}
          </p>
          <div className="mx-auto mt-14 flex max-w-xl flex-col gap-8">
            {ABOUT.story.map((p, i) => (
              <p key={i} style={{ fontSize: "var(--text-body)", lineHeight: 1.9, letterSpacing: "0.01em" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Container>

      {/* Imagem editorial full-bleed */}
      <Reveal variant="mask">
        <Placeholder ratio="16:9" />
      </Reveal>

      {/* Fundadores */}
      <Container>
        <div
          className="grid grid-cols-2 gap-x-10 gap-y-16"
          style={{ paddingTop: "var(--section-gap)", paddingBottom: "var(--section-gap)" }}
        >
          <Reveal>
            <Placeholder ratio="4:5" />
            <span className="nav mt-6 block">LEMOS</span>
          </Reveal>
          <Reveal delay={100}>
            <Placeholder ratio="4:5" />
            <span className="nav mt-6 block">EDI</span>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
