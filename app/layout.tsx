import type { Metadata } from "next";
import { Hanken_Grotesk, Space_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Announcement } from "@/components/Announcement";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Intro } from "@/components/Intro";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-hanken",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUMEN — Streetwear",
  description:
    "Lumen. Luz e sombra. Streetwear com mensagem cristocêntrica e design de autor. Coleção Santidade — estoque limitado.",
  openGraph: {
    title: "LUMEN",
    description: "Luz e sombra. Streetwear de autor. Coleção Santidade.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${hanken.variable} ${spaceMono.variable} ${fraunces.variable}`}>
      <body>
        <SmoothScroll />
        <Intro />
        <Announcement />
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
