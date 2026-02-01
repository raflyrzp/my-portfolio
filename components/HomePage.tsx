"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type {
  Bio,
  Project,
  Experience as ExpType,
  Certificate,
  Skill,
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
      <Projects items={featuredProjects} showViewAll={true} />
      <Experience items={experiences} showViewAll={true} />
      <Skills items={skills} />
      <Certificates items={featuredCertificates} showViewAll={true} />
      <Contact bio={bio} />
      <Footer bio={bio} />
    </main>
  );
}
