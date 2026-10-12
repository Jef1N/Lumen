import type { Metadata } from "next";
import { Container, Label } from "@/components/ui";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Contato — LUMEN",
  description: "Fale com a Lumen e entre na lista do próximo lançamento.",
};

export default function ContatoPage() {
  return (
    <div className="bg-paper" style={{ paddingTop: "clamp(96px, 14vw, 200px)", paddingBottom: "var(--spacing-section)" }}>
      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          {/* Lista de lançamento */}
          <div className="md:col-span-7">
            <Label style={{ color: "var(--color-muted-light)" }}>LISTA DE LANÇAMENTO</Label>
            <h1
              className="mt-6 max-w-xl"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "var(--text-display)", lineHeight: 1.05, letterSpacing: "-0.015em" }}
            >
              Nossas coleções são por lançamento, com estoque limitado.
            </h1>
            <p className="mt-8 max-w-md" style={{ fontWeight: 300, fontSize: "var(--text-body-lg)", lineHeight: 1.6 }}>
              Entre na lista e seja o primeiro a saber quando a próxima coleção cair.
            </p>
            <div className="mt-10 max-w-md">
              <NewsletterForm />
            </div>
          </div>

          {/* Contato direto */}
          <div className="md:col-span-4 md:col-start-9">
            <Label style={{ color: "var(--color-muted-light)" }}>FALE COM A GENTE</Label>
            <div className="mt-8 flex flex-col gap-6">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="group">
                <span className="caption block" style={{ color: "var(--color-muted-light)" }}>INSTAGRAM</span>
                <span className="group-hover:opacity-60" style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "var(--text-subheading)" }}>
                  @lumen
                </span>
              </a>
              <a href="mailto:contato@lumen.com" className="group">
                <span className="caption block" style={{ color: "var(--color-muted-light)" }}>E-MAIL</span>
                <span className="group-hover:opacity-60" style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "var(--text-subheading)" }}>
                  contato@lumen.com
                </span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
