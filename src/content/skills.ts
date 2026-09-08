import type { LocalizedString } from "../lang";

export const SKILL_EXPERTISE_MAX = 5;

export type SkillGroupId = "frontend" | "mobile" | "backend" | "data" | "tooling";

export type SkillGroup = {
  id: SkillGroupId;
  label: LocalizedString;
};

export type Skill = {
  id: string;
  name: string;
  group: SkillGroupId;
  expertise: number;
};

export const skillGroups = [
  { id: "frontend", label: { en: "Frontend", es: "Frontend" } },
  { id: "backend", label: { en: "Backend", es: "Backend" } },
  { id: "tooling", label: { en: "Tooling", es: "Herramientas" } },
  { id: "data", label: { en: "Data", es: "Datos" } },
  { id: "mobile", label: { en: "Mobile", es: "Móvil" } },
] as const satisfies readonly SkillGroup[];

export const skills = [
  { id: "typescript", name: "TypeScript", group: "frontend", expertise: 5 },
  { id: "javascript", name: "JavaScript", group: "frontend", expertise: 5 },
  { id: "html", name: "HTML5", group: "frontend", expertise: 5 },
  { id: "css", name: "CSS3", group: "frontend", expertise: 5 },
  { id: "vue", name: "Vue.js", group: "frontend", expertise: 4 },
  { id: "react", name: "React", group: "frontend", expertise: 5 },
  { id: "tailwind", name: "Tailwind CSS", group: "frontend", expertise: 4 },
  { id: "sass", name: "Sass", group: "frontend", expertise: 3 },
  { id: "next", name: "Next.js", group: "frontend", expertise: 3 },
  { id: "nuxt", name: "Nuxt", group: "frontend", expertise: 2 },
  { id: "electron", name: "Electron", group: "frontend", expertise: 2 },
  { id: "react-native", name: "React Native", group: "mobile", expertise: 2 },
  { id: "expo", name: "Expo", group: "mobile", expertise: 1 },
  { id: "nodejs", name: "Node.js", group: "backend", expertise: 5 },
  { id: "openai", name: "OpenAI", group: "backend", expertise: 4 },
  { id: "laravel", name: "Laravel", group: "backend", expertise: 5 },
  { id: "php", name: "PHP", group: "backend", expertise: 5 },
  { id: "express", name: "Express", group: "backend", expertise: 4 },
  { id: "python", name: "Python", group: "backend", expertise: 3 },
  { id: "fastapi", name: "FastAPI", group: "backend", expertise: 2 },
  { id: "langchain", name: "LangChain", group: "backend", expertise: 2 },
  { id: "websockets", name: "WebSockets", group: "backend", expertise: 3 },
  { id: "wordpress", name: "WordPress", group: "backend", expertise: 3 },
  { id: "prestashop", name: "PrestaShop", group: "backend", expertise: 2 },
  { id: "mysql", name: "MySQL", group: "data", expertise: 4 },
  { id: "firestore", name: "Firestore", group: "data", expertise: 1 },
  { id: "postgresql", name: "PostgreSQL", group: "data", expertise: 3 },
  { id: "mongodb", name: "MongoDB", group: "data", expertise: 4 },
  { id: "sqlite", name: "SQLite", group: "data", expertise: 1 },
  { id: "redis", name: "Redis", group: "data", expertise: 1 },
  { id: "git", name: "Git", group: "tooling", expertise: 5 },
  { id: "azure", name: "Azure", group: "tooling", expertise: 4 },
  { id: "vite", name: "Vite", group: "tooling", expertise: 3 },
  { id: "docker", name: "Docker", group: "tooling", expertise: 4 },
  { id: "inertia", name: "Inertia.js", group: "tooling", expertise: 3 },
  { id: "linux", name: "Linux", group: "tooling", expertise: 4 },
  { id: "figma", name: "Figma", group: "tooling", expertise: 3 },
  { id: "jest", name: "Jest", group: "tooling", expertise: 4 },
  { id: "cypress", name: "Cypress", group: "tooling", expertise: 2 },
  { id: "cursor", name: "Cursor", group: "tooling", expertise: 5 },
  { id: "postman", name: "Postman", group: "tooling", expertise: 3 },
] as const satisfies readonly Skill[];

export function skillsByGroup() {
  return skillGroups
    .map((group) => ({
      ...group,
      skills: skills
        .filter((skill) => skill.group === group.id)
        .slice()
        .sort((a, b) => b.expertise - a.expertise || a.name.localeCompare(b.name)),
    }))
    .filter((group) => group.skills.length > 0);
}
