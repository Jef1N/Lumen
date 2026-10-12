"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart, selectCount } from "@/lib/cart";

const NAV = [
  { href: "/colecao", label: "COLEÇÃO" },
  { href: "/sobre", label: "SOBRE" },
  { href: "/contato", label: "CONTATO" },
];

const HEADER_H = 76;
const LINE = 24; // linha de detecção do fundo, perto do topo do header

export function Header() {
  const pathname = usePathname();
  const count = useCart(selectCount);
  const openCart = useCart((s) => s.open);

  const [hidden, setHidden] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(pathname === "/" ? "dark" : "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    function detectTheme() {
      const marks = document.querySelectorAll<HTMLElement>("[data-header-theme]");
      let found: "light" | "dark" | null = null;
      marks.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= LINE && r.bottom >= LINE) {
          found = el.dataset.headerTheme === "dark" ? "dark" : "light";
        }
      });
      if (found) setTheme(found);
    }

    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastY.current;
        if (y < 80) setHidden(false);
        else if (dy > 3) setHidden(true);
        else if (dy < -3) setHidden(false);
        lastY.current = y;
        detectTheme();
        ticking.current = false;
      });
    }

    lastY.current = window.scrollY;
    detectTheme();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", detectTheme);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", detectTheme);
    };
  }, [pathname]);

  // Com o menu aberto, header sempre visível e em preto sobre o overlay claro.
  const color = menuOpen ? "text-ink" : theme === "dark" ? "text-paper" : "text-ink";
  const translated = hidden && !menuOpen ? "-translate-y-full" : "translate-y-0";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-transform duration-500 ${translated} ${color}`}
        style={{ transitionTimingFunction: "var(--ease-editorial)" }}
      >
        <div
          className="flex items-center justify-between"
          style={{ paddingLeft: "clamp(20px, 6vw, 80px)", paddingRight: "clamp(20px, 6vw, 80px)", height: `${HEADER_H}px` }}
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
