"use client";

import { useState } from "react";

export function NewsletterForm({ tone = "light" }: { tone?: "light" | "ink" }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const border = tone === "ink" ? "var(--color-paper)" : "var(--color-ink)";
  const muted = tone === "ink" ? "var(--color-muted-dark)" : "var(--color-muted-light)";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: integrar provedor de e-mail (Resend/Mailchimp/etc.)
    setDone(true);
    setEmail("");
  }

  if (done) {
    return (
      <p className="label" style={{ color: muted }}>
        RECEBIDO. ATÉ O LANÇAMENTO.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex items-end gap-4">
      <label className="flex-1">
        <span className="caption block mb-2" style={{ color: muted }}>
          SEU E-MAIL
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
          className="w-full bg-transparent pb-2 outline-none"
          style={{
            borderBottom: `1px solid ${border}`,
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-body)",
          }}
        />
      </label>
      <button type="submit" className="label border-b border-current pb-2 hover:opacity-60">
        ENVIAR
      </button>
    </form>
  );
}
