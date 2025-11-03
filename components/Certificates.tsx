"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Certificate } from "@/types";

export default function Certificates({ items }: { items: Certificate[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section id="certificates" className="container-pad py-24 md:py-32">
      <div className="mb-10 md:mb-16 flex items-end justify-between">
        <h2 className="title-lg">Certificates</h2>
        <span className="muted text-sm">{items.length} certificates</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((c, i) => (
          <motion.a
            key={c.title + i}
            href={c.url ?? "#"}
            target={c.url ? "_blank" : undefined}
            rel={c.url ? "noreferrer" : undefined}
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="group block rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-lg transition"
          >
            <div className="relative w-full aspect-video bg-neutral-100">
              {c.thumbnail ? (
                <Image
                  src={c.thumbnail}
                  alt={c.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  priority={i < 3}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  No image
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg">{c.title}</h3>
              <p className="muted text-sm mt-1">
                {c.issuer} · <span className="text-sm">{c.issued}</span>
              </p>

              {c.credentialId && (
                <p className="mt-2 text-xs rounded-full inline-block px-2 py-1 border text-neutral-600">
                  ID: {c.credentialId}
                </p>
              )}

              {c.skills && c.skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs rounded-full border px-3 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
