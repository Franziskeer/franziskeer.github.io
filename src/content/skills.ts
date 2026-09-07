import type { LocalizedString } from "../lang";

export const SKILL_EXPERTISE_MAX = 5;

export type SkillGroupId = "frontend" | "mobile" | "backend" | "tooling";

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
  { id: "mobile", label: { en: "Mobile", es: "Móvil" } },
  { id: "backend", label: { en: "Backend", es: "Backend" } },
  { id: "tooling", label: { en: "Tooling", es: "Herramientas" } },
] as const satisfies readonly SkillGroup[];

export const skills = [
  { id: "typescript", name: "TypeScript", group: "frontend", expertise: 5 },
  { id: "javascript", name: "JavaScript", group: "frontend", expertise: 5 },
  { id: "vue", name: "Vue.js", group: "frontend", expertise: 4 },
  { id: "react", name: "React", group: "frontend", expertise: 4 },
  { id: "tailwind", name: "Tailwind CSS", group: "frontend", expertise: 4 },
  { id: "react-native", name: "React Native", group: "mobile", expertise: 4 },
  { id: "expo", name: "Expo", group: "mobile", expertise: 4 },
  { id: "laravel", name: "Laravel", group: "backend", expertise: 3 },
  { id: "php", name: "PHP", group: "backend", expertise: 3 },
  { id: "docker", name: "Docker", group: "tooling", expertise: 3 },
  { id: "inertia", name: "Inertia.js", group: "tooling", expertise: 3 },
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
