import type { LocalizedString } from "../lang";

export type WorkLink = {
  id: string;
  href: string;
  label: LocalizedString;
};

export type WorkProject = {
  id: string;
  year: string;
  title: LocalizedString;
  category: LocalizedString;
  stack: string[];
  summary: LocalizedString;
  role: LocalizedString;
  sections: {
    problem: LocalizedString;
    approach: LocalizedString;
    outcome: LocalizedString;
  };
  links?: WorkLink[];
  image?: string;
  imageAlt?: LocalizedString;
};

export type WorkExperience = {
  id: string;
  company: LocalizedString;
  role: LocalizedString;
  years: string;
  summary: LocalizedString;
  stack: string[];
};

export function projectPath(id: string) {
  return `/work/${id}`;
}

export function getNextProject(id: string) {
  const index = projects.findIndex((project) => project.id === id);
  if (index < 0 || projects.length < 2) return null;
  return projects[(index + 1) % projects.length];
}

export const projects = [
  {
    id: "finance-tracker-mobile",
    year: "2026",
    title: {
      en: "Personal Expense Tracker",
      es: "Seguimiento de gastos personales",
    },
    category: {
      en: "Mobile app / Finance",
      es: "Aplicación móvil / Finanzas",
    },
    stack: ["React Native", "TypeScript", "Tailwind CSS", "Expo"],
    summary: {
      en: "A calm mobile tracker for daily spend — fast to log, clear to read, built as a product I actually use.",
      es: "Un tracker móvil sobrio para el gasto diario: rápido de anotar, claro de leer, hecho como un producto que uso de verdad.",
    },
    role: {
      en: "Product design & development",
      es: "Diseño de producto y desarrollo",
    },
    sections: {
      problem: {
        en: "Most expense apps are noisy, subscription-heavy, or too slow for logging a coffee on the go. I wanted something quiet enough to become a habit.",
        es: "La mayoría de apps de gastos son ruidosas, van de suscripción o son demasiado lentas para anotar un café al vuelo. Quería algo lo bastante silencioso como para volverse hábito.",
      },
      approach: {
        en: "I built a React Native client with Expo, TypeScript, and Tailwind, focused on fast capture and a clear monthly picture rather than a wall of charts.",
        es: "Construí un cliente React Native con Expo, TypeScript y Tailwind, centrado en capturar rápido y ver el mes con claridad, no en una pared de gráficos.",
      },
      outcome: {
        en: "A working personal finance app — current flagship for how I ship product-quality mobile interfaces from a messy everyday problem.",
        es: "Una app de finanzas personales que funciona: la pieza actual de cómo convierto un problema cotidiano en una interfaz móvil de calidad de producto.",
      },
    },
  },
  {
    id: "coffizine",
    year: "2019",
    title: {
      en: "Coffizine",
      es: "Coffizine",
    },
    category: {
      en: "Final year project",
      es: "Proyecto de fin de carrera",
    },
    stack: ["Laravel", "Vue.js (Inertia.js)", "Tailwind CSS", "Docker"],
    summary: {
      en: "A magazine-style platform for coffee culture — editorial reading experience on a full-stack Laravel and Vue system.",
      es: "Una plataforma con aire de revista sobre cultura cafetera: lectura editorial sobre un sistema full-stack Laravel y Vue.",
    },
    role: {
      en: "Full-stack developer",
      es: "Desarrollador full stack",
    },
    sections: {
      problem: {
        en: "Coffee writing lived in scattered blogs and social feeds. The brief was an editorial home with a designed front and a real publishing back office.",
        es: "Los textos sobre café vivían en blogs sueltos y redes. El encargo era una casa editorial: un frente diseñado y un back office de publicación de verdad.",
      },
      approach: {
        en: "Laravel and Vue with Inertia, Tailwind, and Docker — a CMS-backed reading experience where the backend and the visual system were designed together.",
        es: "Laravel y Vue con Inertia, Tailwind y Docker: una experiencia de lectura con CMS, diseñando a la vez el backend y el sistema visual.",
      },
      outcome: {
        en: "Degree project that still stands for how I connect server-side systems with visual craft — not just screens, and not just APIs.",
        es: "Proyecto de fin de carrera que sigue representando cómo conecto sistemas de servidor con oficio visual: no solo pantallas, ni solo APIs.",
      },
    },
  },
] as const satisfies readonly WorkProject[];

export const experience = [
  {
    id: "work-at-necomplus",
    years: "2023—2026",
    company: {
      en: "Group Necomplus (Member of ASSEE)",
      es: "Grupo Necomplus (Miembro de ASSEE)",
    },
    role: {
      en: "Digital transformation developer",
      es: "Desarrollador de transformación digital",
    },
    summary: {
      en: "Building and evolving internal digital products — turning operational processes into software that teams can actually ship and use.",
      es: "Construir y hacer evolucionar productos digitales internos: convertir procesos operativos en software que los equipos pueden entregar y usar.",
    },
    stack: [],
  },
  {
    id: "work-at-posiziona",
    years: "2019—2023",
    company: {
      en: "Posiziona Tecnologías de la Información",
      es: "Posiziona Tecnologías de la Información",
    },
    role: {
      en: "Full stack developer",
      es: "Desarrollador full stack",
    },
    summary: {
      en: "Full-stack delivery across client web applications — from data and services through to the interfaces people work with every day.",
      es: "Entrega full-stack en aplicaciones web de cliente: de los datos y servicios hasta las interfaces con las que se trabaja cada día.",
    },
    stack: [],
  },
] as const satisfies readonly WorkExperience[];

export const contactLinks = [
  {
    id: "github",
    href: "https://github.com/franziskeer",
    label: { en: "GitHub", es: "GitHub" },
  },
] as const satisfies readonly WorkLink[];
