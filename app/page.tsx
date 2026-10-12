import Link from "next/link";
import { PRODUCTS, COLLECTION } from "@/data/collection";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";

/* Legenda editorial — 2 linhas centralizadas perto da base da imagem */
function Caption({ title, action, href }: { title: string; action: string; href: string }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center" style={{ paddingBottom: "clamp(32px, 6vh, 64px)" }}>
      <span className="label">{title}</span>
      <Link href={href} className="caption mt-4 border-b border-current pb-1 transition-opacity duration-300 hover:opacity-60">
        {action}
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Frame 1 — hero da coleção */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-ink text-paper">
        <div className="hero-zoom absolute inset-0">
          <Placeholder fill tone="ink" />
        </div>
        <div className="hero-rise" style={{ ["--hero-delay" as string]: "400ms" }}>
          <Caption title={COLLECTION.name} action="DESCUBRA A COLEÇÃO" href="/colecao" />
        </div>
      </section>

      {/* Frames de produto — full-bleed empilhados */}
      {PRODUCTS.map((p) => (
        <section key={p.slug} className="relative h-screen min-h-[600px] w-full overflow-hidden bg-ink text-paper">
          <Reveal variant="mask" className="absolute inset-0">
            <Placeholder fill tone="ink" />
          </Reveal>
          <Caption title={p.name} action="VER PEÇA" href={`/produto/${p.slug}`} />
        </section>
      ))}
    </>
  );
}
