"use client";
import { motion } from "framer-motion";
import type { Bio } from "@/types";

export default function Contact({ bio }: { bio: Bio }) {
  return (
    <section id="contact" className="container-pad py-24 md:py-32">
      <div className="grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-6">
          <h2 className="title-lg">Contact</h2>
          <p className="muted mt-3">Wanna get in touch?</p>
          <div className="mt-6">
            <a href={`mailto:${bio.email}`} className="btn">
              My Email
            </a>
          </div>
        </div>
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            alert(
              "Terima kasih! Silakan integrasikan ke layanan email/API pilihan Anda."
            );
            form.reset();
          }}
          className="md:col-span-6 rounded-2xl border bg-white p-6 space-y-4"
        >
          <input
            required
            name="name"
            placeholder="Nama"
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            required
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border rounded-md px-3 py-2"
          />
          <textarea
            required
            name="message"
            placeholder="Pesan"
            rows={5}
            className="w-full border rounded-md px-3 py-2"
          />
          <button className="btn">Send</button>
        </motion.form>
      </div>
    </section>
  );
}
