export interface Skill {
  name: string;
  icon: string;
  level: number;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  gallery?: string[];
  tech: string[];
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'Other';
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  logo?: string;
  role: string;
  duration: string;
  responsibilities: string[];
  achievements?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  milestones?: string[];
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate?: string;
  certificateUrl?: string;
  image?: string;
}

export interface Achievement {
  label: string;
  value: number;
  suffix?: string;
}

export interface SocialLink {
  name: 'GitHub' | 'LinkedIn' | 'Email' | 'LeetCode' | 'GeeksforGeeks' | 'Instagram';
  url: string;
  icon: string;
}