import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";
import { LiveClock } from "./LiveClock";

export function Footer() {
  return (
    <footer data-header-theme="dark" className="overflow-hidden bg-ink text-paper">
      <div style={{ paddingLeft: "clamp(20px, 6vw, 80px)", paddingRight: "clamp(20px, 6vw, 80px)", paddingTop: "96px" }}>
        {/* Topo — newsletter + links */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-12">
          <div className="col-span-2 md:col-span-6">
            <NewsletterForm tone="ink" />
          </div>
          <nav className="flex flex-col gap-5 md:col-span-3 md:col-start-8">
            <Link href="/colecao" className="nav link-underline">COLEÇÃO</Link>
            <Link href="/sobre" className="nav link-underline">SOBRE</Link>
            <Link href="/contato" className="nav link-underline">CONTATO</Link>
          </nav>
          <nav className="flex flex-col gap-5 md:col-span-2 md:col-start-11">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="nav link-underline">INSTAGRAM</a>
            <a href="mailto:contato@lumen.com" className="nav link-underline">E-MAIL</a>
          </nav>
        </div>

        {/* Relógio ao vivo */}
        <div className="mt-24">
          <LiveClock />
        </div>

        {/* Legal */}
        <div className="mt-8 flex items-center justify-between">
          <span className="caption" style={{ opacity: 0.55 }}>© {new Date().getFullYear()} LUMEN</span>
          <span className="caption" style={{ opacity: 0.55 }}>LUZ E SOMBRA</span>
        </div>
      </div>

      {/* Wordmark colossal — sangra a base */}
      <div className="mt-12 select-none" aria-hidden="true">
        <span className="footer-mark">LUMEN</span>
      </div>
    </footer>
  );
}
