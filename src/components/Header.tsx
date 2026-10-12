"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart, selectCount } from "@/lib/cart";

const NAV = [
  { href: "/colecao", label: "COLEÇÃO" },
  { href: "/sobre", label: "SOBRE" },
  { href: "/contato", label: "CONTATO" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const count = useCart(selectCount);
  const openCart = useCart((s) => s.open);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Transparente (texto claro) só no topo da home; sólido (texto ink) nas demais.
  const transparent = isHome && !scrolled && !menuOpen;
  const textColor = transparent ? "text-paper" : "text-ink";

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-300 ${
          transparent ? "bg-transparent" : "bg-paper border-b border-line-light"
        } ${textColor}`}
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{
            maxWidth: "var(--max-content)",
            paddingLeft: "clamp(16px, 5vw, 64px)",
            paddingRight: "clamp(16px, 5vw, 64px)",
            height: "68px",
          }}
        >
          {/* Esquerda: nav desktop + toggle mobile */}
          <div className="flex flex-1 items-center">
            <nav className="hidden items-center gap-8 md:flex">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="label link-underline">
                  {n.label}
                </Link>
              ))}
            </nav>
            <button
              className="label md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              {menuOpen ? "FECHAR" : "MENU"}
            </button>
          </div>

          {/* Centro: wordmark (placeholder até o logo chegar) */}
          <Link
            href="/"
            className="flex-1 text-center"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              letterSpacing: "0.3em",
              fontSize: "1.125rem",
            }}
          >
            LUMEN
          </Link>

          {/* Direita: sacola */}
          <div className="flex flex-1 items-center justify-end">
            <button className="label hover:opacity-60 transition-opacity" onClick={openCart}>
              SACOLA ({mounted ? count : 0})
            </button>
          </div>
        </div>
      </header>

      {/* Overlay de menu mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-paper pt-[68px] md:hidden">
          <nav className="flex flex-col gap-8 px-6 py-12">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-ink"
                style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--text-heading)" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
