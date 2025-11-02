"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";

const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={clsx(
        "sticky top-0 z-50 backdrop-blur transition-shadow",
        scrolled && "shadow-[0_1px_0_0_#e5e7eb]"
      )}
    >
      <nav className="container-pad flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tightest">
          raflyrzp
        </Link>
        <ul className="flex items-center gap-4 text-sm">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="hover:text-accent">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
