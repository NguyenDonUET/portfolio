/**
 * Portfolio domain types.
 *
 * These describe the language-neutral *structure* of the portfolio (ids, urls,
 * icons, ordering, flags). All human-readable text lives in `messages/*.json`
 * and is keyed by the ids below.
 */

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

export interface PersonalInfo {
  name: string;
  email: string;
  /** Square portrait used by the hero 3D-tilt avatar */
  avatarUrl: string;
  socialLinks: SocialLinks;
}

export interface Project {
  id: string;
  slug: string;
  /** Technology tags (proper nouns, not translated) */
  tags: string[];
  featured: boolean;
  liveUrl: string;
  repoUrl: string;
  image: string;
}

export interface Experience {
  id: string;
  /** Company name (proper noun, not translated) */
  company: string;
  startDate: string;
  endDate: string;
  /** Technology names (proper nouns, not translated) */
  techStack: string[];
}

export interface Skill {
  /** Tool/technology name (proper noun, not translated) */
  name: string;
  /** 1–5 proficiency scale used for visual indicators */
  level: 1 | 2 | 3 | 4 | 5;
  /** Lucide icon name as a string key for dynamic rendering */
  iconName: string;
}

export interface SkillCategory {
  /** Stable key mapped to a translated label in `skills.categories.*` */
  id: string;
  skills: Skill[];
}

/** A section link; the visible label is resolved from `nav.*` translations. */
export interface NavLink {
  href: string;
}

/** A fully-resolved nav item (label already translated) for nav UI components. */
export interface NavItem {
  label: string;
  href: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  navigation: NavLink[];
  projects: Project[];
  experience: Experience[];
  skills: SkillCategory[];
}
