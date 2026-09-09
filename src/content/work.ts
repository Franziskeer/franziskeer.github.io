import type { LocalizedString } from "../lang";

export type WorkLink = {
  id: string;
  href: string;
  label: LocalizedString;
};

export type WorkProject = {
  id: string;
  title: LocalizedString;
  stack: string[];
  summary: LocalizedString;
  sections: {
    problem: LocalizedString;
    approach: LocalizedString;
    outcome: LocalizedString;
  };
  links?: WorkLink[];
  github?: string;
  image?: string;
  imageAlt?: LocalizedString;
};

export type WorkExperience = {
  id: string;
  company: LocalizedString;
  role: LocalizedString;
  years: string;
  summary: LocalizedString;
  points?: LocalizedString[];
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
    id: "portfolio",
    title: {
      en: "This Portfolio",
      es: "Este Portafolio",
    },
    stack: ["Astro", "React", "Three.js", "Tailwind CSS", "TypeScript"],
    summary: {
      en: "The site you are on. A personal portfolio built to feel handmade, not generated. Type, ink, and a bit of 3D.",
      es: "La web en la que estás. Un portfolio personal hecho para que se sienta hecho a mano, no generado. Tipografía, tinta y un poco de 3D.",
    },
    sections: {
      problem: {
        en: "Developer portfolios tend to look like the same template. I wanted a site I would actually share. A site that represents me.",
        es: "Los portfolios de desarrollador suelen parecer la misma plantilla. Quería una web que de verdad me gustaría compartir. Un sitio que me represente.",
      },
      approach: {
        en: "Astro for the pages. React and Three.js for the ink and the spheres. Native HTML and CSS when that was enough and TailwindCSS for the rest.",
        es: "Astro para las páginas. React y Three.js para la tinta y las esferas. HTML y CSS nativos cuando era necesario y TailwindCSS para el resto.",
      },
      outcome: {
        en: "A site I keep working on. Selected work, a bit about me, and sharing my projects and experiences with the community.",
        es: "Una web en la que sigo trabajando. Trabajo seleccionado, un poco sobre mí, y compartir mis proyectos y experiencias con la comunidad.",
      },
    },
    image: "/work/portfolio.png",
    imageAlt: {
      en: "Homepage of the portfolio. Serif headline, orange links, and black ink shapes.",
      es: "Página de inicio del portfolio. Titular en serif, enlaces naranja y formas de tinta negra.",
    },
    github: "https://github.com/Franziskeer/franziskeer.github.io",
  },
  {
    id: "finance-tracker-mobile",
    title: {
      en: "Expense Tracker",
      es: "Control de gastos",
    },
    stack: ["React Native", "TypeScript", "Tailwind CSS", "Expo", "Firestore"],
    summary: {
      en: "An app for shared household expenses. Back from the shops, log it in 5 seconds. At month's end you take stock. Nothing more.",
      es: "App para los gastos compartidos de casa. Sales de la compra, lo anotas en 5 segundos. A fin de mes haces balance. Ni más ni menos.",
    },
    sections: {
      problem: {
        en: "Most expense apps are noisy, gated behind a subscription, or too slow for a coffee on the go. I wanted something quiet enough to become a habit.",
        es: "Casi todas las apps de gastos hacen ruido, van de suscripción o son demasiado lentas para anotar un café al vuelo. Quería algo lo bastante silencioso como para volverse hábito.",
      },
      approach: {
        en: "Fast capture first. A clear month second. React Native with Expo, built around those two screens instead of a dashboard for everything. I started with a Google Sheet as the database. Then I moved to Firestore so the app could scale if it needed to.",
        es: "Primero capturar rápido. Después entender el mes. React Native con Expo, pensada en torno a esas dos pantallas en lugar de un dashboard para todo. Al principio usaba una hoja de Google Sheets como base de datos. Di el salto a Firestore para poder escalar la app si hiciera falta.",
      },
      outcome: {
        en: "An app I use every day, for a fair split of household expenses based on what each person contributes. Fast to log, clear to read, no noise.",
        es: "Una app que utilizo en mi día a día y que permite un reparto justo de los gastos de la casa en base a la aportación de cada uno. Rápida de anotar, clara de leer y sin ruido.",
      },
    },
    image: "/work/finance-tracker.webp",
    imageAlt: {
      en: "Two smartphone mockups of the expense tracker. Monthly dashboard and spending history.",
      es: "Dos mockups de móvil de la app de gastos. Dashboard del mes e historial.",
    },
    github: "https://github.com/Franziskeer/finance-tracker-mobile",
  },
  {
    id: "coffizine",
    title: {
      en: "Coffizine",
      es: "Coffizine",
    },
    stack: ["Laravel", "Vue.js (Inertia.js)", "Tailwind CSS", "Docker"],
    summary: {
      en: "A final year degree project. A study of native HTML components applied to an interactive web form generator and response collection.",
      es: "Trabajo de fin de grado. Un estudio de los componentes nativos HTML aplicado a un generador interactivo de formularios web y a la recolección de respuestas.",
    },
    sections: {
      problem: {
        en: "The final year degree project was a study of native HTML form components. The product was an interactive generator and response collection. The name coffee + officine is because you can build advanced forms in the time it takes to drink a coffee.",
        es: "El Trabajo de Final de Grado era un estudio de los componentes nativos HTML para formularios. El producto final fue un generador interactivo y recolección de respuestas. El nombre coffee + officine se debe a que puedes construir formularios avanzados en lo que te tomas un café.",
      },
      approach: {
        en: "Laravel, Vue and Inertia as one system. The form generator and response collection were designed together. The same app to build, preview and store, with API integration, security best practices and a design system applied throughout. Then shipped with Docker.",
        es: "Laravel, Vue e Inertia como un solo sistema. El generador de formularios y la recolección de respuestas se diseñaron juntas. La misma app para construir, previsualizar y guardar, con integración de API, buenas prácticas de seguridad y un sistema de diseño aplicado. Todo se publicó con Docker.",
      },
      outcome: {
        en: "I shipped it as my final year degree project. A usable product to generate, preview and collect responses. Not a mockup.",
        es: "Lo entregué como Trabajo de Fin de Grado. Un producto usable para generar, previsualizar y recoger respuestas. No una maqueta.",
      },
    },
    image: "/work/coffizine.webp",
    imageAlt: {
      en: "Coffizine wordmark beside a dark editorial still of the brand cup",
      es: "Logotipo de Coffizine junto a un bodegón editorial oscuro de la taza de la marca",
    },
    github: "https://github.com/Franziskeer/coffizine",
  },
] as const satisfies readonly WorkProject[];

export const experience = [
  {
    id: "work-at-necomplus",
    years: "2023-2026",
    company: {
      en: "Group Necomplus (Member of ASSEE)",
      es: "Grupo Necomplus (Miembro de ASSEE)",
    },
    role: {
      en: "Digital transformation developer",
      es: "Desarrollador de transformación digital",
    },
    summary: {
      en: "In the digital transformation and innovation team we improved internal processes and turned them into software teams can actually use.",
      es: "En el departamento de transformación digital e innovación mejorábamos los procesos internos y los convertíamos en software.",
    },
    points: [
      {
        en: "Conversational AI chatbots and voicebots for call center services.",
        es: "Chatbots y voicebots conversacionales con IA para los servicios de call center.",
      },
      {
        en: "Lead management automations for marketing.",
        es: "Automatismos para la gestión de leads de marketing.",
      },
      {
        en: "Internal tools to streamline operations. From analysing the need to defining the technical solution.",
        es: "Herramientas internas para optimizar procesos operativos. Del análisis de la necesidad a la definición de la solución técnica.",
      },
      {
        en: "Frontend apps for corporate environments, integrating services, APIs and internal platforms.",
        es: "Aplicaciones frontend para entornos corporativos, con integración de servicios, APIs y plataformas.",
      },
      {
        en: "Cloud delivery on Azure with Docker and CI/CD.",
        es: "Despliegue en la nube en Azure con Docker y CI/CD.",
      },
      {
        en: "Client builds and proofs of concept.",
        es: "Desarrollos y pruebas de concepto para clientes.",
      },
      {
        en: "Developer assist workflows with agentic AI, oriented toward spec driven development.",
        es: "Metodologías de ayuda al desarrollador con IA agéntica, orientadas a Spec Driven Development.",
      },
    ],
    stack: ["TypeScript", "React", "Node.js", "Azure", "Docker", "OpenAI"],
  },
  {
    id: "work-at-posiziona",
    years: "2019-2023",
    company: {
      en: "Posiziona Tecnologías de la Información",
      es: "Posiziona Tecnologías de la Información",
    },
    role: {
      en: "Full stack developer",
      es: "Desarrollador full stack",
    },
    summary: {
      en: "Consultancy where I built management apps for clients with full stack development in Laravel and Vue.js.",
      es: "Consultora en la que construí aplicaciones de gestión full stack en Laravel y Vue.js para clientes.",
    },
    points: [
      {
        en: "Management applications with Laravel and Vue.js.",
        es: "Desarrollo de aplicaciones de gestión con Laravel y Vue.js.",
      },
      {
        en: "I introduced Vue.js and Docker to ease development and deployment workflows.",
        es: "Introduje Vue.js y Docker para facilitar los flujos de desarrollo y despliegue.",
      },
      {
        en: "Development and maintenance of ecommerce projects with PrestaShop and WordPress.",
        es: "Desarrollo y mantenimiento de proyectos de comercio electrónico con PrestaShop y WordPress.",
      },
      {
        en: "Admin panel interface design.",
        es: "Diseño de interfaces de paneles de administración.",
      },
      {
        en: "Database work and Docker environment management.",
        es: "Manejo de bases de datos y gestión de entornos Docker.",
      },
    ],
    stack: ["Laravel", "PHP", "Vue.js", "Docker", "PrestaShop", "WordPress"],
  },
] as const satisfies readonly WorkExperience[];

export const contact = {
  channels: [
    {
      id: "gmail",
      href: "mailto:franpial98@gmail.com",
      handle: "franpial98@gmail.com",
    },
    {
      id: "linkedin",
      href: "https://www.linkedin.com/in/francisco-pinero-alpanes",
      handle: "francisco-pinero-alpanes",
    },
    {
      id: "github",
      href: "https://github.com/franziskeer",
      handle: "franziskeer",
    },
  ],
} as const;
