import { useEffect } from "react";

// 3D depth for the site's visuals: windows, diagrams and cards lean toward the pointer.
// Each target gets the class "tilt3d" and the CSS variables --rx / --ry (degrees) that index.css turns
// into a perspective transform. Off for touch-only devices and for people who prefer reduced motion.
const TARGETS = ".macbook, .ad-wrap, .oa-diagram, .platform-panel, .service-card, .process-item, .hv-console";

export default function useTilt(rootRef, max = 7) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = [...root.querySelectorAll(TARGETS)];
    els.forEach((el) => el.classList.add("tilt3d"));
    if (!fine || reduce) return;
    const cleanups = els.map((el) => {
      const big = el.offsetWidth > 520; // large windows lean less
      const m = big ? max * 0.6 : max;
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--ry", `${(x * m).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-y * m).toFixed(2)}deg`);
        el.classList.add("tilting");
      };
      const leave = () => {
        el.style.removeProperty("--ry");
        el.style.removeProperty("--rx");
        el.classList.remove("tilting");
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
    });
    return () => cleanups.forEach((c) => c());
  }, [rootRef, max]);
}
