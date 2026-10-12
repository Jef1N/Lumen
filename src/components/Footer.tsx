import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-carbon text-paper">
      <div
        className="mx-auto"
        style={{
          maxWidth: "var(--max-content)",
          paddingLeft: "clamp(16px, 5vw, 64px)",
          paddingRight: "clamp(16px, 5vw, 64px)",
          paddingTop: "96px",
          paddingBottom: "48px",
        }}
      >
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {/* Newsletter */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "var(--text-heading)",
                lineHeight: 1.1,
              }}
            >
              Seja o primeiro a saber do próximo lançamento.
            </p>
            <div className="mt-8 max-w-md">
              <NewsletterForm tone="ink" />
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 md:justify-items-end">
            <nav className="flex flex-col gap-4">
              <span className="caption" style={{ color: "var(--color-muted-dark)" }}>
                NAVEGAR
              </span>
              <Link href="/colecao" className="label hover:opacity-60">COLEÇÃO</Link>
              <Link href="/sobre" className="label hover:opacity-60">SOBRE</Link>
              <Link href="/contato" className="label hover:opacity-60">CONTATO</Link>
            </nav>
            <nav className="flex flex-col gap-4">
              <span className="caption" style={{ color: "var(--color-muted-dark)" }}>
                SOCIAL
              </span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="label hover:opacity-60"
              >
                INSTAGRAM
              </a>
            </nav>
          </div>
        </div>

        <div
          className="mt-24 flex flex-col gap-4 border-t pt-8 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "var(--color-line-dark)" }}
        >
          <span
            style={{ fontFamily: "var(--font-sans)", fontWeight: 500, letterSpacing: "0.3em" }}
          >
            LUMEN
          </span>
          <span className="caption" style={{ color: "var(--color-muted-dark)" }}>
            © {new Date().getFullYear()} LUMEN · LUZ E SOMBRA · FEITO NO BRASIL
          </span>
        </div>
      </div>
    </footer>
  );
}
