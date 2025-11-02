"use client";
import { motion } from "framer-motion";
import type { Experience as Exp } from "@/types";

export default function Experience({ items }: { items: Exp[] }) {
  return (
    <section id="experience" className="container-pad py-24 md:py-32">
      <h2 className="title-lg mb-10 md:mb-16">Experience</h2>
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-neutral-200" />
        <ul className="space-y-10">
          {items.map((e, i) => (
            <motion.li
              key={e.company + i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="pl-10"
            >
              <div className="relative">
                <div className="absolute -left-[38px] top-1.5 size-3 rounded-full bg-accent" />
                <h3 className="font-semibold">
                  {e.role} — {e.company}
                </h3>
                <p className="muted text-sm">
                  {e.start} — {e.end}
                </p>
                <p className="mt-2">{e.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
