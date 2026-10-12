import Link from "next/link";
import { CSSProperties, ReactNode } from "react";

/* Container centralizado com margens laterais fluidas */
export function Container({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full ${className}`}
      style={{
        maxWidth: wide ? "var(--max-content)" : "1200px",
        paddingLeft: "clamp(16px, 5vw, 64px)",
        paddingRight: "clamp(16px, 5vw, 64px)",
      }}
    >
      {children}
    </div>
  );
}

/* Eyebrow / label mono caixa alta */
export function Label({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={`label ${className}`} style={style}>
      {children}
    </span>
  );
}

/* Botão sólido (único controle de alta ênfase) */
export function Button({
  children,
  href,
  onClick,
  type = "button",
  tone = "ink",
  full = false,
  disabled = false,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  tone?: "ink" | "paper";
  full?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  const base =
    "label inline-flex items-center justify-center border transition-colors duration-200";
  const tones =
    tone === "ink"
      ? "bg-ink text-paper border-ink hover:bg-transparent hover:text-ink"
      : "bg-transparent text-paper border-paper hover:bg-paper hover:text-ink";
  const cls = `${base} ${tones} ${full ? "w-full" : ""} ${
    disabled ? "pointer-events-none opacity-40" : ""
  } ${className}`;
  const pad = { padding: "16px 32px" } as CSSProperties;

  if (href && !disabled) {
    return (
      <Link href={href} className={cls} style={pad}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} style={pad}>
      {children}
    </button>
  );
}

/* Ghost link — ação secundária, underline */
export function GhostLink({
  children,
  href,
  onClick,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const cls = `label inline-block border-b border-current pb-1 transition-opacity duration-200 hover:opacity-60 ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

/* Bloco de versículo — voz serif (sagrada) */
export function VerseBlock({
  verse,
  reference,
  tone = "light",
  className = "",
}: {
  verse: string;
  reference: string;
  tone?: "light" | "ink";
  className?: string;
}) {
  const muted = tone === "ink" ? "var(--color-muted-dark)" : "var(--color-muted-light)";
  return (
    <figure className={className}>
      <blockquote
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "var(--text-verse)",
          lineHeight: 1.4,
        }}
      >
        “{verse}”
      </blockquote>
      <figcaption className="caption mt-4" style={{ color: muted }}>
        {reference}
      </figcaption>
    </figure>
  );
}
