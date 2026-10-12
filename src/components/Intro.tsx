"use client";

import { useEffect, useState } from "react";

export function Intro() {
  // Cobre a tela já no primeiro paint; toca só uma vez por sessão.
  const [show, setShow] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("lumen-intro") === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setShow(false);
      return;
    }

    try {
      sessionStorage.setItem("lumen-intro", "1");
    } catch {}

    const t1 = setTimeout(() => setDone(true), 1400); // inicia a subida
    const t2 = setTimeout(() => setShow(false), 2400); // remove do DOM
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`intro ${done ? "is-done" : ""}`} aria-hidden="true">
      <span className="intro-word">LUMEN</span>
    </div>
  );
}
