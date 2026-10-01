import { useEffect, useRef } from "react";

// Fades sections in as they scroll into view. The IntersectionObserver gives the nice stagger;
// the scroll/resize check is a safety net so nothing on screen (or already passed) ever stays
// hidden — e.g. after a jump to #section, browser zoom, or a card taller than the viewport.
export default function useReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;
    const els = [...root.querySelectorAll(".reveal")];
    const show = (el) => el.classList.add("in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => show(entry.target), i * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => observer.observe(el));

    let frame = 0;
    const sweep = () => {
      frame = 0;
      const limit = window.innerHeight * 0.95;
      els.forEach((el) => {
        if (!el.classList.contains("in") && el.getBoundingClientRect().top < limit) show(el);
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(sweep); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onScroll);
    const t = setTimeout(sweep, 400);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onScroll);
      clearTimeout(t);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return containerRef;
}
