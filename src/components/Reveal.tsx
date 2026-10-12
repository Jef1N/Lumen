"use client";

import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  variant?: "up" | "mask";
  as?: "div" | "section" | "li" | "article" | "span";
  className?: string;
  style?: CSSProperties;
};

export function Reveal({
  children,
  delay = 0,
  variant = "up",
  as: Tag = "div",
  className = "",
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base = variant === "mask" ? "reveal-mask" : "reveal";
  const Component = Tag as "div";
  return (
    <Component
      ref={ref}
      className={`${base} ${visible ? "is-visible" : ""} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms`, ...style }}
    >
      {children}
    </Component>
  );
}
