import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div style={{ paddingLeft: "clamp(20px, 6vw, 80px)", paddingRight: "clamp(20px, 6vw, 80px)", paddingTop: "96px", paddingBottom: "56px" }}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-16 md:grid-cols-4">
          <nav className="flex flex-col gap-5">
            <Link href="/colecao" className="nav link-underline">COLEÇÃO</Link>
            <Link href="/sobre" className="nav link-underline">SOBRE</Link>
            <Link href="/contato" className="nav link-underline">CONTATO</Link>
          </nav>
          <nav className="flex flex-col gap-5">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="nav link-underline">INSTAGRAM</a>
          </nav>
          <div className="col-span-2 md:col-span-2">
            <NewsletterForm tone="ink" />
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <span className="wordmark" style={{ fontSize: "1.5rem" }}>LUMEN</span>
          <span className="caption" style={{ opacity: 0.55 }}>
            © {new Date().getFullYear()} LUMEN
          </span>
        </div>
      </div>
    </footer>
  );
}
