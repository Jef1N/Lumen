import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Contato — LUMEN",
};

export default function ContatoPage() {
  return (
    <div className="bg-paper" style={{ minHeight: "80vh" }}>
      <Container>
        <div
          className="mx-auto flex max-w-md flex-col items-center gap-16 text-center"
          style={{ paddingTop: "clamp(180px, 26vh, 320px)", paddingBottom: "var(--section-gap)" }}
        >
          <p style={{ fontSize: "var(--text-body)", lineHeight: 1.9 }}>
            Coleções por lançamento, estoque limitado. Entre na lista e seja o
            primeiro a saber do próximo drop.
          </p>

          <div className="w-full">
            <NewsletterForm />
          </div>

          <div className="flex flex-col items-center gap-5">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="nav link-underline">INSTAGRAM</a>
            <a href="mailto:contato@lumen.com" className="nav link-underline">CONTATO@LUMEN.COM</a>
          </div>
        </div>
      </Container>
    </div>
  );
}
