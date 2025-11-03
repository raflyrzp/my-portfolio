"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  speed?: number;
  children: React.ReactNode;
  className?: string;
};

export default function Parallax({ speed = 0.6, children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40 * speed, -40 * speed]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
