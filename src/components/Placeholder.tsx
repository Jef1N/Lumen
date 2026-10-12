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
 * Slot de imagem — cinza chapado, sem texto, sem borda.
 * Substituído por <Image> quando as fotos chegarem.
 */
export function Placeholder({
  ratio = "3:4",
  tone = "light",
  className = "",
  style,
  fill = false,
}: {
  ratio?: Ratio;
  tone?: "light" | "ink";
  className?: string;
  style?: CSSProperties;
  fill?: boolean;
}) {
  const bg = tone === "ink" ? "var(--color-placeholder-dark)" : "var(--color-placeholder)";
  return (
    <div
      className={`w-full ${className}`}
      style={{
        background: bg,
        aspectRatio: fill ? undefined : ratioMap[ratio],
        height: fill ? "100%" : undefined,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
