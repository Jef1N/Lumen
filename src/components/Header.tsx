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
  useEffect(() => setMenuOpen(false), [pathname]);

  const transparent = isHome && !scrolled && !menuOpen;
  const textColor = transparent ? "text-paper" : "text-ink";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          transparent ? "bg-transparent" : "bg-paper"
        } ${textColor}`}
      >
        <div
          className="flex items-center justify-between"
          style={{ paddingLeft: "clamp(20px, 6vw, 80px)", paddingRight: "clamp(20px, 6vw, 80px)", height: "76px" }}
        >
          <div className="flex flex-1 items-center">
            <nav className="hidden items-center gap-10 md:flex">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="nav link-underline">
                  {n.label}
                </Link>
              ))}
            </nav>
            <button className="nav md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
              {menuOpen ? "FECHAR" : "MENU"}
            </button>
          </div>

          <Link href="/" className="wordmark flex-1 text-center" style={{ fontSize: "1.75rem" }}>
            LUMEN
          </Link>

          <div className="flex flex-1 items-center justify-end">
            <button className="nav link-underline" onClick={openCart}>
              SACOLA ({mounted ? count : 0})
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-paper pt-[76px] md:hidden">
          <nav className="flex flex-col gap-10 px-6 py-16">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="nav text-ink" style={{ fontSize: "1rem" }}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
