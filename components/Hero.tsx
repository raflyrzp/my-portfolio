"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Bio } from "@/types";
import SmoothScroll from "./SmoothScroll";

export default function Hero({ bio }: { bio: Bio }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scaleRing = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <SmoothScroll>
      <section ref={ref} className="relative isolate overflow-hidden">
        <div className="container-pad pt-20 md:pt-28 pb-24 md:pb-40 grid md:grid-cols-12 items-center gap-10">
          <div className="md:col-span-6">
            <motion.h1 style={{ y: yTitle }} className="title-xl leading-tight">
              {bio.name.toLowerCase()}.
            </motion.h1>
            <p className="mt-4 text-lg muted max-w-prose">{bio.headline}</p>
            <div className="mt-8 flex gap-3">
              <a href="#projects" className="btn">
                See My Projects
              </a>
              <a href="#contact" className="btn">
                Contact Me
              </a>
            </div>
          </div>
          <div className="md:col-span-6 relative">
            <motion.div
              style={{ y: yImage }}
              className="relative size-[min(72vw,480px)] mx-auto"
            >
              <div className="absolute inset-0 rounded-3xl bg-white/70 shadow-lg" />
              <Image
                src={bio.photo}
                alt={bio.name}
                fill
                className="object-cover rounded-3xl mix-blend-multiply"
                priority
              />
              <motion.div
                style={{ scale: scaleRing }}
                className="absolute -right-6 -bottom-6 size-28 md:size-40 rounded-full border-8"
              />
              <div className="absolute -right-6 -bottom-6 size-28 md:size-40 rounded-full border-8 border-accent/90 -z-10 accent-ring" />
            </motion.div>
          </div>
        </div>
      </section>
    </SmoothScroll>
  );
}
