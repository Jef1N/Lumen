import Link from "next/link";
import { CSSProperties, ReactNode } from "react";

/* Container centralizado — respiro lateral amplo */
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
        maxWidth: wide ? "1600px" : "1200px",
        paddingLeft: "clamp(20px, 6vw, 80px)",
        paddingRight: "clamp(20px, 6vw, 80px)",
      }}
    >
      {children}
    </div>
  );
}

/* Botão sólido — flip de valor no hover (único controle de ênfase) */
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
  const base = "nav inline-flex items-center justify-center border transition-colors duration-300";
  const tones =
    tone === "ink"
      ? "bg-ink text-paper border-ink hover:bg-paper hover:text-ink"
      : "bg-transparent text-paper border-paper hover:bg-paper hover:text-ink";
  const cls = `${base} ${tones} ${full ? "w-full" : ""} ${disabled ? "pointer-events-none opacity-40" : ""} ${className}`;
  const pad = { padding: "18px 40px" } as CSSProperties;

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

/* Link de texto — underline, caixa alta tracked */
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
  const cls = `nav inline-block border-b border-current pb-[3px] transition-opacity duration-300 hover:opacity-60 ${className}`;
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
