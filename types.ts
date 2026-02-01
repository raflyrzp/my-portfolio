export type LocalizedString = {
  en: string;
  id: string;
};

export type Bio = {
  name: string;
  role: string;
  location: string;
  email: string;
  headline: LocalizedString;
  about?: LocalizedString;
  socials: { label: string; url: string; icon?: string }[];
  photo: string;
};

export type Project = {
  title: string;
  description: LocalizedString;
  year: string;
  tags: string[];
  cover: string;
  link?: string | null;
  repo?: string | null;
  featured?: boolean;
};

export type Experience = {
  company: string;
  role: string;
  type?: string;
  start: string;
  end: string;
  description: LocalizedString;
  skills?: string[];
  logo?: string;
};

export type Skill = {
  category: string;
  icon?: string;
  items: string[];
};

export type Certificate = {
  title: string;
  issuer: string;
  issued: string;
  expires?: string | null;
  credentialId?: string;
  url?: string;
  thumbnail?: string;
  skills?: string[];
  featured?: boolean;
};
