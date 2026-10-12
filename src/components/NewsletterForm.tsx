"use client";

import { useState } from "react";

export function NewsletterForm({ tone = "light" }: { tone?: "light" | "ink" }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const border = tone === "ink" ? "var(--color-paper)" : "var(--color-ink)";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail("");
  }

  if (done) {
    return <p className="caption" style={{ opacity: 0.6 }}>RECEBIDO. ATÉ O LANÇAMENTO.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-4">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="NEWSLETTER — SEU E-MAIL"
        className="nav w-full bg-transparent pb-3 outline-none placeholder:opacity-50"
        style={{ borderBottom: `1px solid ${border}` }}
      />
      <button type="submit" className="nav shrink-0 link-underline">ENVIAR</button>
    </form>
  );
}
