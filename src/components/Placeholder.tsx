import { CSSProperties } from "react";

type Ratio = "hero" | "3:4" | "4:5" | "3:2" | "1:1" | "16:9";

const ratioMap: Record<Ratio, string> = {
  hero: "16 / 10",
  "3:4": "3 / 4",
  "4:5": "4 / 5",
  "3:2": "3 / 2",
  "1:1": "1 / 1",
  "16:9": "16 / 9",
};

/**
 * Slot de imagem — preenchimento cinza chapado (sem degradê).
 * Substituído por <Image> quando as fotos chegarem.
 * `tone="ink"` para uso sobre fundo escuro.
 */
export function Placeholder({
  ratio = "3:4",
  tone = "light",
  label,
  className = "",
  style,
  fill = false,
}: {
  ratio?: Ratio;
  tone?: "light" | "ink";
  label?: string;
  className?: string;
  style?: CSSProperties;
  fill?: boolean;
}) {
  const bg = tone === "ink" ? "var(--color-placeholder-ink)" : "var(--color-placeholder)";
  const fg = tone === "ink" ? "var(--color-muted-dark)" : "var(--color-muted-light)";

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        background: bg,
        aspectRatio: fill ? undefined : ratioMap[ratio],
        height: fill ? "100%" : undefined,
        ...style,
      }}
      aria-hidden="true"
    >
      {label ? (
        <span
          className="caption absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"
          style={{ color: fg }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
