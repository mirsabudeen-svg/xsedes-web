"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* Mechanical scroll reveal: blur + opacity + slide-up, staggered via delay.
   The hiding class is applied from JS only, so server-rendered content is
   fully visible before hydration and without JavaScript. Reduced-motion
   users get no animation at all (checked here and again in CSS). */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    node.classList.add("reveal");

    const rect = node.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      // Already on screen: play the entrance after the hidden state paints.
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => node.classList.add("is-visible")),
      );
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
