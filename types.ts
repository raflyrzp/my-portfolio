export type Bio = {
  name: string;
  role: string;
  location: string;
  email: string;
  headline: string;
  socials: { label: string; url: string }[];
  photo: string;
};

export type Project = {
  title: string;
  description: string;
  year: string;
  tags: string[];
  cover: string;
  link?: string;
  repo?: string;
};

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  description: string;
};

export type Skill = {
  category: string;
  items: string[];
};

export type Certificate = {
  title: string;
  issuer: string;
  issued: string;
  credentialId?: string;
  url?: string;
  thumbnail?: string;
  skills?: string[];
};
