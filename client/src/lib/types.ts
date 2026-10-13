export type Profile = {
  name: string;
  title: string;
  headline: string;
  lede: string;
  email: string;
  phone: string;
  summary: string;
  yearsLabel: string;
  focus: string[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  current: boolean;
  points: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type ProjectItem = {
  title: string;
  category: string;
  summary: string;
  highlights: string[];
  stack: string[];
  accent: string;
};

export type EducationItem = {
  degree: string;
  field: string;
  school: string;
  location: string;
  year: string;
};

export type PortfolioData = {
  profile: Profile;
  experience: ExperienceItem[];
  skills: SkillGroup[];
  projects: ProjectItem[];
  education: EducationItem[];
};

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
