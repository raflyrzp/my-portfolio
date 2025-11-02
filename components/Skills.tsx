"use client";
import { motion } from "framer-motion";
import type { Skill } from "@/types";

export default function Skills({ items }: { items: Skill[] }) {
  return (
    <section id="skills" className="container-pad py-24 md:py-32">
      <h2 className="title-lg mb-10 md:mb-16">Skills</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((s) => (
          <motion.div
            key={s.category}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl border bg-white p-6"
          >
            <h3 className="font-semibold">{s.category}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.items.map((it) => (
                <li key={it} className="rounded-full border px-3 py-1 text-xs">
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
