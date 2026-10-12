import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Intro } from "@/components/Intro";

// Didone — usada apenas no wordmark (como o logotipo da Saint Laurent).
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bodoni",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUMEN",
  description: "Lumen. Coleção Santidade.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={bodoni.variable}>
      <body>
        <SmoothScroll />
        <Intro />
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
