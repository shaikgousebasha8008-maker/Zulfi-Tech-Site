import { useEffect, useRef, useState } from "react";

// First guess from the browser's time zone (no flicker for most visitors), then confirm with Cloudflare.
export function useCurrency() {
  const [cur, setCur] = useState(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      return /Kolkata|Calcutta/.test(tz) ? "INR" : "USD";
    } catch {
      return "USD";
    }
  });
  const picked = useRef(false);
  useEffect(() => {
    fetch("/api/geo")
      .then((r) => (r.ok ? r.json() : null))
      .then((g) => { if (g?.country && !picked.current) setCur(g.country === "IN" ? "INR" : "USD"); })
      .catch(() => {});
  }, []);
  return [cur, (c) => { picked.current = true; setCur(c); }];
}
