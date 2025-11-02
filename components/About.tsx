"use client";
import { motion } from "framer-motion";
import type { Bio } from "@/types";

export default function About({ bio }: { bio: Bio }) {
  return (
    <section id="about" className="container-pad py-24 md:py-32">
      <div className="grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-4">
          <h2 className="title-lg">About</h2>
        </div>
        <div className="md:col-span-8 space-y-6 text-[17px] leading-relaxed">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Saya {bio.name}, {bio.role} yang berbasis di {bio.location}.{" "}
            {bio.headline}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <ul className="flex flex-wrap gap-3">
              {bio.socials.map((s) => (
                <li key={s.url}>
                  <a
                    className="btn"
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
