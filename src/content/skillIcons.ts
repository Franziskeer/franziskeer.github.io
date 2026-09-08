import { icons as iconoirIcons } from "@iconify-json/iconoir";
import { icons as simpleIcons } from "@iconify-json/simple-icons";
import { getIconData, iconToSVG } from "@iconify/utils";

const PREFIX = "simple-icons:";

const collections = {
  "simple-icons": simpleIcons,
  iconoir: iconoirIcons,
};

const aliases: Record<string, string> = {
  typescript: "typescript",
  javascript: "javascript",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  vuejs: "vuedotjs",
  vue: "vuedotjs",
  react: "react",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  sass: "sass",
  nextjs: "nextdotjs",
  next: "nextdotjs",
  nuxt: "nuxt",
  electron: "electron",
  reactnative: "react",
  expo: "expo",
  nodejs: "nodedotjs",
  openai: "openai",
  laravel: "laravel",
  php: "php",
  express: "express",
  python: "python",
  fastapi: "fastapi",
  langchain: "langchain",
  websockets: "socketdotio",
  wordpress: "wordpress",
  prestashop: "prestashop",
  mysql: "mysql",
  firestore: "firebase",
  postgresql: "postgresql",
  mongodb: "mongodb",
  sqlite: "sqlite",
  redis: "redis",
  git: "git",
  azure: "microsoftazure",
  vite: "vite",
  docker: "docker",
  inertiajs: "inertia",
  inertia: "inertia",
  linux: "linux",
  figma: "figma",
  jest: "jest",
  cypress: "cypress",
  cursor: "cursor",
  postman: "postman",
  vuejsinertiajs: "vuedotjs",
  github: "github",
  linkedin: "linkedin",
  gmail: "gmail"
};

export type TechIcon = {
  body: string;
  viewBox: string;
};

function iconName(tech: string) {
  if (tech.startsWith(PREFIX)) return tech.slice(PREFIX.length);
  return aliases[tech.toLowerCase().replace(/[^a-z0-9]+/g, "")];
}

function toSvg(collection: (typeof collections)[keyof typeof collections], name: string): TechIcon | undefined {
  const data = getIconData(collection, name);
  if (!data) return undefined;

  const svg = iconToSVG(data);
  return {
    body: svg.body,
    viewBox: svg.attributes.viewBox,
  };
}

/** Iconify id (`iconoir:menu`) or a simple-icons alias (`react`). */
export function iconifyIcon(id: string): TechIcon | undefined {
  if (id.includes(":")) {
    const [prefix, ...rest] = id.split(":");
    const name = rest.join(":");
    const collection = collections[prefix as keyof typeof collections];
    if (!collection || !name) return undefined;
    return toSvg(collection, name);
  }

  return techIcon(id);
}

export function techIcon(tech: string): TechIcon | undefined {
  const name = iconName(tech);
  if (!name) return undefined;
  return toSvg(simpleIcons, name);
}
