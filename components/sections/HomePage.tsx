"use client";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import type {
  Bio,
  Project,
  Experience as ExpType,
  Skill,
  Certificate,
} from "@/types";

interface HomePageProps {
  bio: Bio;
  allProjects: Project[];
  allCertificates: Certificate[];
  featuredProjects: Project[];
  experiences: ExpType[];
  featuredCertificates: Certificate[];
  skills: Skill[];
}

export default function HomePage({
  bio,
  allProjects,
  allCertificates,
  featuredProjects,
  experiences,
  featuredCertificates,
  skills,
}: HomePageProps) {
  return (
    <main>
      <Hero bio={bio} />
      <About
        bio={bio}
        projectCount={allProjects.length}
        certificateCount={allCertificates.length}
      />
      <Projects items={featuredProjects} />
      <Experience items={experiences} />
      <Skills items={skills} />
      <Certificates items={featuredCertificates} />
      <Contact bio={bio} />
      <Footer bio={bio} />
    </main>
  );
}
