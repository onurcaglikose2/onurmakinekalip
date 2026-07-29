"use client";

import { LazyMotion, m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const loadMotionFeatures = () =>
  import("./motion-features").then((module) => module.default);

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <m.div
        className={className}
        initial={reducedMotion ? false : { y: 20 }}
        animate={{ y: 0 }}
        transition={{
          duration: reducedMotion ? 0 : 0.7,
          delay: reducedMotion ? 0 : delay,
          ease: [0.2, 0.8, 0.2, 1],
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
