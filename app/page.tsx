import {
  getBiodata,
  getProjects,
  getCertificates,
  getFeaturedProjects,
  getFeaturedExperiences,
  getFeaturedCertificates,
  getSkills,
} from "@/lib/getData";
import HomePage from "@/components/sections/HomePage";

export default async function Page() {
  const [
    bio,
    allProjects,
    allCertificates,
    featuredProjects,
    experiences,
    featuredCertificates,
    skills,
  ] = await Promise.all([
    getBiodata(),
    getProjects(),
    getCertificates(),
    getFeaturedProjects(3),
    getFeaturedExperiences(2),
    getFeaturedCertificates(3),
    getSkills(),
  ]);

  return (
    <HomePage
      bio={bio}
      allProjects={allProjects}
      allCertificates={allCertificates}
      featuredProjects={featuredProjects}
      experiences={experiences}
      featuredCertificates={featuredCertificates}
      skills={skills}
    />
  );
}
