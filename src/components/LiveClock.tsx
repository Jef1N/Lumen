"use client";

import { useEffect, useState } from "react";

const TZ = "America/Sao_Paulo";

function parts(d: Date) {
  const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long", timeZone: TZ }).format(d);
  const date = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric", timeZone: TZ,
  }).format(d).replace(/\//g, ".");
  const time = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: TZ,
  }).format(d);
  return { weekday: weekday.toUpperCase(), date, time };
}

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const p = now ? parts(now) : null;

  return (
    <div
      className="flex items-center justify-between gap-6 border-y py-5"
      style={{ borderColor: "var(--color-line-dark)" }}
    >
      <span className="nav flex items-center gap-3">
        <span
          className="inline-block h-[6px] w-[6px] rounded-full"
          style={{ background: "currentColor", animation: "pulse 2s ease-in-out infinite" }}
        />
        SÃO PAULO
      </span>
      <span className="nav tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }} suppressHydrationWarning>
        {p ? `${p.weekday} · ${p.date} · ${p.time}` : " "}
      </span>
    </div>
  );
}
