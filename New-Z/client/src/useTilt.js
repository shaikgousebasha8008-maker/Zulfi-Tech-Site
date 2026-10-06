import { useEffect } from "react";

// 3D depth for the site's cards and visuals: they lean toward the pointer, lift toward the viewer,
// and a soft glare follows the pointer. Each target gets the class "tilt3d" plus CSS variables
// --rx / --ry (tilt, degrees) and --gx / --gy (glare position, %) that index.css turns into the effect.
// Off for touch-only devices and for people who prefer reduced motion (the cards still look 3D at rest).
// Only the main visuals are 3D: the AI & automation showcase window, the ZulfiEra Ai and Cloud
// Infrastructure panels (with the architecture diagram), the satellite view and the hero console.
const TARGETS = [".macbook", ".platform-panel", ".ad-wrap", ".oa-diagram", ".hv-console"].join(", ");

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
      const m = el.offsetWidth > 900 ? max * 0.25 : el.offsetWidth > 520 ? max * 0.55 : max; // wide cards lean less
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--ry", `${((x - 0.5) * m).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${((0.5 - y) * m).toFixed(2)}deg`);
        el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
        el.classList.add("tilting");
      };
      const leave = () => {
        ["--ry", "--rx", "--gx", "--gy"].forEach((p) => el.style.removeProperty(p));
        el.classList.remove("tilting");
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
    });
    return () => cleanups.forEach((c) => c());
  }, [rootRef, max]);
}
