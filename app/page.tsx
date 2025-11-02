import {
  getBiodata,
  getProjects,
  getExperiences,
  getSkills,
} from "@/lib/getData";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default async function Page() {
  const [bio, projects, experiences, skills] = await Promise.all([
    getBiodata(),
    getProjects(),
    getExperiences(),
    getSkills(),
  ]);

  return (
    <main>
      <Hero bio={bio} />
      <About bio={bio} />
      <Projects items={projects} />
      <Experiences items={experiences} />
      <Skills items={skills} />
      <Contact bio={bio} />
      <footer className="container-pad py-16 text-sm muted">
        © {new Date().getFullYear()} {bio.name}. All rights reserved.
      </footer>
    </main>
  );
}
